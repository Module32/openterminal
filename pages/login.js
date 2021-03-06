import { getProviders, signIn } from "next-auth/react"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faDiscord, faGoogle } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import React, {useState, useEffect} from "react"
import { faGrin, faGrinAlt } from "@fortawesome/free-regular-svg-icons"

export default function Signup() {
  const { data: session } = useSession();
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

  let sideCodes = "MPMUUBD3 4C9JB775 FRLU88FB 44WQS5B2 394VZVDU 4KWG4QPN XA6HMD6Y HNRLJYE8 844F4DT2 C59NJNNY W8M96QAA 489SGQJA DYFX8VGM MT5KXMU7 68Z9MEQS 2UC5C3YE 5KJH87MZ 4UEW2M6U CJZH9C22 HC7HFBZM Q3XTD4SZ 4ENXTP5Y MQWH6Z2K Y8BKVS5R 9RUMY8MQ WGDKSCW9 P8BGXYWS KJP3LRER GAA6K35B RWXVWWKA 25UVEFUZ 6NGKK7KE UZWXXE6Z BH8UZV9F 3DXX2S7T PYEXAG6B JDL5CNHM 9VNZMP4H B572C949 QRNB9RTJ DHS9T4E3 P2A8ZM4E JX32ZMMQ GH2TDAFH Z9RYKVFS LDAK7AW9 3EEWF5T3 ZDVLFBRV SZ8A96N4 YMZKNCDW DA8EQ8QY 2BPGHZ8E B3MMQ54W 2DGY39SX P9EJBT24 HMJ638N3 M7Z4PTX5 VH74QS8M CSSXU9EH W2WFKZV5 A67HW5GW NFS4U2W7 BPECMDEB 32VRU434 Z3ZTCGAJ FMKVQUHE R7FDDDDG ZEKZXGL7 AWY2QX9T PHSX5JQS PNTFSBPW 7NV3GVCL GX7HA75D YTEVE93K L9C7ZTNM VZ7ADUB3 Q3GXQLWH NFB4MBCK FG5J65DL E4C5NZJB YWSHXQEX U4GS2VDA NWZWAYDJ QFFFG3HF 3URG55JE WV7UPDBW FZ7N5YDX 79U3DTRZ S4CWPWWV M582V38F BT4AR72Z CDXW5D5Y BKEVXKQY 5HF4BEG8 AU65E6FG NJXV9YCE CD2X4N5K W5XPLBPP CZ4FT5DY 4964TR5Q V3Y6LJHF VCTE9WH4 M9LNRKS9 SUTJP5QB LTZ9YK5D 7TS79UMF RANTUTVY FN3QS5LR AEJK8A8V XTQKX2S6 AFZU5WQQ LUEECQNU URT2BAC6 7FBHZ9QM TKJTS3ZP F7XDLXWM 6AYBGK3Q PH7SS3UH EBD5QDW2 HJVTCW9H MQN24LUV 8CN3HKCN 3P5GZG9Y D2RGLCSN Y6GJZPE3 993BH4WU JBD99A8G DL4ETLZF JSDVJHWB 7CD56NYZ AWY3CRAJ HNGPZEGL 82FKBLGK ZBGMY3GY ZYM6AJL4 QA74U3JC 535EBUW8 KZSEZ2VT 3DVX9YDA SQP9W59R ZTARUVE4 Y9SBYN6Q QYFDHA5M FTE95RBT TEM6NRYY AWBPRVH3 6E8KDJZ5 G28C27DA GRFFP5U5 FEGWNLEG 8NRQJEKE ACMGDVXU 4S5NDSXG TPH9UUHG L6AU3M6C 2R7W3FF4 ZQXMQGTP SJ6A5LH8 4VPM6K6X PAXEZACC KXCQ5V89 MAJ8XEJZ KUBX6DMR A5HFVLQN 7C72HCL2 57BX9PHK SJJ7YG33 68USKQ3W M3YF7N8E 4U6RNVRJ HZU3CGNA WGPACKLH 4A6SK8YB 9BZ2USCY QZGNHSXE LDTT2A2F 4ZLZG4A4 3FXMMYFZ S42E3KQ2 N2KQ278E TTQZL54E HDQV2T3H YRENSZWA XGQL55WX NQ4NUY8G UM36RVTL 2A4WQUK5 VQPXTTGQ T7KBKC6D E4T7WZJT NMRWKM25 S9XTWFKL 2C9RPJJT RGJSHER7 AE2Y3XF9 9Q24B4MM 3BGEV9D7 YMT34VLT";
  sideCodes = sideCodes.split(" ");
  let finalCodes = []
  sideCodes.map(x => {
    let number = Math.random();
    if (number > 0.5) {
      finalCodes.push(<span className='text-primary mx-1'>{x}</span>)
    } else {
      finalCodes.push(<span className='mx-1'>{x}</span>)
    }
  })

  return (
    <>
      <div className='flex'>
        <div className="flex-grow xl:w-[0.5%] md:w-4/12 sm:w-11/12 h-screen">
          <div className="flex-1 px-20 font-medium bg-slate-50 h-screen flex flex-col justify-center">
            <div className='fixed top-3 left-2'>
            <Link href="/"><a className='px-2 text-xl font-semibold flex items-center'>
            <Image
                  src="/pics/logo.png"
                  alt="logo"
                  width={35}
                  height={35}
                  className='inline-flex'
            /> <span className='ml-1'>open terminal</span></a></Link></div>
            <h1 className="text-4xl font-bold">Welcome back to OT</h1>
            <p className='text-xl my-3 text-gray mb-8'>Sign in through the providers below.</p>
            <div className="flex flex-col m-0">
              <button onClick={() => signIn('google')} className="bg-slate-300/10 text-black border border-solid border-slate-300 hover:bg-slate-300/50 w-full"><FontAwesomeIcon icon={faGoogle} /> Google</button>
              <button onClick={() => signIn('discord')} className="bg-slate-300/10 text-black border border-solid border-slate-300 hover:bg-slate-300/50 w-full"><FontAwesomeIcon icon={faDiscord} /> Discord</button>
              <button onClick={() => signIn('github')} className="bg-slate-300/10 text-black border border-solid border-slate-300 hover:bg-slate-300/50 w-full"><FontAwesomeIcon icon={faGithub} /> GitHub</button>
            </div>
            <p className="pt-3 text-center text-gray">Don&apos;t have an account yet? <Link href="/signup"><a className="text-primary hover:text-primary/75">Sign up</a></Link></p>
            <p className='fixed bottom-4 left-4 text-gray text-sm'>??{new Date().getFullYear()} Open Terminal Co.</p>
          </div>
        </div>
        {!isMobile && <div className='flex-1 flex bg-slate-200 p-4 mono'>
          <div className='mx-auto my-auto text-center text-8xl'>
            <FontAwesomeIcon icon={faGrin} className='text-primary animate-pulse' /> 
          </div>
        </div>}
      </div>
      { session && <>
            <div className='fixed flex h-screen top-0 w-screen bg-black/30 items-center justify-center'>
              <div className={`font-medium ${isMobile ? 'w-11/12' : 'w-4/12'} rounded border border-slate-400`}>
                <div className='p-3 bg-slate-100 rounded-t text-center'>
                  <p className='text-2xl'>Welcome back, <span className='font-bold'>{session.user.name}</span></p>
                  <img src={session.user.image} width={160} className='mx-auto mt-3 rounded shadow-xl' />
                  <p className='mt-4 text-gray'>{session.user.email} | You are logged in</p>
                </div>
                <div className='p-3 bg-slate-200 text-center rounded-b'>
                  <p className='text-lg'>Return to <Link href='/'><a className='underline underline-offset-1 hover:text-gray'>homepage</a></Link></p>
                </div>
              </div>
            </div>
      </> }
    </>
  )
}