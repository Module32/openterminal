import Layout from '../components/layout'
import Footer from '../components/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import Link from 'next/link'

export default function Custom404() {
  return (
    <>
      <Layout>
        <div className="infocard" style={{padding: '100px'}}>
            <div style={{flexDirection: 'column'}}>
                <h1 style={{fontSize: '50px', margin: '5'}}>Looks like you&apos;re lost in the OTverse</h1>
                <p>Whoops! The page you were looking for couldn&apos;t be found. Perhaps going <Link href="/"><a>back home</a></Link> can help out.</p>
            </div>
            <Image
                src="/pics/404lostinspace.png"
                width='860px'
                height='650px'
            />
        </div>
      </Layout>
  <Footer>
  </Footer>
    </>
  )
}