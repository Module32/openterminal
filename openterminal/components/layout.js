import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from "react"
import Favicon from 'react-favicon';
import { useSession, signIn, signOut } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowCircleRight, faHeart } from '@fortawesome/fontawesome-free-solid'

const name = 'Module64'
export const siteTitle = 'Open Terminal'

export default function Layout({ children, home }) {
  const { data: session } = useSession();
  const [menu, showMenu] = useState(false);
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
          <div className="navbar" style={{display: "flex"}}>
            <Image
              src="pics/logo.png"
              alt="logo"
              width={300}
              height={300}
              style={{ flexDirection: 'row', margin: '10' }}
            />

            <Link href="/">
              <a className="navbar" style={{ flexDirection: 'row', margin: '10' }}>Home</a>
            </Link>

            <Link href="/whyot">
              <a className="navbar" style={{ flexDirection: 'row', margin: '10' }}>Why OT</a>
            </Link>
            
            <Link href="/">
              <a className="navbar" style={{ flexDirection: 'row', margin: '10' }}>Solutions</a>
            </Link>
            
            { session ? <span>{session.user.name}</span> : <span><Link href="/login"><a className="navbar">Login <FontAwesomeIcon icon="arrow-circle-right" /></a></Link></span> }
          </div>
          </>
      </header>
      <hr></hr>
      <div className={styles.card} style={{marginTop: '-20px'}}><main>{children}</main></div>
    </div>

  )
}