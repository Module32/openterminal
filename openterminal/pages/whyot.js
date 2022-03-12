import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout'
import Footer from '../components/footer'
import TextLoop from "react-text-loop"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowCircleRight, faHeart } from '@fortawesome/fontawesome-free-solid'
import Fade from 'react-reveal/Fade';
import Typical from 'react-typical';

import topbanner from '../public/pics/whyot/topbanner.png';

export default function Index() {
    return (
        <>
          <Layout>
            <Fade up>
                <div style={{paddingTop: '80px'}}>
                    <div className="whyottopbanner" style={{paddingTop: '100px', paddingBottom: '100px'}}>
                        <p>Why OT?</p>
                        <h1 style={{display: 'flex'}}><span style={{padding: '5px', borderRadius: '5px', backgroundColor: 'rgb(0, 0, 0, 0.2)', textShadow: '0px 5px 25px rgb(0, 0, 0, 0.4)', flexDirection: 'row'}}>Because OT
                        <span style={{color: '#43AA8B', flexDirection: 'row'}}>
                            <Typical
                                steps={['is made for everyone', 1000, 'helps out devs', 1000, 'supports students', 1000, 'helps your mum', 500, 'is always growing', 1000, 'is reliable', 1000, 'just works']}
                                loop={Infinity}
                            /></span>.</span></h1>
                    </div>
                </div>
              </Fade>
        </Layout>
                      <Footer>
                      </Footer>
        </>
    )
  }