import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Favicon from 'react-favicon';
import { useSession, signIn, signOut } from "next-auth/react"

const name = 'Module64'
export const siteTitle = 'UnlockAPI'

export default function Unlockapi({ children, home }) {
  const { data: session } = useSession()
  return (
    <div className={styles.container}>
      <Head>
        <meta property="og:description" content="UnlockAPI is the fastest way to reliably collaborate on, monitor, and test your API. Built with ❤️ by OT." />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>UnlockAPI - built by OT</title>
      </Head>
      <Favicon url="../public/pics/ot-logo.png"/>
      <header className={styles.header}>
          <>
          <ul>
            <li><Link href="/">
              <a className="navbar">Home</a>
            </Link></li>

            <li><Link href="/">
              <a className="navbar">Why OT</a>
            </Link></li>
            
            <li><Link href="/">
              <a className="navbar">Solutions</a>
            </Link></li>
            
            <div className="totheright">
              {session? <li><button onClick={() => signOut()} style={{marginTop: '-15px'}} className="red">Log out, {session.user.name}</button></li>: <li><Link href="/login"><button style={{marginTop: '-16px'}}>Log in</button></Link></li> }
            </div>
          </ul>
          </>
      </header>
      <hr></hr>
      <div className={styles.card} style={{marginTop: '-15px'}}><main>{children}</main></div>
    </div>

  )
}