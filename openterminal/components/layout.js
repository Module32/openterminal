import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Favicon from 'react-favicon';
import { useSession, signIn, signOut } from "next-auth/react"

const name = 'Module64'
export const siteTitle = 'Open Terminal'

export default function Layout({ children, home }) {
  const { data: session } = useSession()
  return (
    <div className={styles.container}>
      <Head>
        <meta property="og:description" content="Open Terminal is focused on delivering software and hardware solutions for all people. Find tools that help you create, teach, and do things better." />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Open Terminal - Creating for all</title>
      </Head>
      <Favicon url="../public/pics/ot-logo.png"/>
      <header className={styles.header}>
          <>
          <ul>
            <li>
              <span className="codefont">Open Terminal</span>
            </li>

            <li><Link href="/">
              <a className="navbar">Home</a>
            </Link></li>

            <li><Link href="/whyot">
              <a className="navbar">Why OT</a>
            </Link></li>
            
            <li><Link href="/">
              <a className="navbar">Solutions</a>
            </Link></li>
            
            <div className="totheright">
              {session? <li><button onClick={() => signOut()} style={{marginTop: '-12px'}} className="red">Log out, {session.user.name}</button></li>: <li><Link href="/login"><button style={{marginTop: '-16px'}}>Log in</button></Link></li> }
            </div>
          </ul>
          </>
      </header>
      <hr></hr>
      <div className={styles.card} style={{marginTop: '-20px'}}><main>{children}</main></div>
    </div>

  )
}