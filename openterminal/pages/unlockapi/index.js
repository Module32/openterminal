import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Unlockapi from '../../components/layoutunlockapi'
import Footer from '../../components/footer'
import TextLoop from "react-text-loop"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowCircleRight, faHeart } from '@fortawesome/fontawesome-free-solid'
import Fade from 'react-reveal/Fade';

export default function Index() {
    return (
        <>
        <Unlockapi>
            <div className="waves2" style={{padding: '50px', paddingTop: '60px'}}>
          <div className="infocard" style={{padding: '100px'}}>  
          <div style={{flexDirection: 'column', paddingBottom: '50px'}}>
              <h1 style={{fontSize: '70px', margin: '0'}}>Ensure your APIs are reliable.</h1>
  <p style={{paddingTop: '10px', paddingBottom: '10px'}}>UnlockAPI is the most advanced tool to monitor your services.</p>
  <div style={{flexDirection: 'row'}}>
  <Link href="/newproject">
  <a className="padding" style={{width: '100%'}}>Get started</a>
  </Link>

  <Link href="">
  <a className="padding" style={{width: '100%'}}>Learn more</a>
  </Link>
  
  </div>
  </div>
            <Image
                    src="/pics/unlockapi/mascot1.png"
                    width='850px'
                    height='550px'
                  />
            </div>
  </div>
  </Unlockapi>
      <Footer>
      </Footer>
        </>
    )
  }