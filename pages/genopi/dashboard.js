import Layout from '../../components/genopi/layout'
import Footer from '../../components/footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faUnderline, faArrowRight, faStickyNote, faFile, faNewspaper, faQuestion, faFileLines } from '@fortawesome/free-solid-svg-icons'
import { useSession, getSession } from "next-auth/react"
import { connectToDatabase } from "../../util/db";
import Redirect from '../../components/Redirect'
import {useState, useEffect} from 'react';

export default function Project({ genouser }) {
    const { data: session, status } = useSession({
        required: true
    })

    const [isMobile, setIsMobile] = useState(false)
    
    //choose the screen size 
    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    
        handleResize();
    
        return () => {
            window.removeEventListener('resize', handleResize)
        }
        }, [isMobile])

    if (!session) { return <Redirect text='OT login' link='/login'></Redirect> }

    const loading = status === 'loading';
    
    const WidgetCreator = ({ icon, color, content, href }) => {
        return <div className="flex flex-col mx-2 w-full my-1">
            <Link href={href}><a className="p-2 bg-slate-300 rounded flex items-center">
                <FontAwesomeIcon icon={icon} className={`text-${color}`} /> <span className='ml-2'>{content}</span>
                <FontAwesomeIcon className="ml-auto my-auto text-gray" icon={faArrowRight} /></a>
            </Link>
        </div>
    }

    const Notif = ({ icon, content, date, href, preview }) => {
        return <Link href={href}>
            <a className="bg-slate-700 rounded-md text-xl m-1">
                <div className="flex">
                    <span className="bg-slate-800 p-2 px-3 rounded-l-md mr-2 flex">
                        {loading === false ? <FontAwesomeIcon icon={icon} className="my-auto" /> :
                        <span className="animate-pulse flex">
                            <div className="bg-slate-600 rounded h-7 my-auto">
                                <p className="text-transparent">hm</p>
                            </div>
                        </span>
                        }
                    </span>
                    <p className="ml-1 my-auto w-6/12 leading-tight flex flex-col">
                        {loading === false ? <span>{content}<br /><span className="text-gray text-lg">{date}</span></span> : 
                        <span className="animate-pulse flex">
                            <div className="bg-slate-500 rounded h-7 my-auto">
                                <p className="text-transparent">Loading stuff</p>
                            </div>
                        </span>
                        }
                    </p>
                    <div className="p-1 pl-3 bg-slate-800 rounded-r-md text-base w-full"><span className="justify-center"><span className="text-gray text-sm my-0">Preview</span><br />
                    {loading === false ? preview : 
                    <span className="animate-pulse flex">
                        <div className="bg-slate-500 rounded h-9 mb-2 my-auto">
                            <p className="text-transparent">Made with music by Open Terminal :D</p>
                        </div>
                    </span>
                    }
                    </span></div>
                </div>
            </a>
        </Link>
    }

    let [xp, level, menu, notifs] = [genouser['xp'], genouser['level'], genouser['dashboardmenu'], genouser['owned']];
    console.log(xp);

    return (
      <>
        <Layout>
            <div>
                <div className={`bg-slate-300 font-bold text-3xl flex ${isMobile && 'flex-col'} gap-4`}>
                    <div className={`flex-1 ${isMobile ? 'px-3 pt-3' : 'p-6'}`}><p className="flex">Welcome back, {session.user.name.split(' ')[0]}</p></div>
                    <div className={`flex-1 p-6 bg-emerald-500 text-white ${isMobile ? 'px-3 pt-3 pb-3' : 'p-6 rounded-l-2xl'} flex`}><p className="float-right my-auto">{loading === false ? <span>{xp} XP ∙ Level {level}</span> : <span className="animate-pulse flex"><div className="bg-emerald-600 rounded ml-2"><p className="text-transparent">0 XP ∙ Level 0</p></div></span>}</p></div>
                </div>
                <div className='p-5 text-xl'>
                    <div className={`flex ${isMobile && 'flex-col'} font-medium ${isMobile && 'w-[95%]'}`}>
                        <WidgetCreator
                            icon={faStickyNote}
                            color="amber-500"
                            content="New Note Session"
                            href="/genopi/note/new"
                        />
                        <WidgetCreator
                            icon={faQuestion}
                            color="emerald-500"
                            content="New Practice Test"
                            href="/genopi/test/newtest"
                        />
                        <WidgetCreator
                            icon={faFileLines}
                            color="primary"
                            content="New Reading"
                            href="/genopi/test/newreading"
                        />
                    </div>
                </div>
            </div>
        </Layout>
        <Footer></Footer>
      </>
    )
}

export async function getServerSideProps(context) {
    const { client } = await connectToDatabase();
    const session = await getSession(context);
    let genouser;
    if (!session) return {
        props: {
          genouser: null,
        },
    };
    const collection = client.db('Genopi').collection('users');
    await collection.findOne({ email: session['user']['email'] }).then(function(user) {
        if (!user || user === null) {
            const abtme = null;
            const xp = 0;
            const level = 0;
            const owned = [];
            const dashboardmenu = [ 'note', 'test', 'article' ];
            collection.insertOne({
                email: session['user']['email'],
                abtme: abtme,
                xp: xp,
                level: level,
                owned: owned,
                dashboardmenu: dashboardmenu
            });
            genouser = { 'xp': xp, 'level': level, 'dashboardmenu': dashboardmenu, 'owned': owned };
        } else {
            genouser = user
        }
    })
    
    return {
        props: {
          genouser: JSON.parse(JSON.stringify(genouser)),
        },
    };
}