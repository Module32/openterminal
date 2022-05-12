import Layout from '../../../components/layout'
import Footer from '../../../components/footer'
import Tiptap from '../../../components/Tiptap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote } from '@fortawesome/fontawesome-free'
import Fade from 'react-reveal/Fade';
import { useSession } from "next-auth/react"
import redirect from 'nextjs-redirect'

export default function Project() {
    const { data: session, status } = useSession()
    if (status !== "authenticated") { return "Log in to access this page!" }
    return (
      <>
        <Layout>
            <div className="hometop" style={{textAlign: 'left', paddingTop: '70px'}}>
                <h3><span style={{ color: '#f7a427ff' }}><FontAwesomeIcon icon={faStickyNote} /></span> New Note Session</h3>
                <h3><input placeholder="Title goes here...!" style={{width: '100%'}}></input></h3>
                <Tiptap content="Let&apos;s write something!"/>
            </div>
        </Layout>
        <Footer></Footer>
      </>
    )
}