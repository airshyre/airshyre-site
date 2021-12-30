import Image from "next/image"
import AirshyreLogo from "../images/airshyre_slate.svg"
import { IconContext } from "react-icons"
import {
 FaYoutube,
 FaTwitter,
 FaInstagramSquare,
 FaSpotify,
} from "react-icons/fa"
import { ImSoundcloud2 } from "react-icons/im"
import { BiMenu } from "react-icons/bi"

import { ExternalLink } from "../components/ExternalLink"
import React from "react"
import { BurgerButton } from "./BurgerButton"
import { useMenu } from "../stores/useMenu"
import Link from "next/link"

export const PageHeader = () => {
 const { isOpen, toggleIsOpen } = useMenu()
 return (
  <div>
   <div className="fixed z-50 text-black h-16 bg-slate-50 border-b w-full flex items-center justify-center">
    <div
     className="px-4 flex justify-between items-center"
     style={{ maxWidth: "56rem", width: "56rem" }}
    >
     <Link href="/">
      <div className="cursor-pointer select-none sm:w-auto mt-2">
       <Image src={AirshyreLogo} alt="Airshyre Logo" height={20} width={170} />
      </div>
     </Link>
     <div className="block sm:hidden">
      <BurgerButton isOpen={isOpen} onClick={toggleIsOpen} />
     </div>
     <div className="items-center hidden sm:flex sm:space-x-3 mr-1">
      <IconContext.Provider
       value={{
        className:
         "w-6 h-6 sm:h-6 sm:w-6 transition duration-100 hover:scale-125 cursor-pointer active:scale-100",
       }}
      >
       <ExternalLink href="https://www.youtube.com/channel/UConvvkSmorbRNaz_w0BaSRQ">
        <FaYoutube className="hover:text-red-600 active:text-red-700" />
       </ExternalLink>
       <ExternalLink href="https://www.twitter.com/airshyre">
        <FaTwitter className="hover:text-sky-500 active:text-sky-600" />
       </ExternalLink>
       <ExternalLink href="https://www.spotify.com/airshyre">
        <FaSpotify className="hover:text-green-600 active:text-green-700 " />
       </ExternalLink>
       <ExternalLink href="https://www.instagram.com/airshyre">
        <FaInstagramSquare className="hover:text-pink-500 active:text-pink-600" />
       </ExternalLink>
       <ExternalLink href="https://www.soundcloud.com/airshyre">
        <ImSoundcloud2 className="w-5 h-5 sm:w-6 sm:h-6 hover:text-orange-600 active:text-orange-700" />
       </ExternalLink>
      </IconContext.Provider>
     </div>
    </div>
   </div>
   <div className="h-16 w-full"></div>
  </div>
 )
}
