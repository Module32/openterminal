import Layout from '../../../components/layout'
import Footer from '../../../components/footer'
import Tiptap from '../../../components/Tiptap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'
import Fade from 'react-reveal/Fade';
import { useSession } from "next-auth/react"

export default function Project() {
    const { data: session, status } = useSession()
    if (status !== "authenticated") { return "Log in to access this page!" }
    return (
      <>
        <Layout>
            <div className="hometop" style={{textAlign: 'left', paddingTop: '70px'}}>
                <h1><span style={{ color: '#f7a427ff' }}><FontAwesomeIcon icon={faStickyNote} /></span> New Note Session</h1>
                <h3><input placeholder="Title goes here...!" style={{width: '100%'}}></input></h3>
                <Tiptap content="Let&apos;s write something!" readonly={false}/>
                <Tiptap content="this is read-only" readonly={true}/>
                <Tiptap content="one more lil test"/>
            </div>
        </Layout>
        <Footer></Footer>
      </>
    )
}