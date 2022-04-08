import Layout from '../../components/layout'
import Footer from '../../components/footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faNewspaper } from '@fortawesome/fontawesome-free-solid'
import Fade from 'react-reveal/Fade';
import { useSession } from "next-auth/react"

export default function Project() {
    const { data: session, status } = useSession()
    if (status !== "authenticated") { return 403 }
    return (
      <>
        <Layout>
            <div className="hometop" style={{backgroundColor: '#efefefff', color: 'black', textAlign: 'left'}}>
                <div style={{backgroundColor: 'white', marginTop: '10px', padding: '25px', borderRadius: '10px', display: 'flex', boxShadow: '0px 5px 10px rgb(0, 0, 0, 0.15)'}}>
                    <h1 style={{fontWeight: '700', flexDirection: 'row'}}><span className="grey">Welcome back,</span> {session.user.name}</h1>
                    <h1 style={{flexDirection: 'row', marginLeft: 'auto'}}>0XP | Level 0</h1>
                </div>
                <p>Create a...</p>
                <div style={{display: 'flex'}}>
                    <Link href=""><a className="boxy" style={{flexDirection: 'row', color: 'black', backgroundImage: "url('/pics/genopi/newtest.png')", backgroundSize: 'cover'}}><span style={{backgroundColor: 'white', padding: '5px', borderRadius: '5px'}}>New Test</span></a></Link>
                    <Link href=""><a className="boxy" style={{flexDirection: 'row', color: 'black', backgroundImage: "url('/pics/genopi/newreading.png')", backgroundSize: 'cover'}}><span  style={{backgroundColor: 'white', padding: '5px', borderRadius: '5px'}}>New Reading</span></a></Link>
                </div>
            </div>
        </Layout>
        <Footer></Footer>
      </>
    )
}