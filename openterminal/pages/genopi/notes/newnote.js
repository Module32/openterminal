import Layout from '../../../components/layout'
import Footer from '../../../components/footer'
import Tiptap from '../../../components/Tiptap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote } from '@fortawesome/fontawesome-free-solid'
import Fade from 'react-reveal/Fade';
import { useSession } from "next-auth/react"

export default function Project() {
    const { data: session, status } = useSession()
    if (status !== "authenticated") { return 403 }
    return (
      <>
        <Layout>
            <div className="hometop" style={{textAlign: 'left', paddingTop: '70px'}}>
                <p><span style={{ color: '#f7a427ff' }}><FontAwesomeIcon icon={faStickyNote} /></span> New Note Session</p>
                <h1><input placeholder="Title goes here...!" style={{width: '100%'}}></input></h1>
                <Tiptap />
            </div>
        </Layout>
        <Footer></Footer>
      </>
    )
}