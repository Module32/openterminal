import Layout from '../../../components/layout'
import Footer from '../../../components/footer'
import Tiptap from '../../../components/Tiptap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faPlus, faTrash, faAsterisk, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import { Navigate } from 'react-router-dom';

export default function Project() {
    const { data: session, status } = useSession()
    const [qnum, setQnum] = useState(0);
    const [questionList, setQuestionList] = useState([]);
    const [questionSaveText, setQuestionSaveText] = useState("Save Question");
    const [testTitle, setTestTitle] = useState("(unnamed)");
    const { register, handleSubmit, errors } = useForm();

    if (status !== "authenticated") { return "Log in to access this page!" }

    let questions = [  ]

    function deleteQuestion(questionIndex) {
      let newArr = [...questionList];
      newArr[questionIndex] = ""
      setQuestionList(newArr)
      questions.splice(questionIndex, 1);
      let newQnum = newArr.filter(x => x !== "").length;
      setQnum(newQnum);
    }

    // thanks @tanguy_k https://stackoverflow.com/questions/25764719/update-if-exists-or-add-new-element-to-array-of-objects-elegant-way-in-javascr
    function upsert(array, element) { // (1)
      const i = array.findIndex(_element => _element.id === element.id);
      if (i > -1) array[i] = element; // (2)
      else array.push(element);
    }

    const MakeQuestion = (props) => {
      const onSubmit = data => {
        upsert(questions, data)
      }

      const onQuestionSave = event => {
        setQuestionSaveText("Saved")
        setTimeout(() => {
          setQuestionSaveText("Save Question")
        }, 3000)
      }

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div key={props.componentKey.toString()} style={{ backgroundColor: '#13141c', padding: '10px 20px', borderRadius: '10px', margin: '10px', border: '1px solid rgb(255, 255, 255, 0.3)' }}>
          <div style={{display: 'flex', margin: '0', padding: '0'}}>
            <h1><span className="grey">Question</span> {props.componentKey.toString()}</h1>
            <h4 style={{marginLeft: 'auto'}}><button className="red" onClick={() => deleteQuestion(props.componentKey)} style={{padding: '7px'}}><FontAwesomeIcon icon={faTrash} /></button></h4>
          </div>
          <div style={{display: 'flex', margin: '0', padding: '0'}}>
            <h3 style={{margin: '0', padding: '0', flex: '0.7'}}>Question <span style={{color: "#eb4034"}}><FontAwesomeIcon icon={faAsterisk} /></span><br /><input placeholder="Enter a question" style={{width: '96%'}} {...register(`question`, { required: true })} ></input><br /></h3>
            <h3 style={{margin: '0', padding: '0', flex: '0.7'}}>Answer <span style={{color: "#eb4034"}}><FontAwesomeIcon icon={faAsterisk} /></span><br /><input placeholder="Enter the answer" style={{width: '96%'}} {...register(`answer`, { required: true })} ></input><br /></h3>
          </div>
          <div style={{display: 'flex', margin: '0', padding: '0'}}>
            <h4 style={{margin: '0', padding: '0', flex: '0.7'}}>Hint <span className="grey">(optional)</span><br /><input placeholder="Any hint?" style={{width: '96%'}} {...register(`hint`, { required: false })}></input></h4>
            <h4 style={{margin: '0', padding: '0', flex: '0.7'}}>Explanation <span className="grey">(optional)</span><br /><input placeholder="Any explanation?" style={{width: '96%'}} {...register(`explanation`, { required: false })}></input></h4>
          </div>
          <button style={{margin: "auto"}} type="submit" onClick={() => {onQuestionSave}}>{questionSaveText}</button>
        </div>
        </form>
      )
    }

    const onAddQuestionClick = event => {
      let newQnum = qnum + 1;
      setQnum(newQnum)
      setQuestionList(questionList.concat(<MakeQuestion componentKey={newQnum} />))
    }

    const onQuizSubmit = async event => {
      if (questions.length = 0) return;
      
      let test = {
        title: testTitle,
        creator: `${session.user.name}::-${session.user.email}`,
        questions: questions.toString(),
        date: Date.now()
      };
      
      fetch('https://openterminal.vercel.app/api/augmentive/test', {
          method: 'POST',
          body: test,
          headers: { 'Content-Type': 'application/json' }
      }).catch(err => console.log(err));
    }

    return (
      <>
        <Layout>
            <div className="hometop" style={{textAlign: 'left', paddingTop: '70px'}}>
                <h1><span style={{ color: '#5d33f5' }}><FontAwesomeIcon icon={faFileAlt} /></span> New Test</h1>
                <h3><input placeholder="Test Name" style={{width: '100%'}} onChange={(msg) => setTestTitle(msg)}></input></h3>
                {questionList}
                <h4><button style={{ width: '100%' }} onClick={ onAddQuestionClick }>Add question <FontAwesomeIcon icon={faPlus} /></button></h4>
                <h4><button style={{ width: '100%' }} className="green" onClick={ onQuizSubmit }>Save test <FontAwesomeIcon icon={faCheck} /></button></h4>
            </div>
        </Layout>
        <Footer></Footer>
      </>
    )
}