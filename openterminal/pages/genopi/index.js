import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../../components/layout'
import Footer from '../../components/footer'
import TextLoop from "react-text-loop"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowCircleRight, faHeart } from '@fortawesome/fontawesome-free-solid'
import Fade from 'react-reveal/Fade';

export default function Index() {
    return (
        <>
        <Layout>
            <div className="genopi1" style={{paddingTop: '130px', paddingBottom: '75px'}}>
              <h1 style={{fontSize: '70px', margin: '0'}}>Make what you teach,<br />teach what you want</h1>
              <p style={{paddingBottom: '12px'}}><strong>genoπ</strong> | Made for Mr. McBrierty!</p>
              <Link href="dashboard">
                <a className="padding">Get started today</a>
              </Link>
              
            </div>
            <div className="hometop">
                <h1>What is Genopi?</h1>
                <p>Genopi is an online learning and test preparation platform for students and teachers, created by two students for a science project!</p>
                <div className="infocard" style={{padding: '20px'}}>
                    <h2><span style={{color: '#f7a427ff'}}>An easy way to take &amp; store notes</span><br />
                    <p style={{fontSize:'17px'}}>With the awesome <a href="https://tiptap.dev">TipTap editor</a>, taking notes as you follow along in a lesson is seamless and easy!</p></h2>
                    <Image
                        src="/pics/genopi/homepage/1.png"
                        width= '1600px'
                        height= '1000px'
                        />
                </div>
            </div>
  </Layout>
      <Footer>
      </Footer>
        </>
    )
  }