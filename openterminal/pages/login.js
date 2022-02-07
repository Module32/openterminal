import { getProviders, signIn } from "next-auth/react"
import Layout from '../components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'

export default function SignIn() {
  return (
    <>
      <Layout>
      <div className="hometop">
        <h1 style={{fontSize: '40px'}}>Log in</h1>
        <p>Welcome back! Let&apos;s get you signed in.</p>
          <div className="card" style={{margin: 'auto', width: '40%', padding: '20px', borderWidth: '0'}}>
            <button onClick={() => signIn('github')} style={{width: '100%'}}>
              {<FontAwesomeIcon icon={faGithub}/>} Sign in with GitHub
            </button><br />
            <button onClick={() => signIn('discord')} style={{width: '100%'}} className="discord">
              {<FontAwesomeIcon icon={faDiscord} />} Sign in with Discord
            </button>
            <hr />
        </div>
        </div>
      </Layout>
    </>
  )
}