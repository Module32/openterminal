import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function Redirect({ text, link }) {
    return (<>
    <div className='h-screen flex'>
        <div className='text-center font-medium my-auto mx-auto'>
            <div className='flex justify-center items-center'>
                <Image
                src="/pics/logo.png"
                alt="logo"
                width={35}
                height={35}
                />
                <p className='ml-1 font-semibold text-gray-dark'>Open Terminal</p>
            </div>
            <p className="text-4xl mt-3 font-semibold"><span className='bg-slate-300/75 p-1 px-2 rounded-xl'><FontAwesomeIcon icon={faAtom} className="animate-spin text-primary" /></span> Redirecting you to {text}</p>
            <p className='text-xl mt-1'>This may take up to a minute.</p>
            <p className=" mt-3 text-gray">If you are not redirected within 60 seconds, <Link href={link}><a className="underline">click here</a></Link>.</p>
        </div>
    </div>
    </>
    )
}