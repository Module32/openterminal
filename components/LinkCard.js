import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function LinkCard({href, title, content, color, secondary, bgcolor, border}) {
    return (<>
        <Link href={href}><a className={`bg-${bgcolor} border border-${border} shadow-md hover:shadow-xl transition hover:-translate-y-2 hover:scale-[1.03] group px-5 py-3 rounded-md text-lg hover:bg-${color}`}>
            <p className="text-xl">{title} <span className={`p-2 float-right bg-slate-900 rounded-lg text-${color}`}><FontAwesomeIcon icon={faArrowRight} /></span></p>
            <p className={`text-${secondary} text-base`}>{content}</p>
        </a></Link>
    </>)
}