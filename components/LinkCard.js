import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function LinkCard({href, title, content, color, secondary, bgcolor}) {
    return (<>
        <Link href={href}><a className={`bg-${bgcolor} group transition px-5 py-3 rounded-md hover:skew-y-1 text-lg hover:bg-${color} m-1 shadow-xl`}>
            <p className="text-xl">{title} <span className={`p-2 float-right bg-slate-900 rounded-lg text-${color}`}><FontAwesomeIcon icon={faArrowRight} /></span></p>
            <p className={`text-${secondary} text-base`}>{content}</p>
        </a></Link>
    </>)
}