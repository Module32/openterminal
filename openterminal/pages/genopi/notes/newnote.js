import Layout from '../../../components/layout'
import Footer from '../../../components/footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faNewspaper, faRocket } from '@fortawesome/fontawesome-free-solid'
import Fade from 'react-reveal/Fade';
import { useSession } from "next-auth/react"
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const mkdStr = "###### Note time!"

export default function Project() {
    const { data: session, status } = useSession()
    const [value, setValue] = useState(mkdStr);
    if (status !== "authenticated") { return null }
    return (
      <>
        <Layout>
            <div className="hometop" style={{backgroundColor: '#efefefff', color: 'black', textAlign: 'left'}}>
                <input placeholder="New Note" style={{width: '100%'}}></input>
                <MDEditor height={500} value={value} onChange={(newValue) => setValue(newValue)} />
            </div>
        </Layout>
        <Footer></Footer>
      </>
    )
}