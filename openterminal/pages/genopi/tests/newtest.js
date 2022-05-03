import Layout from '../../../components/layout'
import Footer from '../../../components/footer'
import Tiptap from '../../../components/Tiptap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faPlus } from '@fortawesome/fontawesome-free-solid'
import { useSession } from "next-auth/react"
import redirect from 'nextjs-redirect'

function MakeQuestionDiv(props) {
  return (
    <div key={props.key} style={{ backgroundColor: '#13141c', padding: '10px', borderRadius: '10px', marginBottom: '8px', border: '1px solid rgb(255, 255, 255, 0.3)' }}>
      <div style={{display: 'flex', margin: '0', padding: '0'}}>
        <h3 style={{margin: '0', padding: '0', flex: '0.7'}}>Question<br /><input placeholder="Enter a question" style={{width: '96%'}}></input></h3>
        <h3 style={{margin: '0', padding: '0', flex: '0.7'}}>Answer<br /><input placeholder="Enter the answer" style={{width: '96%'}}></input></h3>
      </div>
      <div style={{display: 'flex', margin: '0', padding: '0'}}>
        <h4 style={{margin: '0', padding: '0', flex: '0.7'}}>Hint <span className="grey">(optional)</span><br /><input placeholder="Any hint?" style={{width: '96%'}}></input></h4>
        <h4 style={{margin: '0', padding: '0', flex: '0.7'}}>Explanation <span className="grey">(optional)</span><br /><input placeholder="Any explanation?" style={{width: '96%'}}></input></h4>
      </div>
    </div>
  )
}

export default function Project() {
    const { data: session, status } = useSession()
    if (status !== "authenticated") { return "Log in to access this page!" }
    return (
      <>
        <Layout>
            <div className="hometop" style={{textAlign: 'left', paddingTop: '70px'}}>
                <h1><span style={{ color: '#5d33f5' }}><FontAwesomeIcon icon={faFileAlt} /></span> New Test</h1>
                <p>Create a practice test to prepare for a test, get your students ready, or help your friends!</p>
                <h3><input placeholder="Test Name" style={{width: '100%'}}></input></h3>
                {[...Array(4)].map((x, i) => 
                    <MakeQuestionDiv key={i} />
                )}
                <h4><button style={{ width: '100%' }} onClick={ () => <MakeQuestionDiv key="no" /> }><FontAwesomeIcon icon={faPlus} /> Add question</button></h4>
            </div>
        </Layout>
        <Footer></Footer>
      </>
    )
}