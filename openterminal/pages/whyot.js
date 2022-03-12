import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout'
import Footer from '../components/footer'
import TextLoop from "react-text-loop"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowCircleRight, faHeart } from '@fortawesome/fontawesome-free-solid'
import Fade from 'react-reveal/Fade';

export default function Index() {
    return (
        <>
          <Layout>
            <div className="hometop">
                <div style={{ 
                    backgroundImage: `../public/pics/whyot/topbanner.png` 
                    }}>
                    <p>Why OT?</p>
                    <h1>Because OT is made for everyone.</h1>
                </div>
            </div>
        </Layout>
                      <Footer>
                      </Footer>
        </>
    )
  }