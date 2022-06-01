import { useRouter } from 'next/router'
import Layout from '../../../../components/layout'
import Footer from '../../../../components/footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowUpRightDots, faLightbulb, faCheck, faFire, faFlagCheckered, faClock } from '@fortawesome/free-solid-svg-icons'
import { useSession } from "next-auth/react"
import React, { useState, useEffect } from "react"
import Router from 'next/router'
import Image from 'next/image'
import AudioPlayer from '../../../../lib/audio/AudioPlayer'

export default function Play() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [questionNumber, setQuestionNumber] = useState(0);
    const [buttonStyle, setButtonStyle] = useState("neutral");
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
    
    if (status !== "authenticated") { return "Log in to access this page!" }
    let questions = test["questions"];
    let incorrectQuestions = []

    const handleAnswerSumbit = (index, answer, time) => {
        setAvgTime(avgTime + time)
        if (streak > highStreak) setHighStreak(streak);
        if (index + 1 <= questions.length) {
            let question = questions[index]
            if (question[`answer${index+1}`] === answer) {
                setButtonStyle("green")
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
                        setButtonStyle("neutral");
                        setDisabled(false);
                    }, 1500)
                } else {
                    setTimeout(() => {
                        setScreen("finish")
                    }, 1500)
                }
            } else {
                setStreak(0)
                setButtonStyle("red")
                setDisabled(true);
                incorrectQuestions.push(index)
                console.log(incorrectQuestions)
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

    const MakePlayer = (name, bkgmode) => {
        console.log(name, bkgmode)
        return (<>
            <span className="codefont" style={{backgroundColor: name['bkgmode'] === "neutral" ? '#383838' : "#ff306e", padding: '5px 15px', borderRadius: '7px', margin: '10px'}}>{name['name']}</span>
        </>)
    }

    const music = [
        {
          title: "Dynamic",
          artist: "Voyage",
          audioSrc: require('../../../../public/music/genopi/dynamic.mp3'),
          image: require('../../../../public/pics/genopi/cyberline/waves.png'),
        },
        {
            title: "Dusk",
            artist: "Jasper De Ceuster",
            audioSrc: require('../../../../public/music/genopi/dusk.mp3'),
            image: require('../../../../public/pics/genopi/cyberline/waves.png'),
        },
    ]

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
                    <MakePlayer bkgmode="neutral" name={players[currentPlayerIndex + 2]} />
                    <MakePlayer bkgmode="neutral" name={players[currentPlayerIndex + 1]} />
                    <MakePlayer bkgmode="main" name={players[currentPlayerIndex]} />
                    <MakePlayer bkgmode="neutral" name={players[currentPlayerIndex - 1]} />
                    <MakePlayer bkgmode="neutral" name={players[currentPlayerIndex - 2]} />
            </>
        } else if (currentPlayerIndex === 1) {
            return <>
                <MakePlayer bkgmode="neutral" name={players[4]} />
                <MakePlayer bkgmode="neutral" name={players[3]} />
                <MakePlayer bkgmode="neutral" name={players[2]} />
                <MakePlayer bkgmode="main" name={players[1]} />
                <MakePlayer bkgmode="neutral" name={players[0]} />
            </>
        } else if (currentPlayerIndex === 0) {
            return <>
                <MakePlayer bkgmode="neutral" name={players[4]} />
                <MakePlayer bkgmode="neutral" name={players[3]} />
                <MakePlayer bkgmode="neutral" name={players[2]} />
                <MakePlayer bkgmode="neutral" name={players[1]} />
                <MakePlayer bkgmode="main" name={players[0]} />
            </>
        } else {
            return <span>Couldn&apos;t load user ranks.</span>
        }
    }

    return (
        <>
            <Layout>
                <div style={{marginTop: '80px', paddingBottom: '0px', padding: '10px', backgroundColor: 'black', display: 'flex', alignItems: 'center'}}>
                    <Link href="/genopi/dashboard" ><a className="padding neutral"><FontAwesomeIcon icon={faArrowLeft} /></a></Link>
                    <div style={{margin: 'auto'}}>
                        <Image
                            src="pics/genopi/cyberline/cyberline.png"
                            width="180"
                            height="40"
                            alt="Cyberline"
                        />
                    </div>
                </div>
                <div style={{paddingBottom: '0px', padding: '10px', width: '100%', backgroundColor: '#1c1c1c', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <LoadPlayers />
                    <span style={{marginLeft: 'auto'}}><MakePlayer name="1" bkgmode="main" /></span>
                </div>
                <div className="genopi1 cyberline">
                { screen === "test" ? <>
                    <div style={{display: 'flex'}} className="codefont">
                        <div style={{flex: '1', padding: '10px 20px'}}>
                            <div style={{display: 'flex'}}>
                                <p>{questionNumber + 1} <span className="grey">of {questions.length}</span></p>
                                <p style={{marginLeft: 'auto'}}><span style={{color: '#ff306e'}}><FontAwesomeIcon icon={faArrowUpRightDots} /> {score}</span> XP {streak >= 5 ? <span>+ <span style={{color: '#f5b00f'}}>{streak * 1.5}</span> streak XP</span>: null}</p>
                            </div>
                            { questionNumber + 1 <= questions.length ? 
                                <>
                                    <h1 style={{fontSize: '2.4em'}}>{questions[questionNumber][`question${questionNumber + 1}`]}</h1>
                                    <div style={{display: 'flex'}}>
                                        {questions[questionNumber][`hint${questionNumber + 1}`] !== "" ? (<><button onClick={() => setShowHint(true)} className="neutral"><span style={{color: '#ffa70f'}}><FontAwesomeIcon icon={faLightbulb} /></span> {showHint === true ? questions[questionNumber][`hint${questionNumber + 1}`] : null}</button></>
                                        ) : null}
                                        <button style={{ backgroundColor: streak > 4 ? '#ff2975' : 'rgb(255, 255, 255, 0.2)', color: 'white' }}>
                                            <FontAwesomeIcon icon={faFire} /> { streak > 9 ?
                                                <span><strong>You&apos;re on fire!</strong> Streak of <strong>{streak}</strong></span> :
                                                streak > 4 ?
                                                <span><strong>Nice!</strong> Streak of <strong>{streak}</strong></span> :
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
                        <div className="codefont" style={{padding: '10px 30px', paddingTop: '30px', display: 'flex'}}>
                            <div style={{flex: '0.8'}}>
                                <h1 style={{fontSize: '3em'}}>Congrats, you finished!</h1>
                                <p>Check out how you did below.</p>
                                <div style={{display: 'flex', paddingBottom: '30px'}}>
                                    <Link href=""><a className="padding">Return to test overview</a></Link>
                                    <button className="padding neutral" onClick={() => {
                                        setQuestionNumber(0);
                                        setButtonStyle("neutral");
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
                            <div style={{flex: '1.2', display: 'flex'}}>
                                <div style={{padding: '10px', borderRadius: '7px', backgroundColor: 'rgb(255, 48, 110, 0.4)', margin: '5px'}}>
                                    <h1><FontAwesomeIcon icon={faCheck} /> {correct} questions</h1>
                                    <p>Number of questions correct</p>
                                </div>

                                <div style={{padding: '10px', borderRadius: '7px', backgroundColor: 'rgb(255, 48, 110, 0.4)', margin: '5px'}}>
                                    <h1><FontAwesomeIcon icon={faArrowUpRightDots} /> {score} XP</h1>
                                    <p>Gained from this session</p>
                                </div>

                                <div style={{padding: '10px', borderRadius: '7px', backgroundColor: 'rgb(255, 48, 110, 0.4)', margin: '5px'}}>
                                    <h1><FontAwesomeIcon icon={faFire} /> {highStreak} questions</h1>
                                    <p>Your highest streak</p>
                                </div>

                                <div style={{padding: '10px', borderRadius: '7px', backgroundColor: 'rgb(255, 48, 110, 0.4)', margin: '5px'}}>
                                    <h1><FontAwesomeIcon icon={faClock} /> {Math.floor((avgTime / questions.length) / 1000)} seconds</h1>
                                    <p>Average time per question</p>
                                </div>
                            </div>
                            <br />
                            <h1 style={{fontSize: '45px'}}>Questions to practice</h1>
                            { incorrectQuestions.map((index) => <>
                                <div style={{padding: '10px', borderRadius: '7px', margin: '5px', backgroundColor: 'white', border: '3px solid '}}>
                                    <div style={{display: 'flex'}}>
                                        <div style={{flex: '1'}}>
                                            <h1>{questions[index][`question${index+1}`]}</h1>
                                        </div>
                                        <div style={{flex: '1'}}>
                                            <span>Correct answer:</span>
                                            <button className="padding green" style={{width: '100%'}}>{questions[index][`answer${index+1}`]}</button>
                                        </div>
                                    </div>
                                </div>
                            </>) }
                        </div>
                </>}
                <div className="codefont" style={{padding: '10px', backgroundColor: 'black', display: 'flex'}}>
                        <AudioPlayer tracks={music} />
                        <p style={{marginLeft: 'auto'}}><span style={{color: '#ff306e'}}>Cyberline</span> <span className="grey">|</span> The future awaits</p>
                </div>
                </div>
            </Layout>
            <Footer>

            </Footer>
        </>
    )
}