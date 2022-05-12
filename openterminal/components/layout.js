import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from "react"
import Favicon from 'react-favicon';
import { useSession, signIn, signOut } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBookmark, faArrowRight } from '@fortawesome/fontawesome-free-solid'

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
      <Favicon url="../public/pics/logo.png"/>
      <header className={styles.header}>
          <>
          <ul className="navbar" style={{display: 'flex'}}>
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
            
            <li className="navbar" style={{flexDirection: 'row', marginLeft: 'auto'}}>
              { session ? 
                <li className="navbar" style={{marginLeft: 'auto'}}><Link href=""><a className="navbar"><FontAwesomeIcon icon={faBell} /></a></Link> <Link href=""><a  className="navbar"><FontAwesomeIcon icon={faBookmark} /></a></Link> {session.user.name} <button className="navbar" onClick={() => signOut()}><FontAwesomeIcon icon={faBookmark} /></button></li> : 
                <li className="navbar" style={{marginLeft: 'auto'}}><Link href="/login"><a className="navbar">Login</a></Link> <span className="grey">|</span> <Link href="/signup"><a className="navbar">Sign up</a></Link></li>
              }
            </li>
          </ul>
          </>
      </header>
      <hr></hr>
      <div className={styles.card} style={{marginTop: '-20px'}}><main>{children}</main></div>
    </div>

  )
}