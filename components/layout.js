import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import React from "react"
import { useSession, signOut } from "next-auth/react"
import {useState, useEffect} from 'react'
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowRightFromBracket, faBook, faCaretDown } from '@fortawesome/free-solid-svg-icons'

export default function Layout({ children, home }) {
  const { data: session } = useSession();

  const [isMobile, setIsMobile] = useState(false)
    
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
    <div>
      <Head>
        <meta property="og:description" content="Open Terminal is focused on delivering software and hardware solutions for all people. Find tools that help you create, teach, and do things better." />
        <meta name="og:title" content="Open Terminal" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Open Terminal - Creating for all</title>
      </Head>
          <>
          <div className={`flex py-2 ${isMobile ? 'px-2' : 'px-10'} bg-slate-100 border-b border-slate-400/75 items-center`}>
            <Link href="/"><a className='px-2 py-0.5 text-xl bg-slate-50 border border-slate-400/75 rounded-md font-semibold flex items-center'><Image
              src="/pics/logo.png"
              alt="logo"
              width={35}
              height={35}
              className='inline-flex'
            /> {!isMobile && <span className='ml-1'>open terminal <span className='rounded-lg text-primary'><span className='text-gray'>|</span> beta 1.0</span></span> }</a></Link>
            <div className="ml-auto">
              {!isMobile && <>
                <Tippy
                  content={<div className='text-lg'>
                    <div className='px-5'>
                      <p className='mono text-black font-semibold'>Development</p>
                      <Link href="/quark">Quark</Link>
                      <p className='mono text-black font-semibold mt-2'>Education</p>
                      <Link href="/augmentive">Augmentive</Link>
                    </div>
                    <hr className='my-2 h-[1px]' />
                    <div className='px-5'>
                      <p className='mono text-white bg-sky-500 w-fit px-1 rounded font-semibold'>Partners</p>
                      <Link href="https://splinterhosting.com">Splinter.Host</Link>
                    </div>
                  </div>}
                  className='backdrop-blur-md py-2 text-left bg-slate-200/80 shadow-xl border border-slate-400/75 mt-4 rounded'
                  animation={true}
                  interactive
                  delay={[0, 0]}
                  trigger='click'><span className='hover:text-slate-500/80 m-2 hover:cursor-pointer text-lg font-medium'>Products</span></Tippy>
                <span className="text-gray-dark">|</span>
              </>}
              { session ? 
                <Tippy
                  content={<div>
                    <div className='border-b border-slate-400/50 p-2 px-3 pr-5 rounded-t font-medium'>
                      <p className='font-semibold text-lg'>{session.user.name}</p>
                      <p className='text-gray text-xs mono'>{session.user.email}</p>
                    </div>
                    <div className='font-medium'>
                      <Link href=""><a className="bg-transparent text-base p-2 px-2.5 font-medium transition hover:bg-slate-400/25 flex items-center">Your stuff <FontAwesomeIcon icon={faArrowRight} className='ml-auto text-gray' /></a></Link>
                      <button onClick={() => signOut()} className="bg-transparent text-base p-2 px-2.5 font-medium transition hover:bg-slate-400/25 flex items-center w-full m-0 border-none rounded-none text-black">Log out <FontAwesomeIcon icon={faArrowRightFromBracket} className='ml-auto text-red-500/80' /></button>
                    </div>
                    <div className='bg-slate-400/20 text-gray font-medium text-sm rounded-b p-1.5 px-2 w-full'>
                      <Link href="/tos"><a className='underline'>Terms of Service</a></Link>∙<Link href="/privacypolicy"><a className='underline'>Privacy Policy</a></Link>
                    </div>
                  </div>}
                  className='backdrop-blur-md bg-slate-200/80 shadow-xl border border-slate-400/75 mt-4 mr-1 rounded'
                  animation={true}
                  interactive
                  delay={[0, 0]}
                  trigger='click'><span className='hover:cursor-pointer p-0 text-xl'><img
                    src={session.user.image}
                    alt="logo"
                    width={32}
                    height={32}
                    className='rounded inline-flex ml-2 shadow-xl'
                  /></span></Tippy> :
                <>
                  {!isMobile && <>
                    <Link href="/login"><a className="font-medium hover:text-slate-500/80 px-2 text-lg">Login</a></Link>
                    <Link href="/signup"><a className="font-medium hover:text-slate-500/80 px-2 border-2 p-1 border-black rounded-lg hover:border-slate-500/80 text-lg">Sign up</a></Link>
                  </>}
                </>
              }
              {isMobile && <Tippy
                content={<div className='flex flex-col font-medium pl-4 text-right text-[20px] leading-relaxed'>
                  <span className='mono text-gray'>Explore</span>
                  <Link href=""><a className="hover:text-black/50">Products</a></Link>
                  <span className='mt-2 mono text-gray'>Account</span>
                  <Link href="/login"><a className="hover:text-black/50 rounded-lg">Log in</a></Link>
                  <Link href="/signup"><a className="hover:text-black/50 rounded-lg">Sign up</a></Link>
                </div>}
                className='backdrop-blur-md bg-slate-200/80 px-3 py-2 shadow-xl border border-slate-400/75 mt-4 mr-1 rounded'
                interactive='true'
                trigger='click'><span className='ml-2 hover:cursor-pointer p-1 text-xl'>☰</span></Tippy> }
            </div>
          </div>
          </>
        {children}
    </div>
  )
}