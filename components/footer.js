import styles from './layout.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMusic } from '@fortawesome/free-solid-svg-icons'
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

    const quickLinks = {
      'Homepage': '/',
      'Login': '/login',
      'Sign up': '/signup'
    }

  return (
    <footer>
      <div className={`py-6 border-t border-t-slate-300 mx-14`}>
        <div className={`flex ${isMobile && 'flex-col'} flex-wrap`}>
          <div className='flex-1 font-normal text-lg text-gray leading-tight'>
            <img src='/pics/logo.png' width={60} height={60} className='mr-2 bg-white rounded border border-slate-300 p-2' /> 
            <p className='mt-1.5 font-medium text-black'>Open Terminal</p>
            <p>© 2021-{new Date().getFullYear()}</p>
            <p>By Module64 & MrNames</p>
          </div>
          <div className={`flex-1 flex ${isMobile && 'mt-5'}`}>
            <div className={`text-lg font-medium text-slate-500 mr-10 ${!isMobile && 'ml-auto'}`}>
              <p className="font-medium mono text-black">Products</p>
              <p><Link href="augmentive"><a className="hover:text-slate-400">Augmentive</a></Link></p>
              <p><Link href=""><a className="hover:text-slate-400">Quark</a></Link></p>
              <p><Link href=""><a className="hover:text-slate-400">BBS</a></Link></p>
            </div>
            <div className='text-lg font-medium text-slate-500 mr-10'>
              <p className="font-medium mono text-black">FAQ</p>
              <p><Link href=""><a className="hover:text-slate-400">Commonly asked</a></Link></p>
            </div>
            <div className='text-lg font-medium text-slate-500'>
              <p className="font-medium mono text-black">Legal</p>
              <p><Link href=""><a className="hover:text-slate-400">Terms of Service</a></Link></p>
              <p><Link href=""><a className="hover:text-slate-400">Privacy Policy</a></Link></p>
            </div>
          </div>
        </div>
        <div className='border-t border-slate-300 flex items-center py-3 mt-10 font-medium text-gray'>
          {Object.keys(quickLinks).map(function(key, index) {
            return <Link href={quickLinks[key]} key={index}><a className='px-1 py-0.5 border border-slate-300 hover:bg-slate-200/75 rounded mr-1'>{key}</a></Link>
          })}
          <div className='ml-auto'>
            <img src='/pics/logo.png' width={25} height={25} className='-translate-y-1 grayscale brightness-200 opacity-40' /> 
          </div>
        </div>
      </div>
    </footer>
  )
}