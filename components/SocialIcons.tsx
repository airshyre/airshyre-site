import { IconContext } from "react-icons"
import { AiOutlineYoutube } from "react-icons/ai"
import { RiTwitterLine, RiSpotifyLine, RiInstagramLine } from "react-icons/ri"
import { GrSoundcloud } from "react-icons/gr"
import { ExternalLink } from "../components/ExternalLink"

export const SocialIcons = () => {
  return (
    <div className="items-center hidden sm:flex sm:space-x-3 mr-1">
      <IconContext.Provider
        value={{
          className:
            "w-6 h-6 sm:h-6 sm:w-6 transition duration-100 hover:scale-125 cursor-pointer active:scale-100",
        }}
      >
        <ExternalLink href="https://www.youtube.com/channel/UConvvkSmorbRNaz_w0BaSRQ">
          <AiOutlineYoutube className="hover:text-red-500 active:text-red-700" />
        </ExternalLink>
        <ExternalLink href="https://www.twitter.com/airshyre">
          <RiTwitterLine className="hover:text-sky-500 active:text-sky-600" />
        </ExternalLink>
        <ExternalLink href="https://www.spotify.com/airshyre">
          <RiSpotifyLine className="hover:text-green-500 active:text-green-700 " />
        </ExternalLink>
        <ExternalLink href="https://www.instagram.com/airshyre">
          <RiInstagramLine className="hover:text-pink-500 active:text-pink-600" />
        </ExternalLink>
        <ExternalLink href="https://www.soundcloud.com/airshyre">
          <GrSoundcloud className="w-5 h-5 sm:w-6 sm:h-6 hover:text-orange-500 active:text-orange-700" />
        </ExternalLink>
      </IconContext.Provider>
    </div>
  )
}
