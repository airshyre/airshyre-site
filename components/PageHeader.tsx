import Image from "next/image"
import AirshyreLogoWhite from "../images/airshyre_white.svg"
import { AiOutlineLine } from "react-icons/ai"

import React from "react"
// import { BurgerButton } from "./BurgerButton"
// import { useMenu } from "../stores/useMenu"
import Link from "next/link"
import { SocialIcons } from "./SocialIcons"
import { useScrollHeight } from "../hooks/useScrollHeight"
import { BurgerButton } from "./BurgerButton"
import { capitalize } from "../utils/capitalize"

const pageLinks = ["bio", "contact", "music", "videos"].map((pageTitle) => {
 return (
  <Link href={"/" + pageTitle}>
   <span className="hover:text-gray-200 hover:cursor-pointer">
    {capitalize(pageTitle)}
   </span>
  </Link>
 )
})

export const DynamicPageHeader = () => {
 const { isAtScrollHeight } = useScrollHeight(100)
 const ref = React.useRef<HTMLDivElement>(null)
 React.useEffect(() => {
  if (ref.current === null) return
  ref.current.style.height = `6rem`
  document.addEventListener("scroll", () => {
   if (ref.current === null) return
   if (window.scrollY < 100) {
    ref.current.style.height = `${6 - (window.scrollY / 100) * 2}rem`
    return
   }
   ref.current.style.height = "4"
  })
 })

 return (
  <div
   className={`duration-150 -mt-6 sm:mt-0 px-4 sm:px-8 h-8 sm:h-16 flex justify-center items-end w-full fixed z-50 ${
    isAtScrollHeight
     ? "bg-white text-gray-900 border-b border-gray-300"
     : "bg-transparent text-white"
   }`}
   ref={ref}
   style={{ height: `${ref.current}` }}
  >
   <div
    className={`w-full flex items-center justify-between h-16`}
    style={{ maxWidth: "56rem", width: "56rem" }}
   >
    <div>
     <Link href="/">
      <div
       className={`transition cursor-pointer select-none sm:w-auto mt-2 ${
        isAtScrollHeight ? "invert" : ""
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
    </div>

    <div className="block md:hidden">
     <BurgerButton isOpen={false} onClick={() => {}} />
    </div>
    <div className="md:flex hidden">
     <div className="flex items-center space-x-6">{pageLinks}</div>
     <AiOutlineLine className="transform rotate-90 w-8 h-8 mx-4 opacity-50" />
     <SocialIcons />
    </div>
   </div>
  </div>
 )
}

export const PageHeader = () => {
 return (
  <div
   className={`duration-150 h-12 sm:h-16 px-4 md:px-0 flex justify-center items-end w-full bg-white text-gray-900 border-b border-gray-300`}
  >
   <div
    className={`w-full flex items-center justify-between h-12`}
    style={{ maxWidth: "56rem", width: "56rem" }}
   >
    <div>
     <Link href="/">
      <div
       className={`invert transition cursor-pointer select-none sm:w-auto mt-2`}
      >
       <Image
        src={AirshyreLogoWhite}
        alt="Airshyre Logo"
        height={20}
        width={170}
       />
      </div>
     </Link>
    </div>

    <div className="block md:hidden">
     <BurgerButton isOpen={false} onClick={() => {}} />
    </div>
    <div className="md:flex hidden">
     <div className="flex items-center space-x-6">{pageLinks}</div>
     <AiOutlineLine className="transform rotate-90 w-8 h-8 mx-4 opacity-50" />
     <SocialIcons />
    </div>
   </div>
  </div>
 )
}

{
 /* <div className="block sm:hidden">
      <BurgerButton isOpen={isOpen} onClick={toggleIsOpen} />
     </div> */
}
{
 /* */
}

// export const getStaticProps = async () => {
//  const pages = await ghostClient.pages.browse({ include: ["tags", "authors"] })

//  const sortPagesUsingIndexTag = (unsortedPages: typeof pages) => {
//   const getIndex = (page: typeof pages[0]) => {
//    const indexTag = page.tags?.find((tag) => tag.name?.includes("#index_"))
//    const index = indexTag?.name?.split("_")[1]
//    return Number(index)
//   }
//   return unsortedPages.sort((a, b) => getIndex(a) - getIndex(b))
//  }

//  return {
//   props: {
//    pages: sortPagesUsingIndexTag(pages),
//   },
//  }
// }

export default PageHeader
