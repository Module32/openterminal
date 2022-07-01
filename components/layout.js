import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import {useState, useEffect} from 'react'
import Tippy from '@tippyjs/react';

export default function Layout({ children, home }) {
  const { data: session } = useSession();

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
          <div className={`flex py-2 ${isMobile ? 'px-2' : 'px-10'} bg-slate-200 border border-slate-400/75 items-center sticky top-0 z-50`}>
            <Link href="/"><a className='px-2 text-xl font-semibold flex items-center'><Image
              src="/pics/logo.png"
              alt="logo"
              width={40}
              height={40}
              className='inline-flex'
            /> <span className='ml-1'>open terminal {!isMobile && <span className='p-1 border-2 rounded-lg text-primary'>beta 1.0</span>}</span></a></Link>
            <div className="ml-auto">
              {!isMobile && <>
                <Link href=""><a className="font-medium hover:text-gray px-2 text-lg">Why OT</a></Link>
                <Link href=""><a className="font-medium hover:text-gray px-2 text-lg">Products</a></Link>
                <span className="text-gray-dark">|</span>
              </>}
              { session ? 
                <Tippy
                  content={<div>
                    <p className='text-gray'>Signed in as</p>
                    <p className='text-lg'>{session.user.name}</p>
                    <button onClick={() => signIn('google')} className="bg-red-500 border-none hover:bg-red-600 w-full"><FontAwesomeIcon icon={faGoogle} /> Google</button>
                  </div>}
                  className='bg-slate-200 p-2 py-3 m-0 border border-slate-400/50 rounded-lg'
                  interactive='true'
                  trigger='click'><span className='ml-2 hover:cursor-pointer p-1 text-xl'><img
                    src={session.user.image}
                    alt="logo"
                    width={32}
                    height={32}
                    className='rounded inline-flex ml-2 shadow-xl'
                  /></span></Tippy> :
                <>
                  <Link href="/login"><a className="font-medium hover:text-gray px-2 text-lg">Login</a></Link>
                  <Link href="/signup"><a className="font-medium hover:text-gray px-2 border-2 p-1 border-black rounded-lg hover:border-gray text-lg">Sign up</a></Link>
                </>
              }
              {isMobile && <Tippy
                content={<div className='flex flex-col font-medium pl-4 text-right text-xl leading-relaxed'>
                  <span className='text-lg font-mono text-gray'>Explore</span>
                  <Link href=""><a className="hover:text-black/50">Why OT</a></Link>
                  <Link href=""><a className="hover:text-black/50">Products</a></Link>
                  <span className='text-lg mt-2 font-mono text-gray'>Account</span>
                  <Link href="/login"><a className="hover:text-black/50 rounded-lg">Log in</a></Link>
                  <Link href="/signup"><a className="hover:text-black/50 rounded-lg">Sign up</a></Link>
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