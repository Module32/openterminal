import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout'
import Footer from '../components/footer'
import TextLoop from "react-text-loop"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import Fade from 'react-reveal/Fade';
import Typical from 'react-typical';

import topbanner from '../public/pics/whyot/topbanner.png';

export default function Index() {
    return (
        <>
          <Layout>
            <Fade>
                <div style={{paddingTop: '85px'}}>
                    <div className="whyottopbanner" style={{paddingTop: '100px', paddingBottom: '100px'}}>
                        <p>Why OT?</p>
                        <h1>
                        <span style={{textShadow: '0px 5px 25px rgb(0, 0, 0, 0.5)', fontWeight: '700'}}>
                            <Typical
                                steps={['Because OT is made for everyone', 1000, 'Because OT helps out devs', 1000, 'Because OT supports students', 1000, 'Because OT helps your mum', 250, 'Because OT is always growing', 1000, 'Because OT is reliable', 1000, 'Because OT just works', 1000]}
                                loop={Infinity}
                            /></span></h1>
                    </div>
                </div>
              </Fade>
        </Layout>
                      <Footer>
                      </Footer>
        </>
    )
  }