import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout'
import Footer from '../components/footer'
import TextLoop from "react-text-loop"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowCircleRight, faHeart } from '@fortawesome/fontawesome-free-solid'
import Fade from 'react-reveal/Fade';

import topbanner from '../public/pics/whyot/topbanner.png';

export default function Index() {
    return (
        <>
          <Layout>
            <div style={{paddingTop: '100px'}}>
                <div className="whyottopbanner">
                    <p>Why OT?</p>
                    <h1><span style={{padding: '5px', borderRadius: '5px', backgroundColor: 'rgb(0, 0, 0, 0.2)', textShadow: '0px 5px 25px rgb(0, 0, 0, 0.4)'}}>Because OT is made for everyone.</span></h1>
                </div>
            </div>
        </Layout>
                      <Footer>
                      </Footer>
        </>
    )
  }