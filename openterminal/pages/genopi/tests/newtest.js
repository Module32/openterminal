import Layout from '../../../components/layout'
import Footer from '../../../components/footer'
import Tiptap from '../../../components/Tiptap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faPlus } from '@fortawesome/fontawesome-free-solid'
import { useSession } from "next-auth/react"
import redirect from 'nextjs-redirect'

export default function Project() {
    const { data: session, status } = useSession()
    if (status !== "authenticated") { return "Log in to access this page!" }
    return (
      <>
        <Layout>
            <div className="hometop" style={{textAlign: 'left', paddingTop: '70px'}}>
                <h2><span style={{ color: '#5d33f5' }}><FontAwesomeIcon icon={faFileAlt} /></span>New Test</h2>
                <h3><input placeholder="Test Name" style={{width: '100%'}}></input></h3>
                {[...Array(4)].map((x) => 
                    <div style={{ backgroundColor: '#0f0f0f', padding: '10px', borderRadius: '10px', margin: '5px', border: '1px solid rgb(255, 255, 255, 0.4)', display: 'flex' }}>
                    <h2>Question<br /><input style={{ width: '50%' }} placeholder="Enter a question"></input></h2>
                    <h2>Answer<br /><input style={{ width: '50%' }} placeholder="Enter the answer"></input></h2>
                    </div>
                )}
                <h4><button style={{ width: '100%' }}><FontAwesomeIcon icon={faPlus} /> Add question</button></h4>
            </div>
        </Layout>
        <Footer></Footer>
      </>
    )
}