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
          <div className={`flex py-2 ${isMobile ? 'px-2' : 'px-10'} bg-slate-200 border-b border-slate-400/75 items-center sticky top-0 z-50`}>
            <Link href="/genopi"><a className='px-2 text-xl text-gray flex items-center'>
            <Image
              src="/pics/genopi/logo.png"
              alt="logo"
              width={40}
              height={40}
              className='inline-flex'
            />
              <span className='font-semibold flex items-center mx-1 text-black'>
              genopi</span>{!isMobile && 'by OT'}</a></Link>
            <div className="ml-auto">
                {!isMobile && <><Link href=""><a className="font-medium hover:text-gray px-2 text-lg">Explore</a></Link>
                <Link href=""><a className="font-medium hover:text-gray px-2 text-lg">Leaderboard</a></Link>
                <span className="text-gray-dark">|</span></>}
                <Link href="/genopi/dashboard"><a className="font-medium hover:text-gray px-2 ml-3 border-2 p-1 border-black rounded-lg hover:border-gray text-lg">Dashboard</a></Link>
                {isMobile && <Tippy
                content={<div className='flex flex-col font-medium pl-4 text-right text-[6vw] leading-relaxed'>
                  <span className='text-lg font-mono text-gray'>Create a new</span>
                  <Link href="/genopi/note/new"><a className="hover:text-black/50">Note</a></Link>
                  <Link href="/genopi/test/new"><a className="hover:text-black/50">Test</a></Link>
                  <Link href="/genopi/article/new"><a className="hover:text-black/50">Article</a></Link>
                  <span className='text-lg mt-2 font-mono text-gray'>Account</span>
                  <Link href="/login"><a className="hover:text-black/50 rounded-lg">Go to dashboard</a></Link>
                </div>}
                className='bg-slate-200 p-2 py-3 m-0 border border-slate-400/50 rounded-lg'
                interactive='true'
                trigger='click'><span className='ml-2 hover:cursor-pointer p-1 text-xl'>☰</span></Tippy> }
            </div>
          </div>
          </>
        {children}
    </div>
  )
}