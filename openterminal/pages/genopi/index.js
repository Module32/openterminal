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
            <div className="genopi1" style={{padding: '50px', paddingTop: '60px'}}>
              <h1 style={{fontSize: '70px', margin: '0'}}>Make what you teach,<br />teach what you want</h1>
              <p style={{paddingBottom: '12px'}}><strong>genoπ</strong> | Made for Mr. McBrierty!</p>
              <div style={{flexDirection: 'row'}}>
              <Link href="">
                <a className="padding" style={{width: '50%'}}>Get started</a>
              </Link>

              <Link href="">
                <a className="padding" style={{width: '50%'}}>Learn more</a>
              </Link>
              
              </div>
            </div>
  </Layout>
      <Footer>
      </Footer>
        </>
    )
  }