import { useRouter } from 'next/router'
import Layout from '../../../../components/layout'
import Footer from '../../../../components/footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowUpRightDots, faLightbulb, faCheck, faFire, faFlagCheckered, faClock } from '@fortawesome/free-solid-svg-icons'
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import Router from 'next/router'

export default function Practice() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [questionNumber, setQuestionNumber] = useState(0);
    const [buttonStyle, setButtonStyle] = useState("neutral");
    const [explanation, setExplanation] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [avgTime, setAvgTime] = useState(0);
    const [screen, setScreen] = useState("test");
    const [showHint, setShowHint] = useState(false);
    const { pid } = router.query

    let test = {
        "name": "McBrierty End-Of-Year Review",
        "creator": "Ekya Dogra",
        "questions": [
            { "question1": "Homeostasis is the balance of what?", "answer1": "Internal and external processes of the body", "hint1": "when it's cold outside, you take a blanket", "explanation1": "Homeostasis is the balance between the external environment and an organism's internal stability. It keeps the body's conditions in equilibrium with the environment's conditions to keep the organism safe and healthy." },
            { "question2": "What is an angiosperm?", "answer2": "A flowering plant", "hint2": "", "explanation2": "" },
            { "question3": "An organism with more than one cell is known as...", "answer3": "Eukaryote", "hint3": "", "explanation3": "" },
            { "question4": "The powerhouse of the cell is...", "answer4": "Mitochondria", "hint4": "", "explanation4": "" },
            { "question5": "Ekya, William, and I are:", "answer5": "Eukaryotes", "hint5": "", "explanation5": "" },
            { "question6": "Which of the following is NOT a characteristic of all living things?", "answer6": "Form relationships", "hint6": "", "explanation6": "" },
            { "question7": "Darwin sailed on the...", "answer7": "HMS Beagle", "hint7": "", "explanation7": "" },
            { "question8": "Diffusion is the process of:", "answer8": "Higher concentrations moving into lower concentration areas", "hint8": "", "explanation8": "" },
            { "question9": "Which of the following is not a stage of the cell cycle?", "answer9": "Transpiration", "hint9": "", "explanation9": "" },
            { "question10": "Osmosis is the diffusion of:", "answer10": "Water", "hint10": "", "explanation10": "" }
        ]
    }
    
    if (status !== "authenticated") { return "Log in to access this page!" }
    let questions = test["questions"];

    const handleAnswerSumbit = (index, answer, time) => {
        setAvgTime(avgTime + time)
        if (index + 1 <= questions.length) {
            let question = questions[index]
            if (question[`answer${index+1}`] === answer) {
                setButtonStyle("green")
                setDisabled(true);
                setCorrect(correct + 1);
                let secs = Math.floor(time / 1000);
                let pointsDeducted = Math.floor(1.7**secs);
                if (pointsDeducted > 80) pointsDeducted = 80;
                let amountGained = 100 - pointsDeducted;
                setScore(score + amountGained)
                if (questionNumber + 1 <= questions.length) {
                    setTimeout(() => {
                        setShowHint(false);
                        setQuestionNumber(index + 1);
                        setButtonStyle("neutral");
                        setDisabled(false);
                    }, 1500)
                } else {
                    setTimeout(() => {
                        setScreen("finish")
                    }, 1500)
                }
            } else {
                setButtonStyle("red")
                setDisabled(true);
                setExplanation(<>
                    <p><span style={{color: '#1ac74e'}}><FontAwesomeIcon icon={faCheck} /></span> <span className="grey">Answer:</span> {question[`answer${index+1}`]}</p>
                    {question[`explanation${index+1}`] !== "" ? <p><span className="grey">Explanation:</span> {question[`explanation${index+1}`]}</p> : null}
                    <button className="green" onClick={() => {
                            setQuestionNumber(index + 1);
                            setButtonStyle("neutral")
                            setExplanation("")
                            setDisabled(false);
                            setShowHint(false);
                    }}>Got it</button>
                </>)
            }
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
        let time = Date.now();
        answers = answers.sort(() => (Math.random() > 0.5) ? 1 : -1)

        return (<>
            <div>
                {answers.map((answer, index) => 
                    <button key={index} className={buttonStyle} style={{flexDirection: 'column', width: '95%'}} onClick={() => handleAnswerSumbit(questionNumber, answer, Date.now() - time)} disabled={disabled}>{answer}</button>
                )}
            </div>
        </>)
    }

    return (
        <>
            <Layout>
                <div style={{marginTop: '80px', paddingBottom: '0px', padding: '10px', backgroundColor: '#1c1c1c', display: 'flex'}}>
                    <Link href="/genopi/dashboard" ><a className="padding neutral"><FontAwesomeIcon icon={faArrowLeft} /></a></Link>
                    <p className="grey" style={{margin: 'auto'}}>{test.name}</p>
                </div>
                { screen === "test" ? <>
                    <div style={{display: 'flex'}}>
                        <div style={{flex: '1', padding: '10px 20px'}}>
                            <div style={{display: 'flex'}}>
                                <p>{questionNumber + 1} <span className="grey">of {questions.length}</span></p>
                                <p style={{marginLeft: 'auto'}}><span style={{color: '#ff3624'}}><FontAwesomeIcon icon={faArrowUpRightDots} /></span> {score} XP</p>
                            </div>
                            { questionNumber + 1 <= questions.length ? 
                                <>
                                    <h1 style={{fontSize: '2.4em'}}>{questions[questionNumber][`question${questionNumber + 1}`]}</h1>
                                    {questions[questionNumber][`hint${questionNumber + 1}`] !== "" ? (<><button onClick={() => setShowHint(true)} className="neutral"><span style={{color: '#ffa70f'}}><FontAwesomeIcon icon={faLightbulb} /></span> {showHint === true ? questions[questionNumber][`hint${questionNumber + 1}`] : null}</button></>
                                        ) : null}
                                    {explanation !== "" ? explanation : null}
                                </>
                            : setScreen("final") }
                        </div>
                        <div style={{flex: '1', paddingTop: '25px', borderLeft: '2px solid rgb(255, 255, 255, 0.2)'}}>
                            <div style={{padding: '10px'}}>
                                {questionNumber + 1 <= questions.length ? CreateAnswers(questionNumber) : setScreen("final") }
                            </div>
                        </div>
                    </div>
                </> : <>
                        <div style={{padding: '10px', paddingTop: '30px', textAlign: 'center'}}>
                            <h1><span style={{color: '#fac30f'}}><FontAwesomeIcon icon={faFlagCheckered} /></span> Congrats, you finished!</h1>
                            <h2><span style={{color: '#ff3624'}}><FontAwesomeIcon icon={faArrowUpRightDots} /></span> {score} XP gained</h2>
                            <h3>
                                <span style={{color: '#1ac74e'}}><FontAwesomeIcon icon={faCheck} /></span> {correct} correct out of {questions.length}<br />
                                <FontAwesomeIcon icon={faClock} /> Average time of {Math.floor((avgTime / questions.length) / 1000)} secs
                            </h3>
                            <div style={{display: 'flex', paddingBottom: '30px', justifyContent: 'center', alignItems: 'center'}}>
                                <Link href=""><a className="padding">Return to test overview</a></Link>
                                <button className="padding neutral" onClick={() => {
                                    setQuestionNumber(0);
                                    setButtonStyle("neutral");
                                    setExplanation("");
                                    setDisabled(false);
                                    setScore(0);
                                    setCorrect(0);
                                    setAvgTime(0);
                                    setScreen("test");
                                }}>Answer more</button>
                            </div>
                        </div>
                </>}
            </Layout>
            <Footer>

            </Footer>
        </>
    )
}