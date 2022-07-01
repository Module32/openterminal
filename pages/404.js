import Layout from '../components/layout'
import Footer from '../components/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'

export default function Custom404() {
  return (
    <>
      <Layout>
        <div className='flex h-[90vh]'>
          <div className='mx-auto m-5 p-3 rounded-md bg-slate-800 w-9/12 h-48 my-auto text-white font-mono'>
            <div className='flex'>
              <FontAwesomeIcon icon={faDotCircle} className='mr-2 text-red-400' />
              <FontAwesomeIcon icon={faCircle} className='mr-2 text-amber-400' />
              <FontAwesomeIcon icon={faCircle} className='text-green' />
            </div>
            <div className='font-medium mt-4'>
              <p><span className='text-sky-400'>module64</span>@<span className='text-green'>open-terminal</span> $ ping www.openterminal.vercel.app/404</p>
              <p>ping: cannot resolve 404: Unknown host</p>
              <p><span className='text-sky-400'>module64</span>@<span className='text-green'>open-terminal</span> $ <Link href='/'><a className='text-blue underline hover:text-blue/60'>ping homepage</a></Link></p>
            </div>
          </div>
        </div>
      </Layout>
      <Footer>
      </Footer>
    </>
  )
}