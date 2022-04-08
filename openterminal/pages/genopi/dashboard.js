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
                <div style={{backgroundColor: 'white', padding: '25px', borderRadius: '5px'}}>
                    <h1 style={{fontWeight: '700'}}><span className="grey">Welcome back,</span> {session.user.name}</h1>
                </div>
                <p>Create a...</p>
                <div style={{display: 'flex'}}>
                    <Link href=""><a className="boxy" style={{flexDirection: 'row'}}><FontAwesomeIcon icon="copy" style={{color: 'rgb(25, 186, 255)'}}></FontAwesomeIcon>New Test</a></Link>
                    <Link href=""><a className="boxy" style={{flexDirection: 'row'}}><FontAwesomeIcon icon="newspaper" style={{color: 'rgb(25, 186, 255)'}}></FontAwesomeIcon>New Reading</a></Link>
                </div>
            </div>
        </Layout>
        <Footer></Footer>
      </>
    )
}