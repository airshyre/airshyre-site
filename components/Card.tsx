import Image from 'next/image'
import Link from 'next/link'
type Props = {
    image: string;
    author: string;
    title: string;
    date: string;
    summary: string;
    link: string;
}

export const Card = (props: Props) => {
    return (
        <div>
            <Link href={props.link}>
            {props.image && <Image src={props.image} height={160} width={320} objectFit='cover'/>}
            </Link>
            <div className='p-6'>
            <div className='flex text-xs text-gray-500'>
                <span>{props.author}</span>
                /
                <span>{props.date}</span>
            </div>
            <h3 className='font-archivo text-3xl font-semibold mt-2'>{props.title}</h3>
            <p className='text-sm text-gray-500 mt-3'>{props.summary}</p>
            <span className="text-xs text-blue-600 hover:text-blue-700 hover:cursor-pointer mt-8">
                <Link href={props.link}>Read More</Link>
            </span>
            </div>
        </div>
    )
}