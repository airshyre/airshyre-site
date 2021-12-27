import Link from "next/link"
import { useMenu } from "../stores/useMenu"

export type Props = {
    items: {title: string; link: string}[];
}

export const FlyoutMenu = (props: Props) => {
    return <div className="bg-white w-full h-full">
        <ul >
        {props.items.map(item => {
            return (
            <li key={item.title} className="w-full text-center py-2 px-6 first:border-none border-t border-px">
                <Link href={item.link} prefetch>{item.title}</Link>
            </li>
            )
        })}
        </ul>
    </div>
}