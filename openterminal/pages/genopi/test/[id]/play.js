import { useRouter } from 'next/router'
import Layout from '../../../../components/layout'
import Footer from '../../../../components/footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHundredPoints } from '@fortawesome/free-solid-svg-icons'
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

export default function Play() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [questionNumber, setQuestionNumber] = useState(0);
    const { pid } = router.query

    let test = {
        "name": "McBrierty End-Of-Year Review",
        "creator": "Ekya Dogra",
        "questions": [
            { "question1": "Homeostasis is the balance of what?", "answer1": "Internal and external processes of the body", "hint1": "", "explanation1": "" },
            { "question1": "What is an angiosperm?", "answer1": "A flowering plant", "hint1": "", "explanation1": "" },
            { "question1": "An organism with more than one cell is known as...", "answer1": "Eukaryote", "hint1": "", "explanation1": "" },
            { "question1": "The powerhouse of the cell is...", "answer1": "Mitochondria", "hint1": "", "explanation1": "" }
        ]
    }
    
    if (status !== "authenticated") { return "Log in to access this page!" }
    let questions = test["questions"];
    
    const CreateAnswers = (index) => {
        let answers = [];
        answers.push(questions[index][`answer${index+1}`])
        let newindex = Math.floor(Math.random()*questions.length);
        let i = 0;
        if (questions.length <= 3) {
            while (i < questions.length - 1) {
                let newindex = Math.floor(Math.random()*questions.length);
                let randomAnswer = questions[newindex][`answer${newindex+1}`];
                answers.push(randomAnswer);
                i += 1;
            }
        } else {
            while (i < 3) {
                let newindex = Math.floor(Math.random()*questions.length);
                let randomAnswer = questions[newindex][`answer${newindex+1}`];
                answers.push(randomAnswer);
                i += 1;
            }
        }

        answers = answers.sort(() => (Math.random() > 0.5) ? 1 : -1)

        return (<>
            <div>
                {answers.map((answer, index) => 
                    <button key={index} className="neutral" style={{flexDirection: 'column', width: '95%'}}>{answer}</button>
                )}
            </div>
        </>)
    }

    return (
        <>
            <Layout>
                <div style={{marginTop: '90px', marginBottom: '20px', padding: '10px', backgroundColor: '#1c1c1c', display: 'flex'}}>
                    <Link href="/genopi/dashboard" ><a className="padding neutral"><FontAwesomeIcon icon={faArrowLeft} /></a></Link>
                    <p className="grey" style={{margin: 'auto'}}>{test.name}</p>
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{flex: '1', padding: '10px'}}>
                        <div style={{display: 'flex'}}>
                            <p>1 <span className="grey">of {questions.length}</span></p>
                            <p style={{marginLeft: 'auto'}}><span style={{color: '#ff3624'}}><FontAwesomeIcon icon={faHundredPoints} /></span> 0 points</p>
                        </div>
                        <h1>{questions[0].question1}</h1>
                    </div>
                    <div style={{flex: '1', padding: '10px', paddingTop: '25px', borderLeft: '2px solid rgb(255, 255, 255, 0.2)'}}>
                        {CreateAnswers(0)}
                    </div>
                </div>
            </Layout>
            <Footer>

            </Footer>
        </>
    )
}