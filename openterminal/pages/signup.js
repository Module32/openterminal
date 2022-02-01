import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowCircleRight, faHeart } from '@fortawesome/fontawesome-free-solid'

export default function FirstPost() {
    return (
        <>
          <Layout>
            <div className="hometop" style={{textAlign: 'left'}}>
              <h1>Sign up</h1>
              <p className="grey">Welcome to Open Terminal! Let&apos;s get an account set up for you.</p>
            </div>
        </Layout>
        </>
    )
  }