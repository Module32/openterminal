import Layout from '../../components/augmentive/layout'
import Footer from '../../components/footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faStickyNote, faQuestion, faFileLines, faEye, faSpaghettiMonsterFlying } from '@fortawesome/free-solid-svg-icons'
import { useSession, getSession } from "next-auth/react"
import { connectToDatabase } from "../../util/db";
import Redirect from '../../components/Redirect'
import { useState, useEffect } from 'react';
import { convert } from 'html-to-text'

export default function AugmentiveDashboard({ genouser, notes }) {
    const { data: session, status } = useSession({
        required: true
    })

    const [isMobile, setIsMobile] = useState(false)
    
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
            <Link href={href}><a className="p-2 border border-slate-300 shadow-md rounded flex items-center transition hover:-translate-y-2 hover:shadow-xl">
                <FontAwesomeIcon icon={icon} className={`text-${color}`} /> <span className='ml-2'>{content}</span>
                <FontAwesomeIcon className="ml-auto my-auto text-gray" icon={faArrowRight} /></a>
            </Link>
        </div>
    }

    let [xp, level] = [genouser['xp'], genouser['level']];

    return (
      <>
        <Layout>
            <div>
                <div className={`bg-slate-300/60 font-bold text-3xl flex ${isMobile && 'flex-col'} gap-4`}>
                    <div className={`flex-1 ${isMobile ? 'px-3 pt-3' : 'p-6'}`}><p className="flex">Welcome back, {session.user.name.split(' ')[0]}</p></div>
                    <div className={`flex-1 p-6 bg-emerald-500 text-white ${isMobile ? 'px-3 pt-3 pb-3' : 'p-6 rounded-l-2xl'} flex`}><p className={`${!isMobile && 'ml-auto'} my-auto`}>{loading === false ? <span>{xp} XP ∙ Level {level}</span> : <span className="animate-pulse flex"><div className="bg-emerald-600 rounded ml-2"><p className="text-transparent">0 XP ∙ Level 0</p></div></span>}</p></div>
                </div>
                <div className='p-5 text-xl'>
                    <div className={`flex ${isMobile && 'flex-col'} font-medium ${isMobile && 'w-[95%]'}`}>
                        <WidgetCreator
                            icon={faStickyNote}
                            color="amber-500"
                            content="New Note Session"
                            href="/augmentive/note/new"
                        />
                        <WidgetCreator
                            icon={faQuestion}
                            color="emerald-500"
                            content="New Practice Test"
                            href="/augmentive/test/newtest"
                        />
                        <WidgetCreator
                            icon={faFileLines}
                            color="primary"
                            content="New Reading"
                            href="/augmentive/test/newreading"
                        />
                    </div>
                    <div className='px-2 font-medium text-base'>
                    <h1 className='mt-4 mb-2 text-3xl'>Your stuff</h1>
                    <div className='flex flex-wrap w-[98.5%]'>
                        {notes.map(note => {
                            const content = convert(note.content, {
                                wordwrap: 5
                            })
                            const limit = 100;
                            return <div className='flex'>
                                <Link href={`/augmentive/note/${note._id}`}>
                                    <a className={`border border-slate-300 px-2 ${isMobile ? 'w-full' : 'w-[350px]'} m-1 shadow-md rounded p-1 transition hover:-translate-y-2 hover:shadow-xl`}>
                                        <h1 className='text-xl flex items-center'><FontAwesomeIcon icon={faStickyNote} className='mr-1.5 text-amber-500' /> {note.title} <span className='ml-auto text-gray font-medium text-base'><FontAwesomeIcon icon={faEye} /> {note.viewability.split('')[0].toUpperCase() + note.viewability.substring(1)}</span></h1>
                                        <p className='text-gray'>{content.length > limit ? content.substring(0, limit) + '...' : content}</p>
                                    </a>
                                </Link>
                            </div>
                        })}
                        {notes.length === 0 && <div className='w-full'>
                            <p className='text-gray'>Our flying spaghetti database monster says you haven&apos;t made anything yet!</p>
                        </div>}
                    </div>
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
    let notes = [];
    if (!session) return {
        redirect: {
          page: '/login'
        },
    };
    const db = client.db('Genopi');
    await db.collection('users').findOne({ email: session['user']['email'] }).then(function(user) {
        if (!user || user === null) {
            const xp = 0;
            const level = 0;
            const owned = [];
            const starred = [];
            db.collection('users').insertOne({
                email: session['user']['email'],
                xp: xp,
                level: level,
                owned: owned,
                starred: starred
            });
            genouser = { 'xp': xp, 'level': level, 'owned': owned };
        } else {
            genouser = user
        }
    })

    const options = {
        projection: { _id: 1, title: 1, content: 1, viewability: 1 }
    }
    const userNotes = db.collection('notes').find({ owner: session.user.email }, options)

    await userNotes.forEach(note => notes.push(note));
    
    return {
        props: {
          genouser: JSON.parse(JSON.stringify(genouser)),
          notes: JSON.parse(JSON.stringify(notes)),
        },
    };
}

AugmentiveDashboard.auth = true