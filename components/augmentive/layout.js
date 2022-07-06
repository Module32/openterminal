import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import React from "react"
import {useState, useEffect} from 'react'
import Tippy from '@tippyjs/react';

export default function Layout({ children, home }) {
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
    <div>
      <Head>
        <meta property="og:description" content="Open Terminal is focused on delivering software and hardware solutions for all people. Find tools that help you create, teach, and do things better." />
        <meta name="og:title" content="Open Terminal" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Open Terminal - Creating for all</title>
      </Head>
          <>
          <div className={`flex py-2 ${isMobile ? 'px-2' : 'px-10'} bg-slate-100 border-b border-slate-400/75 items-center`}>
            <Link href="/augmentive"><a className='px-2 py-0.5 text-xl bg-slate-50 border border-slate-400/75 rounded-md text-gray flex items-center'>
            <Image
              src="/pics/augmentive/logo.png"
              alt="logo"
              width={35}
              height={35}
              className='inline-flex'
            />
              <span className='font-semibold flex items-center mx-1 text-black'>
              augmentive</span>{!isMobile && 'by OT'}</a></Link>
            <div className="ml-auto">
                {!isMobile && <><Link href=""><a className="font-medium hover:text-slate-400/80 px-2 text-lg">Explore</a></Link>
                <Link href=""><a className="font-medium hover:text-slate-400/80 px-2 text-lg">Leaderboard</a></Link>
                <span className="text-gray-dark">|</span></>}
                <Link href="/augmentive/dashboard"><a className="font-medium hover:text-slate-400/80 px-2 ml-3 border-2 p-1 border-black rounded-lg hover:border-slate-400/80 text-lg">Dashboard</a></Link>
                {isMobile && <Tippy
                content={<div className='flex flex-col font-medium pl-4 text-right text-[20px] leading-relaxed'>
                  <span className='mono text-gray'>Create a</span>
                  <Link href="/genopi/note/new"><a className="hover:text-black/50">Note</a></Link>
                  <Link href="/genopi/test/new"><a className="hover:text-black/50">Test</a></Link>
                  <Link href="/genopi/schedule/new"><a className="hover:text-black/50">Schedule</a></Link>
                  <span className='mt-2 mono text-gray'>Account</span>
                  <Link href="/genopi/dashboard"><a className="hover:text-black/50">Dashboard</a></Link>
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