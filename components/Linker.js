import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function Linker({href, content, color, bgcolor, hover, classes}) {
    return <span><Link href={href}><a className={`bg-${bgcolor} p-2 rounded-md hover:bg-${hover} m-1 ${classes}`}>
    <span className={`font-medium text-${color}`}>{content}</span>
    </a></Link></span>
}