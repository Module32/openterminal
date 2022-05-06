import Layout from '../../../components/layout'
import Footer from '../../../components/footer'
import Tiptap from '../../../components/Tiptap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faPlus, faTrash } from '@fortawesome/fontawesome-free-solid'
import { useSession } from "next-auth/react"
import redirect from 'nextjs-redirect'
import { useState } from "react"
import { useForm } from "react-hook-form";

export default function Project() {
    const { data: session, status } = useSession()
    const [qnum, setQnum] = useState(1);
    const [questionList, setQuestionList] = useState([]);
    const { register, handleSubmit, errors } = useForm();

    function deleteQuestion(questionIndex) {
      let newArr = [...questionList];
      newArr[questionIndex] = ""
      setQuestionList(newArr)
      let newQnum = qnum + 1;
      setQnum(newQnum);
    }

    const MakeQuestion = (props) => {
      const onSubmit = data => console.log(data);
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div key={props.componentKey.toString()} style={{ backgroundColor: '#13141c', padding: '10px 20px', borderRadius: '10px', margin: '10px', border: '1px solid rgb(255, 255, 255, 0.3)' }}>
          <div style={{display: 'flex', margin: '0', padding: '0'}}>
            <h1><span className="grey">Question</span> {props.componentKey.toString()}</h1>
            <button className="red" onClick={() => deleteQuestion(props.componentKey)} style={{marginLeft: 'auto'}}><FontAwesomeIcon icon={faTrash} /></button>
          </div>
          <div style={{display: 'flex', margin: '0', padding: '0'}}>
            <h3 style={{margin: '0', padding: '0', flex: '0.7'}}>Question<br /><input placeholder="Enter a question" style={{width: '96%'}} {...register(`question-${props.componentKey}`, { required: true })} ></input><br /></h3>
            <h3 style={{margin: '0', padding: '0', flex: '0.7'}}>Answer<br /><input placeholder="Enter the answer" style={{width: '96%'}} {...register(`question-${props.componentKey}`, { required: true })} ></input><br /></h3>
          </div>
          <div style={{display: 'flex', margin: '0', padding: '0'}}>
            <h4 style={{margin: '0', padding: '0', flex: '0.7'}}>Hint <span className="grey">(optional)</span><br /><input placeholder="Any hint?" style={{width: '96%'}}></input></h4>
            <h4 style={{margin: '0', padding: '0', flex: '0.7'}}>Explanation <span className="grey">(optional)</span><br /><input placeholder="Any explanation?" style={{width: '96%'}}></input></h4>
          </div>
          <button style={{margin: "auto"}} type="submit">Save Question</button>
        </div>
        </form>
      )
    }

    const onAddQuestionClick = event => {
      let newQnum = qnum + 1;
      setQnum(newQnum)
      setQuestionList(questionList.concat(<MakeQuestion componentKey={qnum} />))
    }

    if (status !== "authenticated") { return "Log in to access this page!" }
    return (
      <>
        <Layout>
            <div className="hometop" style={{textAlign: 'left', paddingTop: '70px'}}>
                <h1><span style={{ color: '#5d33f5' }}><FontAwesomeIcon icon={faFileAlt} /></span> New Test</h1>
                <p>Create a practice test to prepare for a test, get your students ready, or help your friends!</p>
                <h3><input placeholder="Test Name" style={{width: '100%'}}></input></h3>
                {questionList.toString() === "" ? <p>Let&apos;s add some questions! Click <strong>Add question <FontAwesomeIcon icon={faPlus} /></strong></p> : questionList}
                <h4><button style={{ width: '100%' }} onClick={ onAddQuestionClick }>Add question <FontAwesomeIcon icon={faPlus} /></button></h4>
            </div>
        </Layout>
        <Footer></Footer>
      </>
    )
}