import styles from './layout.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react'

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false)
    
  //choose the screen size 
  const handleResize = () => {
      if (window.innerWidth < 720) {
          setIsMobile(true)
      } else {
          setIsMobile(false)
      }
  }

  useEffect(() => {
      window.addEventListener("resize", handleResize)
  
      handleResize();
  
      return () => {
          window.removeEventListener('resize', handleResize)
      }
    }, [isMobile])

  return (
    <footer>
      <div className={`p-6 border-t border-t-slate-300 flex ${isMobile && 'flex-col'} pb-16 px-16`}>
        <div className='flex-1 font-semibold text-xl'>
          <Image
            src="/pics/logo.png"
            alt="logo"
            width={150}
            height={150}
            className='grayscale transition opacity-30 hover:grayscale-0 hover:opacity-80'
          />
          <p className='-translate-y-3 text-gray-dark mt-3'>Open Terminal Co.</p>
          <p className='-translate-y-3 text-gray'>2021-{new Date().getFullYear()}</p>
          <p className='-translate-y-3 text-gray'>Developed with <FontAwesomeIcon icon={faMusic} className='hover:text-primary hover:animate-bounce' /></p>
        </div>
        <div className='flex-1 flex'>
          <div className={`flex flex-col mr-10 ${!isMobile && 'ml-auto'}`}>
            <div className='text-gray text-lg flex flex-col mb-2'>
              <span className="font-semibold text-gray-dark">Products</span>
              <Link href="genopi"><a className="font-normal m-0 p-0 hover:text-slate-500">Genopi</a></Link>
              <Link href=""><a className="font-normal m-0 p-0 hover:text-slate-500">Track</a></Link>
              <Link href=""><a className="font-normal m-0 p-0 hover:text-slate-500">BBS</a></Link>
            </div>

            <div className='text-gray text-lg flex flex-col'>
              <span className="font-semibold text-gray-dark">FAQ</span>
              <Link href=""><a className="font-normal m-0 p-0 hover:text-slate-500">Commonly asked</a></Link>
              <Link href=""><a className="font-normal m-0 p-0 hover:text-slate-500">Why OT?</a></Link>
            </div>
          </div>

          <div className={`flex flex-col`}>
            <div className='text-gray text-lg flex flex-col mb-2'>
              <span className="font-semibold text-gray-dark">Legal</span>
              <Link href=""><a className="font-normal m-0 p-0 hover:text-slate-500">ToS</a></Link>
              <Link href=""><a className="font-normal m-0 p-0 hover:text-slate-500">Privacy Policy</a></Link>
            </div>

            <div className='text-gray text-lg flex flex-col'>
              <span className="font-semibold text-gray-dark">Legal</span>
              <Link href=""><a className="font-normal m-0 p-0 hover:text-slate-500">ToS</a></Link>
              <Link href=""><a className="font-normal m-0 p-0 hover:text-slate-500">Privacy Policy</a></Link>
            </div>
          </div>
        </div>
        </div>
    </footer>
  )
}