import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBookmark, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function Layout({ children, home }) {
  const { data: session } = useSession();
  return (
    <div className="">
      <Head>
        <meta property="og:description" content="Open Terminal is focused on delivering software and hardware solutions for all people. Find tools that help you create, teach, and do things better." />
        <meta name="og:title" content="Open Terminal" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Open Terminal - Creating for all</title>
      </Head>
          <>
          <ul className="navbar">
          <li className="logo">
            <Image
              src="pics/logo.png"
              alt="logo"
              width={88}
              height={40}
            />
          </li>

            <li className="navbar"><Link href="/">
              <a className="navbar" style={{paddingTop: '20px'}}>Home</a>
            </Link></li>

            <li className="navbar"><Link href="/whyot">
              <a className="navbar">Why OT</a>
            </Link></li>
            
            <li className="navbar"><Link href="/">
              <a className="navbar">Solutions</a>
            </Link></li>

            <li className="navbar"><Link href="/">
              <a className="navbar">Team</a>
            </Link></li>

            <li className="navbar" style={{marginLeft: 'auto'}}>
              { session ? 
                <span style={{padding: '0', margin: '0'}}><Link href=""><a className="navbar" style={{paddingRight: '7px'}}><FontAwesomeIcon icon={faBell} style={{color: 'rgb(146, 146, 146)'}} /></a></Link> <Link href=""><a className="navbar" style={{paddingRight: '7px'}}><FontAwesomeIcon icon={faBookmark} style={{color: 'rgb(146, 146, 146)'}} /></a></Link> {session.user.name} <button className="navbar" onClick={() => signOut()}><FontAwesomeIcon icon={faArrowRight} style={{color: 'rgb(196, 55, 45)'}} /></button></span> : 
                <span style={{padding: '0', margin: '0'}}><Link href="/login"><a className="navbar">Login</a></Link> <span className="grey">|</span> <Link href="/signup"><a className="navbar">Sign up</a></Link></span>
              }
            </li>
          </ul>
          </>
      <hr></hr>
      <div><main>{children}</main></div>
    </div>
  )
}