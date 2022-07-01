import Layout from '../../components/augmentive/layout'
import Footer from '../../components/footer'
import Linker from '../../components/Linker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faQuestion, faShare, faStar, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import Fade from 'react-reveal/Fade';
import Typical from 'react-typical';
import {useState, useEffect} from 'react'

export default function Index() {
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
    <>
      <Layout>
        <div className={`p-5 ${isMobile ? 'pt-5' : 'pt-16'} pb-1 font-medium flex ${isMobile && 'flex-col'}`}>
          <div className='flex-1'>
            <h1 className={`leading-tight ${isMobile ? 'text-[50px]' : 'text-[60px]'} font-extrabold`}>All-in-one learning platform <span className='text-emerald-500'>built for every profession</span></h1>
            <p className='my-2 mb-4 text-xl flex flex-wrap items-center'>Augmentive <span className='bg-yellow/60 p-[2px] rounded mx-1'>changes</span> the way you<span className='ml-[.3rem]'></span><Typical
              steps={['study for tests', 2000, 'work with teams', 2000, 'prepare for interviews', 2000, 'tune in to lectures', 2000]}
              loop={Infinity}
            /></p>
            <Linker href="/augmentive/dashboard" content="Start learning today" color='slate-50' bgcolor='emerald-500' />
          </div>
          <div className={`flex-1 ${isMobile ? 'translate-y-5' : '-translate-y-10'}`}>
            <Fade bottom cascade>
              <div>
                <div className={`bg-white border border-gray/50 py-1 px-3 rounded ${!isMobile && 'w-8/12'} ml-auto my-2`}>
                  <div className='flex items-center'>
                    <FontAwesomeIcon icon={faStickyNote} className='mr-1 text-amber-500' />
                    <p className='text-gray-dark'>Untitled</p>
                    <div className='ml-auto flex'>
                      <FontAwesomeIcon icon={faStar} className='mr-1 text-gray-dark' />
                      <FontAwesomeIcon icon={faShare} className='ml-1 text-gray-dark' />
                    </div>
                  </div>
                  <div className='my-1 mb-2'>
                    <h2 className='text-2xl font-bold'>Science notes</h2>
                    <p className='text-gray-dark'>Living things must <span className='bg-yellow'>grow and develop</span>.</p>
                  </div>
                </div>

                <div className={`bg-white border border-gray/50 py-1 px-3 rounded my-2 ${!isMobile && 'w-9/12 ml-5'}`}>
                  <div className='flex items-center'>
                    <FontAwesomeIcon icon={faQuestion} className='mr-1 text-emerald-500' />
                    <p className='text-gray-dark'>Science test</p>
                    <div className='ml-auto flex'>
                      <FontAwesomeIcon icon={faStar} className='mr-1 text-gray-dark' />
                      <FontAwesomeIcon icon={faShare} className='ml-1 text-gray-dark' />
                    </div>
                  </div>
                  <div className='my-1 mb-2 flex'>
                    <div className='flex-1'>
                      <p className='flex'>1<span className='text-gray ml-[4px]'>of 50</span></p>
                      <h2 className='text-xl font-bold'>Living things must be able to:</h2>
                    </div>
                    <div className='flex-1'>
                      <button className='border-0 ml-0 w-full bg-slate-200 py-1 text-black text-left px-2 my-[2px] hover:bg-slate-200'>Eat people</button>
                      <button className='border-0 ml-0 w-full bg-slate-200 py-1 text-black text-left px-2 my-[2px] hover:bg-slate-200'>Work machines</button>
                      <button className='border-0 ml-0 w-full bg-emerald-400 py-1 text-left px-2 my-[2px] hover:bg-emerald-400'>Grow & develop</button>
                    </div>
                  </div>
                </div>

                <div className={`bg-white border border-gray/50 pt-1 px-3 rounded my-1 ml-auto ${!isMobile && 'w-9/12'}`}>
                  <div className='flex items-center border-b border-slate-400'>
                    <FontAwesomeIcon icon={faFileLines} className='mr-1 text-primary' />
                    <p className='text-gray-dark'>Why we grow</p>
                    <div className='ml-auto flex'>
                      <FontAwesomeIcon icon={faStar} className='mr-1 text-gray-dark' />
                      <FontAwesomeIcon icon={faShare} className='ml-1 text-gray-dark' />
                    </div>
                  </div>
                  <div className='flex'>
                    <div className='bg-slate-200/75 mx-auto w-9/12 py-1 px-2'>
                      <p className='text-base'>...We&apos;ve already learned that growth and development is one of the 7 characteristics of living organisms.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  )
}