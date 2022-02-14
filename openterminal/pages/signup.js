import { getProviders, signIn } from "next-auth/react"
import Link from 'next/link'
import Layout from '../components/layout'
import Footer from '../components/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-free-solid'
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons'

export default function SignIn() {
  return (
    <>
      <Layout>
        <div className="blobs" style={{textAlign: 'left'}}>
          <h1 style={{paddingTop: '50px'}}>Sign up for an Open Terminal account</h1>
          <p>Welcome to Open Terminal! Glad to have you on board.</p>
  <div style={{display: 'flex'}}>
          <div className="acrylic" style={{width: '48%'}}>
            <h4>Creating an account gives you</h4>
            <div style={{justifyContent: 'center'}}>
              <h2><FontAwesomeIcon icon="code" /> Access to a suite of tools</h2>
              <p style={{color: 'rgb(200, 200, 200)'}}>With an OT account, you instantly get access to all of our tools and products. Setting up your projects becomes easier than ever.</p>
  
  <h2><FontAwesomeIcon icon="door-open" /> One portal to everything</h2>
              <p style={{color: 'rgb(200, 200, 200)'}}>Use just one account for every OT solution. You can quickly get going thanks to integrations that are easy to use.</p>

  <h2><FontAwesomeIcon icon="users" /> A voice in the Terminal Community</h2>
              <p style={{color: 'rgb(200, 200, 200)'}}>Want to talk to others about your experience? Have questions or feedback? An account gives you the power to do just that.</p>
  </div>
          </div>
  <div className="acrylic" style={{width: '48%', backgroundColor: 'rgb(255, 255, 255, 0.6)'}}>  
  <div style={{textAlign: 'center'}}>
  <h1>Sign up now</h1>
  <button onClick={() => signIn('github')} style={{width: '100%'}}>
              {<FontAwesomeIcon icon={faGithub}/>} Sign up with GitHub
            </button><br />
            <button onClick={() => signIn('discord')} style={{width: '100%'}} className="discord">
              {<FontAwesomeIcon icon={faDiscord} />} Sign up with Discord
            </button>
          <p>Have an account? <Link href="/login"><a style={{color: '#5a30ff'}}>Log in instead</a></Link></p>
  </div>
        </div>
  </div>
    </div>
      </Layout>
  <Footer>
  </Footer>
    </>
  )
}