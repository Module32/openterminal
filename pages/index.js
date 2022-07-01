import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/layout'
import Footer from '../components/footer'
import TextLoop from "react-text-loop"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowCircleRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import Fade from 'react-reveal/Fade';
import LinkCard from '../components/LinkCard'
import {useState, useEffect} from 'react'

export default function Index() {

  const [isMobile, setIsMobile] = useState(false)
    
  //choose the screen size 
  const handleResize = () => {
      if (window.innerWidth < 720) {
          setIsMobile(true)
      } else {
          setIsMobile(false)
      }
  }

  useEffect(() => {
      window.addEventListener("resize", handleResize)
  
      handleResize();
  
      return () => {
          window.removeEventListener('resize', handleResize)
      }
    }, [isMobile])

    return (
        <>
          <Layout>
            <div className='text-center'>
              <div className="bg-gradient-to-r from-primary/40 via-purple/20 to-sky-600/40 background-animate">
                <div>
                  <div className={`z-40 ${isMobile ? 'py-10' : 'py-36'}`}>
                    <h1 className={`${isMobile ? 'text-6xl px-12' : 'text-9xl'} font-extrabold`}>
                    <TextLoop mask={true} interval={1500}>
                      <span className="text-primary">Create</span>
                      <span className="text-primary">Teach</span>
                      <span className="text-primary">Code</span>
                      <span className="text-primary">Design</span>
                    </TextLoop>{" "}
                      faster<br />than ever.</h1>
                    <p className='font-medium text-gray-dark text-xl py-7'>Open Terminal builds tools that let creators do what they do best.<br />
                    Learning, developing, monitoring, prototyping — it’s all at OT.</p>
                    <h1 className="text-lg">
                      <Link href="/signup"><a className="padding">Get started for free</a></Link>
                    </h1>
                  </div>
                </div>
              </div>
              <div className='my-5 font-medium p-7'>
                <p className="text-gray text-2xl">What&apos;s Open Terminal for?</p>
                <Fade bottom cascade>
                  <div className={`${isMobile ? 'text-4xl' : 'text-6xl'} font-extrabold`}>
                    <p className="text-amber-400 my-1">Developing awesome things.</p>
                    <p className="text-emerald-500 my-1">Learning new things.</p>
                    <p className='my-1'>Really, doing all kinds of things.</p>
                  </div>
                </Fade>
              </div>
              <div className={`font-medium py-7 bg-slate-300 flex ${isMobile ? 'px-5' : 'px-24'} justify-center`}>
                <div className='p-5 flex-1 text-left my-auto'>
                  <p className="text-gray text-lg">Development tools</p>
                  <p className="text-5xl py-4 font-bold">Products that make your products <span className="text-amber-500">better</span>.</p>
                  <p className="text-xl leading-normal">
                    The most essential component of a successful business — and career — is successful software. From the front-end homepage of your website to complex internal code for developers, tools like
                    {" "}<strong>Track</strong>{" "}
                    make developers&apos; life easier.
                  </p>
                  <div className="flex pt-3 flex-col">
                    <LinkCard
                      href=""
                      title="Web monitoring with Track"
                      content="Track&apos;s web monitoring gives collaborator access, downtime alerts, error patterns, API prototyping, and more."
                      color="amber-500"
                      secondary="gray-dark"
                      bgcolor="slate-200" />
                  </div>
                </div>
                {!isMobile && <div className='flex-1 my-auto'>
                  <Image
                    src="/pics/homepic1.png"
                    width='531'
                    height='500'
                    className='shadow-xl'
                  />
                </div>}
              </div>

              <div className={`font-medium py-7 bg-slate-200 flex ${isMobile ? 'px-5' : 'px-24'} justify-center`}>
                <div className='p-5 flex-1 text-left my-auto'>
                  <p className="text-gray text-lg">Learning tools</p>
                  <p className="text-5xl py-4 font-bold">Staying on top of work can be <em>that</em> <span className="text-emerald-400">easy</span>.</p>
                  <p className="text-xl leading-normal">
                    Learning doesn&apos;t have to be for just school. From taking notes during an online lesson to practicing for an interview, 
                    {" "}<strong>Augmentive</strong>{" "}
                    is the solution. Create practice tests, take notes effortlessly, and start actual learning with the all-in-one tool.
                  </p>
                  <div className="flex pt-3 flex-col">
                    <LinkCard
                      href="/augmentive"
                      title="Learn faster with Augmentive"
                      content="Augmentive supports taking uninterrupted notes, creating practice tests for review, reading articles by other learners, and planning out new ideas."
                      color="emerald-500"
                      secondary="gray-dark"
                      bgcolor="slate-100" />
                  </div>
                </div>
                {!isMobile && <div className='flex-1 my-auto'>
                  <Image
                    src="/pics/homepic2.png"
                    width='531'
                    height='500'
                    className='shadow-xl'
                  />
                </div>}
              </div>
            </div>
          </Layout>
          <Footer />
        </>
    )
  }