import Link from 'next/link';

export default function Linker({href, content, color, bgcolor, hover, classes}) {
    return <span><Link href={href}><a className={`bg-${bgcolor} p-2 rounded-md hover:bg-${hover} m-1 ml-0 ${classes}`}>
    <span className={`font-medium text-${color}`}>{content}</span>
    </a></Link></span>
}