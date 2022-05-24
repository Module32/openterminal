import { useRouter } from 'next/router'
import Layout from '../../../../components/layout'
import Footer from '../../../../components/footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowUpRightDots, faLightbulb, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

export default function Play() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [questionNumber, setQuestionNumber] = useState(0);
    const [buttonStyle, setButtonStyle] = useState("neutral");
    const [streak, setStreak] = useState(0);
    const [explanation, setExplanation] = useState("");
    const { pid } = router.query

    let test = {
        "name": "McBrierty End-Of-Year Review",
        "creator": "Ekya Dogra",
        "questions": [
            { "question1": "Homeostasis is the balance of what?", "answer1": "Internal and external processes of the body", "hint1": "when it's cold outside, you take a blanket", "explanation1": "" },
            { "question2": "What is an angiosperm?", "answer2": "A flowering plant", "hint2": "", "explanation2": "" },
            { "question3": "An organism with more than one cell is known as...", "answer3": "Eukaryote", "hint3": "", "explanation3": "" },
            { "question4": "The powerhouse of the cell is...", "answer4": "Mitochondria", "hint4": "", "explanation4": "" }
        ]
    }
    
    if (status !== "authenticated") { return "Log in to access this page!" }
    let questions = test["questions"];

    const handleAnswerSumbit = (index, answer) => {
        if (index + 1 < questions.length) {
            let question = questions[index]
            if (question[`answer${index+1}`] === answer) {
                setButtonStyle("green")
                setTimeout(() => {
                    setQuestionNumber(index + 1);
                    setButtonStyle("neutral")
                }, 2000)
                setStreak(streak + 1)
            } else {
                setStreak(0)
                setButtonStyle("red")
                setExplanation(<>
                    <p><span style={{color: '#1ac74e'}}><FontAwesomeIcon icon={faCheck} /></span> <span className="grey">Answer:</span> {question[`answer${index+1}`]}</p>
                    {question[`explanation${index+1}`] !== "" ? <>
                        <p><span className="grey">Explanation:</span> {question[`explanation${index+1}`] !== ""}</p>
                        <button className="green" onClick={() => {
                            setQuestionNumber(index + 1);
                            setButtonStyle("neutral")
                            setExplanation("")
                        }}>Got it</button>
                    </> : null}
                </>)
            }
        } else {
            console.log("this is the end")
        }
    }
    
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
                    <button key={index} className={buttonStyle} style={{flexDirection: 'column', width: '95%'}} onClick={() => handleAnswerSumbit(questionNumber, answer)}>{answer}</button>
                )}
            </div>
        </>)
    }

    return (
        <>
            <Layout>
                <div style={{marginTop: '80px', marginBottom: '20px', padding: '10px', backgroundColor: '#1c1c1c', display: 'flex'}}>
                    <Link href="/genopi/dashboard" ><a className="padding neutral"><FontAwesomeIcon icon={faArrowLeft} /></a></Link>
                    <p className="grey" style={{margin: 'auto'}}>{test.name}</p>
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{flex: '1', padding: '10px 20px'}}>
                        <div style={{display: 'flex'}}>
                            <p>{questionNumber + 1} <span className="grey">of {questions.length}</span></p>
                            <p style={{marginLeft: 'auto'}}><span style={{color: '#ff3624'}}><FontAwesomeIcon icon={faArrowUpRightDots} /></span> 0 points</p>
                        </div>
                        <h1 style={{fontSize: '2.4em'}}>{questions[questionNumber][`question${questionNumber + 1}`]}</h1>
                        {questions[questionNumber][`hint${questionNumber + 1}`] !== "" ? (<><p><span style={{color: '#ffa70f'}}><FontAwesomeIcon icon={faLightbulb} /></span> {questions[questionNumber][`hint${questionNumber + 1}`]}</p></>) : null}
                        {explanation !== "" ? explanation : null}
                    </div>
                    <div style={{flex: '1', paddingTop: '25px', borderLeft: '2px solid rgb(255, 255, 255, 0.2)'}}>
                        <div style={{padding: '10px'}}>
                            {CreateAnswers(questionNumber)}
                        </div>
                        <div style={{width: '98%'}}>

                        </div>
                    </div>
                </div>
            </Layout>
            <Footer>

            </Footer>
        </>
    )
}