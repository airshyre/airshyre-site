import { FaSpotify } from "react-icons/fa";
import { BurgerButton } from "./BurgerButton";
import { useMenu } from "../stores/useMenu";
import Image from 'next/image'
import Logo from '../images/logo.svg'

export const MenuBar = () => {
  const { isOpen, toggleIsOpen } = useMenu();
  return (
    <div className="p-2.5 w-full flex items-center justify-between border-b border-gray-300">
      <BurgerButton isOpen={isOpen} onClick={toggleIsOpen}/>
      <span className="select-none flex iems-center">
      <Image src={Logo} />
      </span>
      <FaSpotify className="h-6 w-6"/>
    </div>
  );
};
