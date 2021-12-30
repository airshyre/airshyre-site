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
import { ExternalLink } from "./ExternalLink"

export const Footer = () => {
 return (
  <footer className="text-slate-800 border-t border-slate-300 w-full flex justify-center items-center pt-8 pb-16">
   <div
    className="flex flex-col items-center"
    style={{ maxWidth: "39rem", width: "39rem" }}
   >
    <div className="pointer-events-none select-none sm:w-auto mt-2 mb-4">
     <Image src={AirshyreLogo} alt="Airshyre Logo" height={20} width={170} />
    </div>
    <div className="flex items-center space-x-0 sm:space-x-4">
     <IconContext.Provider
      value={{
       className:
        "w-4 h-4 sm:h-6 sm:w-6 transition duration-100 hover:scale-125 cursor-pointer active:scale-100",
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
       <ImSoundcloud2 className="w-4 h-4 sm:w-6 sm:h-6 hover:text-orange-600 active:text-orange-700" />
      </ExternalLink>
     </IconContext.Provider>
    </div>
   </div>
  </footer>
 )
}
