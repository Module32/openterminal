import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout'
import TextLoop from "react-text-loop"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowCircleRight, faHeart } from '@fortawesome/fontawesome-free-solid'
import Fade from 'react-reveal/Fade';

export default function FirstPost() {
    return (
        <>
          <Layout>
            <div className="hometop">
              <h1 style={{fontWeight: 700, fontSize: '12.5vw', margin: 10, paddingTop: '30px', paddingBottom: 30}}><TextLoop mask={true} interval={1200}>
                    <span style={{color: '#43AA8B'}}>Create</span>
                    <span style={{color: '#EF3054'}}>Code</span>
                    <span style={{color: '#FF6F59'}}>Teach</span>
                    <span style={{color: '#574AE2'}}>Design</span>
                  </TextLoop>{" "} faster<br />than ever.</h1>
                  <div style={{paddingBottom: 150}}>
                    <Link href="">
                      <a className="padding">Explore solutions <FontAwesomeIcon icon="arrow-right" /></a>
                    </Link>
                  </div>
                  <Fade up>
                    <h1 style={{fontSize: '35px'}}><span style={{backgroundColor: 'white', padding: '5px', margin: '5px', color: 'black', borderRadius: '15px'}}>Open Terminal is where <span style={{color: '#43AA8B'}}>inn</span><span style={{color: '#EF3054'}}>ova</span><span style={{color: '#574AE2'}}>ti</span><span style={{color: '#FF6F59'}}>ons</span> begin.</span></h1>
                    <h3>Started for developers, OT now builds products with all creatives in mind.<br />We have a huge focus on bringing viable technologies for people in all professions, especially developers.</h3>
                  </Fade>
                  <div className="infocard" style={{margin: 'auto'}}>
                  <Fade up>
                  <Image
                    src="/pics/homepic1.png"
                    width='700px'
                    height='480px'
                  />
                  <h1>Reliable code. Everyday, any day.<br /><p style={{fontSize:'17px'}}>At Open Terminal, we&apos;re all about optimizing our software and making it more efficient. Each product is developed and maintained with precision to make it trustworthy.<br /><br />
                    <Link href="">
                      <a>Find tools now <FontAwesomeIcon icon="arrow-circle-right" /></a>
                    </Link>
                  </p></h1>
                  </Fade>
                  </div>

                  <div className="infocard" style={{margin: 'auto'}}>
                  <Fade up>
                  <h1>Stick to what you <FontAwesomeIcon icon="heart" className="heart" />. No changes.<br /><p style={{fontSize:'17px'}}>No need to adjust your entire workflow and environment. Our products make it easy to set up your existing tools and get going quickly.<br /><br />
                    <Link href="">
                      <a>Discover more <FontAwesomeIcon icon="arrow-circle-right" /></a>
                    </Link>
                  </p></h1>
                  <Image
                    src="/pics/homepic3.png"
                    width='760px'
                    height='600px'
                  />
                  </Fade>
                  </div>
                  <Fade up>
                    <h3 className="grey">Products our customers love</h3>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                      <div className="card" style={{width:'33%'}}>
                        <h1>UnlockAPI</h1>
                        <p className="grey">The API monitoring platform made for the future.<br /><a href="https://unlockapi.coefficient.repl.co">Check it out <FontAwesomeIcon icon="arrow-circle-right" /></a></p>
                      </div>

                      <div className="card" style={{width:'33%', flexDirection: 'row'}}>
                        <h1>Lexicon</h1>
                        <p className="grey">An intuitive dictionary created for everybody.<br /><a href="https://lexicon.coefficient.repl.co">Check it out <FontAwesomeIcon icon="arrow-circle-right" /></a></p>
                      </div>
                    </div>
                </Fade>
            </div>

            <div className="waves">
              <Fade up>
                <h1 style={{paddingBottom: '10px'}}>Let&apos;s create a new future today</h1>
                <Link href="/signup">
                      <a className="padding">Sign up</a>
                    </Link>
              </Fade>
            </div>
        </Layout>
        </>
    )
  }