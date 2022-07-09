import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/layout'
import Footer from '../components/footer'
import TextLoop from "react-text-loop"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faCircle, faSpinner, faAtom, faCheck, faXmark, faGear, faCaretDown, faArrowLeft, faStickyNote, faQuestion } from '@fortawesome/free-solid-svg-icons'
import Fade from 'react-reveal/Fade';
import LinkCard from '../components/LinkCard'
import {useState, useEffect} from 'react'
import { faFaceGrin, faHandshake } from '@fortawesome/free-regular-svg-icons'
import Linker from '../components/Linker'
import Tada from 'react-reveal/Tada';

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

    const actionCards = [
      {
        product: 'Open Terminal',
        action: 'Sign up today',
        pic: '/pics/logo.png',
        href: '/signup',
        desc: 'One account to all our products (not including partners)'
      },
      {
        product: 'Open Terminal',
        action: 'Log in',
        pic: '/pics/logo.png',
        href: '/login',
        desc: 'Already have an account? Log in to continue'
      },
      {
        product: 'Augmentive',
        action: 'Visit dashboard',
        pic: '/pics/augmentive/logo.png',
        href: '/augmentive/dashboard',
        desc: "It's probably a good idea to be able to access your stuff"
      },
      {
        product: 'Augmentive',
        action: 'Create a new note',
        pic: '/pics/augmentive/logo.png',
        href: '/augmentive/note/new',
        desc: "Take notes of whatever feels note-y, all in the browser"
      },
      {
        product: 'Augmentive',
        action: 'Create a new test',
        pic: '/pics/augmentive/logo.png',
        href: '/augmentive/test/new',
        desc: 'Practice tests to help you memorize things'
      },
      {
        product: 'Splinter.Host',
        action: 'Sign up today',
        pic: 'https://cdn.discordapp.com/icons/983486813102547024/ed5b45bd27ddaef0f298ea695c66672f.png?size=1024',
        href: 'https://splinterhosting.com/signup',
        desc: 'Ya gotta get the account for da MC hosting'
      },
      {
        product: 'Splinter.Host',
        action: 'Visit dashboard',
        pic: 'https://cdn.discordapp.com/icons/983486813102547024/ed5b45bd27ddaef0f298ea695c66672f.png?size=1024',
        href: 'https://splinterhosting.com/signup',
        desc: "If you don't have any servers, make one!"
      }
    ]

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
                    <p className={`font-medium text-gray-dark py-7 ${!isMobile && 'text-xl'}`}>Open Terminal builds tools that let creators do what they do best.<br />
                    Learning, developing, monitoring, prototyping — it’s all at OT.</p>
                    <h1 className="text-xl">
                      <Linker content='Get started for free' bgcolor='primary' hover='primary/75' color='white' href='/signup' classes='px-4' />
                    </h1>
                  </div>
                </div>
              </div>
              <div className='my-5 font-medium p-7'>
                <p className="text-gray text-2xl">What&apos;s Open Terminal for?</p>
                <Fade bottom cascade>
                  <div className={`${isMobile ? 'text-4xl' : 'text-6xl'} font-extrabold`}>
                    <p className="text-amber-500 my-1">Developing awesome things.</p>
                    <p className="text-emerald-500 my-1">Learning new things.</p>
                    <p className='my-1'>Really, doing all kinds of things.</p>
                  </div>
                </Fade>
              </div>
              <div className={`font-medium py-7 bg-slate-300 flex lg:px-24 md:px-8 justify-center`}>
                <div className='p-5 flex-1 text-left my-auto'>
                  <p className="text-gray text-lg">Development tools <span className='mono bg-red-500 text-white p-1 rounded ml-1'>Coming soon</span></p>
                  <p className="text-5xl py-4 font-bold">Products that make your products <span className="text-amber-500">better</span>.</p>
                  <p className="text-xl leading-normal">
                    The most essential component of a successful business — and career — is successful software. From the front-end homepage of your website to complex internal code for developers, tools like
                    {" "}<strong>Quark</strong>{" "}
                    make developers&apos; life easier.
                  </p>
                  <div className="flex pt-3 flex-col">
                    <LinkCard
                      href=""
                      title="Web monitoring with Quark"
                      content="Quark&apos;s web monitoring gives collaborator access, downtime alerts, error patterns, API prototyping, and more."
                      color="amber-500"
                      secondary="gray-dark"
                      border='slate-400'
                      bgcolor="slate-200" />
                  </div>
                </div>
                {!isMobile && <div className='flex-1 m-0 h-48 -translate-y-5 my-auto rounded-md bg-amber-500 p-3 text-left'>
                  <div className='bg-slate-800 lg:w-8/12 md:w-full rounded-md p-2 pb-10 -translate-y-20 px-3 relative text-white mono text-[16px]'>
                    <div className='flex mb-2'>
                      <FontAwesomeIcon icon={faDotCircle} className='mr-2 text-slate-600' />
                      <FontAwesomeIcon icon={faCircle} className='mr-2 text-slate-600' />
                      <FontAwesomeIcon icon={faCircle} className='text-slate-600' />
                    </div>
                    <p>Pinging available routes</p>
                    <p><FontAwesomeIcon icon={faCheck} className='text-green' /> 5 routes responded</p>
                    <p><FontAwesomeIcon icon={faXmark} className='text-red-500' /> <span className='text-gray'>/profile/[id]</span> failed with code 500</p>
                  </div>

                  <div className='bg-white lg:w-8/12 md:w-full ml-auto pb-3 rounded-md p-2 px-3 mt-3 -translate-y-16'>
                    <h1 className='text-2xl flex items-center'>My New Site <span className='ml-auto bg-sky-500/50 text-sky-500 text-base p-[3px] rounded-md px-2'><FontAwesomeIcon icon={faGear} /></span></h1>
                    <p className='text-gray my-1'>Site uptime</p>
                    <div className='flex'>
                      <div className='mr-1 text-right w-[85%] px-2 py-[2px] rounded-md bg-green text-white'>85%</div>
                      <div className='mr-1 text-left w-[15%] px-2 py-[2px] rounded-md bg-red-500 text-white'>15%</div>
                    </div>
                    <p className='text-gray mt-2 flex lg:flex-row sm:flex-col items-center'>Ping logs <span className='lg:ml-auto'>Filter by <span className='p-[2px] px-1 rounded bg-slate-200/50 border border-slate-300 mono'>errors <FontAwesomeIcon icon={faCaretDown} /></span></span></p>
                    <div className='border-b border-slate-300 p-2'><span className='text-gray mono mr-2 text-sm'>6.14.22</span> Response <span className='mono text-red-500'>500</span></div>
                  </div>
                </div>}
              </div>

              <div className={`font-medium py-7 bg-slate-200 flex lg:px-24 md:px-8 justify-center`}>
                <div className='p-5 flex-1 text-left my-auto'>
                  <p className="text-gray text-lg">Learning tools <span className='mono bg-emerald-500 text-white p-1 rounded ml-1'>In beta</span></p>
                  <p className="text-5xl py-4 font-bold">Staying on top of work can be <em>that</em> <span className="text-emerald-400">easy</span>.</p>
                  <p className="text-xl leading-normal">
                    From taking notes during an online lesson to practicing for an upcoming interview, 
                    {" "}<strong>Augmentive</strong>{" "}
                    is the solution. Create practice tests, take notes effortlessly, and start actual learning with the all-in-one tool.
                  </p>
                  <div className="flex pt-3 flex-col">
                    <LinkCard
                      href="/augmentive"
                      title="Learn faster with Augmentive"
                      content="Augmentive supports taking uninterrupted notes, creating practice tests for review, and planning out new schedules and topics."
                      color="emerald-500"
                      secondary="gray-dark"
                      border='slate-300'
                      bgcolor="slate-100" />
                  </div>
                </div>
                {!isMobile && <div className='flex-1 m-0 h-40 my-auto -translate-y-6 rounded-md bg-emerald-500 p-3 text-left'>
                  <div className='bg-white lg:w-8/12 md:w-full ml-auto pb-3 rounded-md p-2 px-3 mt-3 -translate-y-32'>
                      <h1 className='flex items-center'><FontAwesomeIcon icon={faArrowLeft} className='text-gray mr-1' /> Lecture notes</h1>
                      <p>Living things <strong>must</strong> <mark className='px-1 rounded bg-orange'>grow and evolve</mark></p>
                      <blockquote className='border-l-2 border-slate-400 px-2'>&quot;They are <em>not</em> the same!&quot; -mr.b</blockquote>
                      <p>Evolution is <span className='text-red-500'><strong>population</strong>-wise</span></p>
                      <ul>
                        <li className='list-disc list-inside marker:text-slate-400/50'>Living things also reproduce</li>
                        <li className='list-disc list-inside ml-5 marker:text-slate-400/50'><mark className='px-1 rounded bg-green'>(a)sexually</mark></li>
                      </ul>
                  </div>
                  <div className='bg-white lg:w-9/12 md:w-full rounded p-1 px-2 -translate-y-24'>
                    <span className='text-gray my-1'>MrNames</span>
                    <h1 className='text-2xl'>Your stuff</h1>
                    <div className='flex flex-wrap'>
                      <div className='border border-slate-300 w-[200px] m-1 text-sm shadow-md rounded p-1'>
                        <FontAwesomeIcon icon={faStickyNote} className='mr-1 text-amber-500' /><strong>Lecture notes</strong> <span className='text-gray'>Living things must grow a...</span>
                      </div>
                      <div className='border border-slate-300 w-[200px] m-1 text-sm shadow-md rounded p-1'>
                      <FontAwesomeIcon icon={faStickyNote} className='mr-1 text-amber-500' /><strong>Website plans</strong> <span className='text-gray'>TODO add note organization</span>
                      </div>
                      <div className='basis-full h-0'></div>
                      <div className='border border-slate-300 w-[200px] m-1 text-sm shadow-md rounded p-1'>
                      <FontAwesomeIcon icon={faQuestion} className='mr-1 text-emerald-500' /><strong>Science quiz</strong> <span className='text-gray'><strong>1.</strong> living things grow and ___...</span>
                      </div>
                    </div>
                  </div>
                </div>}
              </div>

              <div className={`font-medium py-10 pb-24 bg-slate-900 text-white lg:px-24 md:px-8 justify-center`}>
                <div className='w-11/12 mx-auto'>
                  <p className='text-gray text-xl'><FontAwesomeIcon icon={faHandshake} className='text-sky-400' /> Our partnerships</p>
                  <h1 className={`${isMobile ? 'text-4xl border-b border-slate-700 pb-10' : 'text-6xl'} font-bold mt-2 mb-10`}><span className='text-slate-100'>We&apos;ve worked with <span className='text-sky-400 italic font-bold'>awesome teams</span> to bring people</span> <span className='text-sky-400 italic font-bold'>awesome things</span>.</h1>
                </div>
                <div className={`flex ${isMobile && 'mx-10'}`}>
                    {!isMobile && <div className='flex-1 text-left'>
                      <div className="translate-x-5 transition bg-[url('../public/pics/homepage/callummc.png')] mx-auto h-full bg-cover m-7 rounded-xl flex flex-col">
                      <div className='bg-slate-800 border border-slate-700 shadow-xl lg:w-6/12 md:w-full py-2 px-3 rounded -translate-y-5 -translate-x-6 group-hover:-translate-y-7 group-hover:-translate-x-8 transition'>
                        <p className='text-slate-400 flex items-center'>Status <span className='text-sm ml-auto'>4:20 PM</span></p>
                        <h1 className='text-2xl'><FontAwesomeIcon icon={faCheck} className='text-green' /> Server online</h1>
                        <hr className='bg-white/25 my-2' />
                        <p className='flex items-center'>
                          <span className='bg-sky-500 py-1 px-2 rounded mx-1 ml-0'>13% CPU</span>
                          <span className='bg-sky-500 py-1 px-2 rounded mx-1 ml-0'>69% RAM</span>
                        </p>
                      </div>

                      <div className='bg-slate-800 border border-slate-700 shadow-xl lg:w-8/12 md:w-full py-2 px-3 rounded mt-auto ml-auto translate-x-5 translate-y-7 group-hover:translate-y-9 group-hover:translate-x-7 transition'>
                        <p className='flex items-center text-xl mb-1'>Settings</p>
                        <p className='flex flex-wrap'>
                          <span className='bg-slate-700 py-1 px-2 rounded mx-1 ml-0'>Overview</span>
                          <span className='bg-slate-700 py-1 px-2 rounded mx-1 ml-0'>Server</span>
                          <span className='bg-sky-500 text-white py-1 px-2 rounded mx-1 ml-0'>Automation</span>
                        </p>
                        <hr className='bg-white/25 my-2' />
                        <p className='text-slate-400'>Resource usage</p>
                        <p className='text-lg'>Notify me when CPU usage tips <span className='p-1 px-2 bg-slate-700 border border-slate-600 rounded'>70%</span></p>
                      </div>
                    </div>
                    </div>}
                  <div className={`flex-1 text-left ${!isMobile ? 'ml-16' : 'text-center'} my-auto`}>
                    <p className='text-xl'>Callum Knott <span className='text-gray'>CEO of <Link href='https://splinterbot.ml'><a className='text-sky-400 underline'>Splinter Bot</a></Link></span></p>
                    <h1 className='text-4xl font-semibold my-2'>Splinter.Host, where Minecraft servers <span className='text-sky-400'>come to life</span></h1>
                    <p className='text-lg text-slate-200 mb-3'>Splinter.Host is impressively overengineered and we love it. Get access to free Minecraft hosting, crucial and cool features to keep your servers running, and free support in our Discord server!</p>
                    <Linker href='https://splinterhosting.com/' bgcolor='sky-500' content="Let's host an MC server!" hover='sky-600' />
                    <Linker href='https://discord.com/invite/PkAP35a6v7' bgcolor='slate-700' content='Discord server' />
                    <div className='bg-slate-700/50 mono mt-5 p-2 pl-3 border-l-8 border-slate-600 hover:border-sky-500 rounded shadow-xl font-normal'>
                      <p>&quot;Splinter.Host is indeed pog&quot;</p>
                      <p className='text-sm text-gray'>- Callum Knott</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='py-12 px-10 flex flex-wrap text-left font-medium'>
                <div className='flex-1 my-auto'>
                  <div className='flex items-center'>
                    <img src='/pics/logo.png' width={70} height={70} className='mr-2 bg-white rounded border border-slate-300 p-2' /> 
                  </div>
                  <h1 className='font-semibold text-5xl mt-4 mb-6'>Let&apos;s make your ideas more than ideas</h1>
                  <h1 className='text-xl'><Linker content='Sign up today' bgcolor='primary' color='white' href='/signup' /></h1>
                </div>
                <div className={`${isMobile && 'basis-full mt-10'} h-0`} />
                <div className='flex-1 flex flex-col'>
                  {actionCards.map(card => {
                    return <div key={card.action} className='flex'>
                      <Link href={card.href}><a className='bg-slate-50 w-full shadow-md hover:shadow-xl transition hover:-translate-y-2 hover:scale-[1.03] mx-1 border h-fit pb-3 my-1 border-slate-300 rounded-lg p-2 px-4'>
                        <div className={`flex ${isMobile && 'flex-col'} flex-wrap items-center`}>
                          <div className='flex-1 flex'>
                            <img src={card.pic} width={35} height={35} className='bg-slate-100 p-1 mt-1 rounded-lg border border-slate-300' />
                            <p className='text-lg ml-2 leading-none'>
                              <span className='text-gray text-sm'>{card.product}</span><br />
                              {card.action}
                            </p>
                          </div>
                          <p className={`mt-0.5 flex-1 text-right ${!isMobile && 'ml-auto'} text-sm text-gray-dark leading-tight`}>{card.desc}</p>
                        </div>
                      </a></Link>
                    </div>
                  })}
                </div>
              </div>
            </div>
          </Layout>
          <Footer />
        </>
    )
  }