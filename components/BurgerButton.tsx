import { ComponentProps } from "react"
import { MdOutlineMenu, MdClose } from "react-icons/md"

type Props = {
 isOpen: boolean
 onClick: ComponentProps<"button">["onClick"]
}

export const BurgerButton = ({ isOpen, onClick }: Props) => {
 return (
  <button
   onClick={onClick}
   className="rounded w-8 h-8 flex items-center justify-center hover:bg-gray-100"
  >
   {isOpen ? (
    <MdClose className="h-6 w-6" />
   ) : (
    <MdOutlineMenu className="h-7 w-7" />
   )}
  </button>
 )
}
