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
            <div className="homepic">
              <h1 style={{fontWeight: 700, fontSize: '11vw', margin: 0, paddingTop: '60px'}}><TextLoop mask={true} interval={1200}>
                    <span style={{color: '#43AA8B'}}>Create</span>
                    <span style={{color: '#EF3054'}}>Code</span>
                    <span style={{color: '#FF6F59'}}>Teach</span>
                    <span style={{color: '#574AE2'}}>Design</span>
                  </TextLoop>{" "} faster<br />than ever</h1>
                  <h2 style={{fontWeight: '600'}}>Creating products that inspire the next wave of creators</h2>
                  <div style={{paddingBottom: 150, display: 'flex'}}>
                    <Link href="">
                      <a className="padding" style={{flexDirection: 'row'}}>Explore solutions <FontAwesomeIcon icon="arrow-right" /></a>
                    </Link>
                    <Link href="/signup">
                      <a className="padding green" style={{flexDirection: 'row'}}>Sign up <FontAwesomeIcon icon="arrow-right" /></a>
                    </Link>
                  </div>
            </div>
            <div className="hometop">
                  <Fade up>
                    <h1 style={{fontSize: '35px'}}><span style={{backgroundColor: 'white', padding: '5px', margin: '5px', color: 'black', borderRadius: '15px'}}>Open Terminal is where <span style={{color: '#43AA8B'}}>inn</span><span style={{color: '#EF3054'}}>ova</span><span style={{color: '#574AE2'}}>ti</span><span style={{color: '#FF6F59'}}>ons</span> begin.</span></h1>
                    <h3>Started for developers, OT now builds products with all creatives in mind.<br />We have a huge focus on bringing viable technologies for people in all professions, especially developers.</h3>
                  </Fade>
                  <div className="infocard" style={{margin: 'auto'}}>
                  <Fade up>
                  <Image
                    src="/pics/homepic1.png"
                    width='854px'
                    height='480px'
                  />
                  <h1><span className="codefont">$ Reliable software.</span> Everyday, any day.<br /><p style={{fontSize:'17px'}}>At Open Terminal, we&apos;re all about optimizing our software and making it more efficient. Each product is developed and maintained with precision to make it trustworthy.<br /><br />
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
                    src="/pics/homepic2.png"
                    width='603px'
                    height='500px'
                  />
                  </Fade>
                  </div>
                  <Fade up>
                    <h3 className="grey">Products our customers love</h3>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                      <div className={['card', 'dynamiclayout'].join(' ')}>
                        <h1>Track</h1>
                        <p className="grey">Web monitoring made easy<br /><Link href=""><a>Coming soon!</a></Link></p>
                      </div>

                      <div className={['card', 'dynamiclayout'].join(' ')}>
                        <h1>Genopi</h1>
                        <p className="grey">An all-in-one system for learners<br /><Link href="/genopi"><a>Check it out <FontAwesomeIcon icon="arrow-circle-right" /></a></Link></p>
                      </div>
                      <div className={['card', 'dynamiclayout'].join(' ')}>
                        <h1>Bot Building Site</h1>
                        <p className="grey">The best Discord bot development platform 😉<br /><a href="https://botbuilding.site/">Check it out <FontAwesomeIcon icon="arrow-circle-right" /></a></p>
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
                      <Footer>
                      </Footer>
        </>
    )
  }