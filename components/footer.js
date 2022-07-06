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

  return (
    <footer>
      <div className={`p-6 border-t border-t-slate-300 px-10`}>
        <div className='flex flex-wrap'>
          <div className='text-lg font-medium text-slate-500 mr-10'>
            <p className="font-medium mono text-black">Products</p>
            <p><Link href="augmentive"><a className="hover:text-slate-400">Augmentive</a></Link></p>
            <p><Link href=""><a className="hover:text-slate-400">Quark</a></Link></p>
            <p><Link href=""><a className="hover:text-slate-400">BBS</a></Link></p>
          </div>
          <div className='text-lg font-medium text-slate-500 mr-10'>
            <p className="font-medium mono text-black">FAQ</p>
            <p><Link href=""><a className="hover:text-slate-400">Commonly asked</a></Link></p>
          </div>
          <div className='text-lg font-medium text-slate-500 mr-10'>
            <p className="font-medium mono text-black">Legal</p>
            <p><Link href=""><a className="hover:text-slate-400">Terms of Service</a></Link></p>
            <p><Link href=""><a className="hover:text-slate-400">Privacy Policy</a></Link></p>
          </div>
        </div>
      </div>
      <div className='border-t border-slate-300 py-3 px-10 mono'>
        <p className='flex items-center'>Built with <span className='text-slate-200 bg-slate-700 w-fit px-2 py-0.5 rounded mx-2.5'>monospace supremacy</span> <Link href="/"><a className='ml-auto p-0.5 px-2 text-gray bg-slate-300/80 rounded'><FontAwesomeIcon icon={faHouse} /></a></Link></p>
      </div>
    </footer>
  )
}