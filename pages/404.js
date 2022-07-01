import Layout from '../components/layout'
import Footer from '../components/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css';

export default function Custom404() {
  return (
    <>
      <Layout>
        <div className="text-center font-medium py-28 px-10 flex">
          <div className="flex-1">
            <p className="text-3xl">This is indeed a</p>
            <p className="text-9xl font-extrabold">4 0 4</p>
          </div>
          <div className="flex-1">
            <p className="text-2xl text-gray">It looks like you&apos;ve found that page which is telling you that the page you were trying to find isn&apos;t actually a page (or not a page in our pages directory, at least).<br /><br />That&apos;s a problem, innit?</p>
            <h1 className="text-lg pt-7">
              <Link href="/"><a className="padding">Go back home</a></Link>
              <button className="neutral border-none">Continue your misery in the 404 page</button>
            </h1>
          </div>
        </div>
      </Layout>
      <Footer>
      </Footer>
    </>
  )
}