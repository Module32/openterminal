import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import Footer from '../../../components/footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
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
    
    const CreateAnswers = (index) => {
        let questions = test.questions;
        let answers = [];
        answers.push(questions[index][`answer${index}`])
        let i;
        if (questions.length < 3) {
            while (i < questions.length) {
                let index = Math.floor(Math.random()*questions.length);
                let randomAnswer = questions[index][`answer${index}`];
                if (answers.includes(randomAnswer)) {
                    return;
                } else {
                    answers.push(randomAnswer);
                }
            }
        } else {
            while (i < 4) {
                if (answers.includes(questions[i][`answer${i}`])) {
                    return;
                } else {
                    answers.push(questions[i][`answer${i}`]);
                }
            }
        }
        answers = answers.sort(() => (Math.random() > 0.5) ? 1 : -1)

        return (<>
            {answers.map((answer, index) => 
                <button key={index} className="neutral" style={{flexDirection: 'column'}}>{answer}</button>
            )}
        </>)
    }

    return (
        <>
            <Layout>
                <div style={{paddingTop: '50px', paddingBottom: '20px', padding: '10px 5px', backgroundColor: '#1c1c1c', display: 'flex'}}>
                    <Link href="/genopi/dashboard" ><a className="padding neutral"><FontAwesomeIcon icon={faArrowLeft} /></a></Link>
                    <p className="grey" style={{margin: 'auto'}}>{test.name}</p>
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{flex: '1'}}>
                        <h1>{test.questions[0].question1}</h1>
                    </div>
                    <div style={{flex: '1'}}>
                        {CreateAnswers(0)}
                    </div>
                </div>
            </Layout>
            <Footer>

            </Footer>
        </>
    )
}