import { useRouter } from 'next/router'
import Layout from '../../../../components/layout'
import Footer from '../../../../components/footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowUpRightDots, faLightbulb, faCheck, faFire, faFlagCheckered, faClock } from '@fortawesome/free-solid-svg-icons'
import { useSession } from "next-auth/react"
import React, { useState, useEffect } from "react"
import Image from 'next/image'

export default function Play() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [questionNumber, setQuestionNumber] = useState(0);
    const [buttonStyle, setButtonStyle] = useState("bg-slate-700 hover:bg-slate-600 text-left w-full");
    const [streak, setStreak] = useState(0);
    const [explanation, setExplanation] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [highStreak, setHighStreak] = useState(0);
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
    
    // if (status !== "authenticated") { return "Log in to access this page!" }
    let questions = test["questions"];
    let incorrectQuestions = []

    const handleAnswerSumbit = (index, answer, time) => {
        setAvgTime(avgTime + time)
        if (streak > highStreak) setHighStreak(streak);
        if (index + 1 <= questions.length) {
            let question = questions[index]
            if (question[`answer${index+1}`] === answer) {
                setButtonStyle("bg-emerald-600 hover:bg-emerald-600 text-left w-full")
                setDisabled(true);
                setCorrect(correct + 1);
                setStreak(streak + 1)
                let secs = Math.floor(time / 1000);
                let pointsDeducted = Math.floor(1.6**secs);
                if (pointsDeducted > 80) pointsDeducted = 80;
                let amountGained = 110 - pointsDeducted;
                if (streak >= 5) {
                    amountGained += streak * 1.5;
                }
                setScore(score + amountGained)
                if (questionNumber + 1 <= questions.length) {
                    setTimeout(() => {
                        setShowHint(false);
                        setQuestionNumber(index + 1);
                        setButtonStyle("bg-slate-700 hover:bg-slate-600 text-left w-full")
                        setDisabled(false);
                    }, 1500)
                } else {
                    setTimeout(() => {
                        setScreen("finish")
                    }, 1500)
                }
            } else {
                setStreak(0)
                setButtonStyle("bg-red-500 hover:bg-red-500 text-left w-full")
                setDisabled(true);
                incorrectQuestions.push(index)
                console.log(incorrectQuestions)
                setExplanation(<>
                    <p><span style={{color: '#1ac74e'}}><FontAwesomeIcon icon={faCheck} /></span> <span className="grey">Answer:</span> {question[`answer${index+1}`]}</p>
                    {question[`explanation${index+1}`] !== "" ? <p><span className="grey">Explanation:</span> {question[`explanation${index+1}`]}</p> : null}
                    <button className="green" onClick={() => {
                            setQuestionNumber(index + 1);
                            setButtonStyle("bg-slate-700 hover:bg-slate-600 text-left w-full")
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
                    <button key={index} className={buttonStyle} onClick={() => handleAnswerSumbit(questionNumber, answer, Date.now() - time)} disabled={disabled}>{answer}</button>
                )}
            </div>
        </>)
    }

    const MakePlayer = (name, bkgmode) => {
        console.log(name, bkgmode)
        return (<>
            <span className={name['bkgmode'] === "neutral" ? 'bg-neutral-700 py-1 px-2 m-2 rounded-lg font-semibold' : "bg-primary py-1 px-2 m-2 rounded-lg font-bold"}>{name['name']}</span>
        </>)
    }

    const players = [ 
        { name: "You", points: 0 }
    ]

    let firstNames = [ "Harry","Ross",
    "Bruce","Cook",
    "Carolyn","Morgan",
    "Albert","Walker",
    "Randy","Reed",
    "Larry","Barnes",
    "Lois","Wilson",
    "Jesse","Campbell",
    "Ernest","Rogers",
    "Theresa","Patterson",
    "Henry","Simmons",
    "Michelle","Perry",
    "Frank","Butler",
    "Shirley", "Sidhu" ]
    let lastNames = [ "Ruth","Jackson",
    "Debra","Allen",
    "Gerald","Harris",
    "Raymond","Carter",
    "Jacqueline","Torres",
    "Joseph","Nelson",
    "Carlos","Sanchez",
    "Ralph","Clark",
    "Jean","Alexander",
    "Stephen","Roberts",
    "Eric","Long",
    "Amanda","Scott",
    "Teresa","Diaz",
    "Wanda","Thomas" ]

    let i = 0;
    while (i < 30) {
        let firstName = firstNames.sort(() => 0.5 - Math.random())[0];
        let lastName = lastNames.sort(() => 0.5 - Math.random())[0]
        players.push({ name: `${firstName} ${lastName}`, points: 0 });
        i += 1;
    }

    const currentPlayerIndex = players.findIndex(obj => obj.name=="You");

    const LoadPlayers = () => {
        if (currentPlayerIndex >= 2) {
            return <>
                    <MakePlayer bkgmode="neutral" name={players[currentPlayerIndex + 2]['name']} />
                    <MakePlayer bkgmode="neutral" name={players[currentPlayerIndex + 1]['name']} />
                    <MakePlayer bkgmode="main" name={players[currentPlayerIndex]['name']} />
                    <MakePlayer bkgmode="neutral" name={players[currentPlayerIndex - 1]['name']} />
                    <MakePlayer bkgmode="neutral" name={players[currentPlayerIndex - 2]['name']} />
            </>
        } else if (currentPlayerIndex === 1) {
            return <>
                <MakePlayer bkgmode="neutral" name={players[4]['name']} />
                <MakePlayer bkgmode="neutral" name={players[3]['name']} />
                <MakePlayer bkgmode="neutral" name={players[2]['name']} />
                <MakePlayer bkgmode="main" name={players[1]['name']} />
                <MakePlayer bkgmode="neutral" name={players[0]['name']} />
            </>
        } else if (currentPlayerIndex === 0) {
            return <>
                <MakePlayer bkgmode="neutral" name={players[4]['name']} />
                <MakePlayer bkgmode="neutral" name={players[3]['name']} />
                <MakePlayer bkgmode="neutral" name={players[2]['name']} />
                <MakePlayer bkgmode="neutral" name={players[1]['name']} />
                <MakePlayer bkgmode="main" name={players[0]['name']} />
            </>
        } else {
            return <span>Couldn&apos;t load user ranks.</span>
        }
    }

    return (
        <>
            <Layout>
                <div className="p-2 flex bg-black">
                    <Link href="/genopi/dashboard" ><a className="padding neutral"><FontAwesomeIcon icon={faArrowLeft} /></a></Link>
                    <div className="m-auto">
                        <Image
                            src="/pics/genopi/cyberline/cyberline.png"
                            width="180"
                            height="40"
                            alt="Cyberline"
                        />
                    </div>
                </div>
                <div className="bg-neutral-900 p-1 flex">
                    <LoadPlayers />
                </div>
                <div className="bg-[url('/pics/genopi/cyberline/city.png')] bg-contain">
                { screen === "test" ? <>
                    <div className="flex">
                        <div className="flex-1 p-8 py-9 font-medium">
                            <div className="flex">
                                <p>{questionNumber + 1} <span className="text-gray">of {questions.length}</span></p>
                                <p className="ml-auto"><span className="text-primary"><FontAwesomeIcon icon={faArrowUpRightDots} /> {score}</span> XP {streak >= 5 ? <span>+ <span style={{color: '#f5b00f'}}>{streak * 1.5}</span> streak XP</span>: null}</p>
                            </div>
                            { questionNumber + 1 <= questions.length ? 
                                <>
                                    <h1 className="text-5xl my-3 font-bold">{questions[questionNumber][`question${questionNumber + 1}`]}</h1>
                                    <div className="flex">
                                        {questions[questionNumber][`hint${questionNumber + 1}`] !== "" ? (<><button className="bg-slate-100 hover:bg-slate-400 text-black" onClick={() => setShowHint(true)}><FontAwesomeIcon icon={faLightbulb} /> {showHint === true ? questions[questionNumber][`hint${questionNumber + 1}`] : null}</button></>
                                        ) : null}
                                        <button style={{ backgroundColor: streak > 4 ? '#ff2975' : 'rgb(255, 255, 255, 0.2)', color: 'white' }}>
                                            <FontAwesomeIcon icon={faFire} /> { streak > 9 ?
                                                <span>You&apos;re on fire! Streak of <strong>{streak}</strong></span> :
                                                streak > 4 ?
                                                <span>Nice! Streak of <strong>{streak}</strong></span> :
                                                <span>Streak of <strong>{streak}</strong></span>
                                            }
                                        </button>
                                    </div>
                                    {explanation !== "" ? explanation : null}
                                </>
                            : setScreen("final") }
                        </div>
                        <div style={{flex: '1', paddingTop: '25px'}}>
                            <div style={{padding: '10px'}}>
                                {questionNumber + 1 <= questions.length ? CreateAnswers(questionNumber) : setScreen("final") }
                            </div>
                        </div>
                    </div>
                </> : <>
                        <div className="p-6 flex font-semibold">
                            <div className="flex-1">
                                <h1 className="text-6xl">Congrats, you finished!</h1>
                                <p className="py-2">Check out how you did.</p>
                                <div className="flex pb-3">
                                    <Link href=""><a className="padding">Return to test overview</a></Link>
                                    <button className="padding neutral" onClick={() => {
                                        setQuestionNumber(0);
                                        setButtonStyle("bg-slate-700 hover:bg-slate-600 text-left w-full");
                                        setStreak(0);
                                        setExplanation("");
                                        setDisabled(false);
                                        setScore(0);
                                        setHighStreak(0);
                                        setCorrect(0);
                                        setAvgTime(0);
                                        setScreen("test");
                                    }}>Answer more</button>
                                </div>
                            </div>
                            <div className="flex flex-1">
                                <div className="p-3 bg-primary rounded-xl m-2">
                                    <h1 className="text-3xl"><FontAwesomeIcon icon={faCheck} /> {correct} questions correct</h1>
                                </div>

                                <div className="p-3 bg-primary rounded-xl m-2">
                                    <h1 className="text-3xl"><FontAwesomeIcon icon={faArrowUpRightDots} /> {score} XP from this game</h1>
                                </div>

                                <div className="p-3 bg-primary rounded-xl m-2">
                                    <h1 className="text-3xl"><FontAwesomeIcon icon={faFire} /> Streak of {highStreak} questions</h1>
                                </div>

                                <div className="p-3 bg-primary rounded-xl m-2">
                                    <h1 className="text-3xl"><FontAwesomeIcon icon={faClock} /> ~{Math.floor((avgTime / questions.length) / 1000)} seconds for each question</h1>
                                </div>
                            </div>
                            <br />
                        </div>
                </>}
                <div className="codefont" style={{padding: '10px', backgroundColor: 'black', display: 'flex'}}>
                        
                        <p style={{marginLeft: 'auto'}}><span style={{color: '#ff306e'}}>Cyberline</span> <span className="grey">|</span> The future awaits</p>
                </div>
                </div>
            </Layout>
            <Footer>

            </Footer>
        </>
    )
}