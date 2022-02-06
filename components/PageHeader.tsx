import Image from "next/image"
import AirshyreLogoWhite from "../images/airshyre_white.svg"
import { AiOutlineLine } from "react-icons/ai"
import React from "react"
import Link from "next/link"
import { SocialIcons } from "./SocialIcons"
import { useScrollHeight } from "../hooks/useScrollHeight"
import { BurgerButton } from "./BurgerButton"
import {
 createNumberClamper,
 createNumberRangeTransform,
 capitalize,
} from "../utils/index"
import * as F from "fp-ts"
import { darken, rgba } from "polished"
import { useMenu } from "../stores/useMenu"

const pageLinks = ["bio", "contact", "music", "videos"].map((pageTitle) => {
 return (
  <Link href={"/" + pageTitle} passHref={true} key={pageTitle}>
   <span className="hover:text-gray-200 inherit hover:cursor-pointer">
    {capitalize(pageTitle)}
   </span>
  </Link>
 )
})

export const PageHeader = ({
 isDynamic = false,
}: { isDynamic?: boolean } = {}) => {
 const toggleMenuIsOpen = useMenu((s) => s.toggleIsOpen)
 const scrollHeight = useScrollHeight()
 const scrollCompletionRatio = F.function.pipe(
  scrollHeight,
  createNumberRangeTransform([0, 100], [0, 1]),
  createNumberClamper([0, 1])
 )
 const isScrollComplete = scrollCompletionRatio === 1
 const headerMargin = F.function.pipe(
  scrollHeight,
  createNumberRangeTransform([0, 50], [1.5, 0]),
  (val: number) => Math.exp(val),
  createNumberClamper([0, 1.5])
 )

 return (
  <div>
   <div
    className={"duration-150 px-4 sm:mt-0 sm:px-8 flex lg:mb-16 justify-center items-end w-full fixed z-50 ".concat(
     (isDynamic && isScrollComplete) || !isDynamic
      ? "border-b border-gray-200"
      : "",
     isDynamic ? "-mt-6" : ""
    )}
    style={{
     paddingTop: isDynamic ? `${headerMargin}rem` : 0,
     backgroundColor: rgba(
      255,
      255,
      255,
      isDynamic ? scrollCompletionRatio : 1
     ),
     color: darken(isDynamic ? scrollCompletionRatio : 1, "#fff"),
    }}
   >
    <div
     className="w-full flex items-center justify-between h-16"
     style={{ maxWidth: "56rem", width: "56rem" }}
    >
     <Link href="/" passHref={true}>
      <div
       className={`transition cursor-pointer select-none sm:w-auto mt-2 ${
        (isDynamic && isScrollComplete) || !isDynamic ? "invert" : ""
       }`}
      >
       <Image
        src={AirshyreLogoWhite}
        alt="Airshyre Logo"
        height={20}
        width={170}
       />
      </div>
     </Link>
     <div className="block md:hidden">
      <BurgerButton isOpen={false} onClick={toggleMenuIsOpen} />
     </div>
     <div className="md:flex hidden">
      <div className="flex items-center space-x-6">{pageLinks}</div>
      <AiOutlineLine className="transform rotate-90 w-8 h-8 mx-4 opacity-50" />
      <SocialIcons />
     </div>
    </div>
   </div>
   {isDynamic ? null : <div className="h-16"></div>} {/* Spacer Element */}
  </div>
 )
}

export default PageHeader
