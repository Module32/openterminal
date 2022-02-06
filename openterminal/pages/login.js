import { getProviders, signIn } from "next-auth/react"
import Layout from '../components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'

export default function SignIn() {
  return (
    <>
      <Layout>
      <div className="hometop">
        <h1 style={{fontSize: '40px'}}>Log in</h1>
        <p>Welcome back! Let&apos;s get you signed in.</p>
          <div className="card" style={{margin: 'auto', width: '40%', padding: '20px'}}>
            <button onClick={() => signIn('github')}>
              {<FontAwesomeIcon icon={faGithub} />} Sign in with GitHub
            </button>
        </div>
        </div>
      </Layout>
    </>
  )
}