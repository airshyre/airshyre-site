import React from "react"
import type { NextPage, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import Image from "next/image"
import { ghostClient } from "../ghostCMSClient"
import {
 FaYoutube,
 FaTwitter,
 FaInstagramSquare,
 FaSpotify,
} from "react-icons/fa"
import { ImSoundcloud2 } from "react-icons/im"
import { IconContext } from "react-icons"
import AirshyreLogo from "../images/airshyre_white.svg"
import { BsChevronDown } from "react-icons/bs"
import { ExternalLink } from "../components/ExternalLink"
import { PostSummary } from "../components/PostSummary"
import { useScroll } from "../hooks/useScroll"
import { useIsInView } from "../hooks/useIsInView"
import { DynamicPageHeader, PageHeader } from "../components/PageHeader"
import { Footer } from "../components/Footer"
import { AnimatePresence, motion } from "framer-motion"
import { FlyoutMenu } from "../components/FlyoutMenu"
import { useMenu } from "../stores/useMenu"
import { useScrollHeight } from "../hooks/useScrollHeight"

const videoLink =
 "blob:https://player.vimeo.com/a243e4a5-0774-4901-ac0f-08be36a91032"
type Props = InferGetServerSidePropsType<typeof getStaticProps>
const Home: NextPage<Props> = ({ posts }) => {
 const { ref, scrollToElement } = useScroll()
 const { ref: ref2, isInView } = useIsInView()
 const { isOpen, toggleIsOpen } = useMenu()

 return (
  <div className="relative">
   <Head>
    <title>Airshyre — Home</title>
    <meta name="description" content="Airshyre's music website." />
    <link rel="icon" href="/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
     rel="preconnect"
     href="https://fonts.gstatic.com"
     crossOrigin="true"
    />
    <link
     href="https://fonts.googleapis.com/css2?family=Chivo:wght@300;400;700;900&family=Josefin+Sans:wght@200;300;400;500;600;700&family=Quicksand:wght@700&display=swap"
     rel="stylesheet"
    />
   </Head>
   <DynamicPageHeader />

   {/* {isOpen ? <FlyoutMenu items={[{ link: "/", title: "item1" }]} /> : null} */}

   <div className="absolute w-screen h-4/5 z-0 brightness-50">
    <Image
     src="https://images.pexels.com/photos/65911/winter-nature-season-trees-65911.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
     objectFit="cover"
     layout="fill"
     objectPosition="50% 40%"
    />
    {/* <video
     className="w-full h-full object-cover brightness-50"
     src="/videos/video.mp4"
     autoPlay
     loop
     muted
     height="100%"
     width="100%"
    ></video> */}
   </div>

   <div className="text-gray-900 relative h-screen w-full">
    <div className="flex items-center justify-center h-4/5 w-screen">
     <div className="text-gray-50 flex flex-col items-center justify-center">
      <div
       className="pointer-events-none select-none w-4/5 sm:w-auto"
       ref={ref2}
      >
       <Image
        src={AirshyreLogo}
        alt="Airshyre Logo"
        height={60}
        priority
        loading="eager"
       />
      </div>

      {/* <button
       onClick={scrollToElement}
       className="transition mt-8 sm:mt-16 rounded hover:bg-gray-50/25  w-14 h-14 active:bg-gray-50/75 flex items-center justify-center"
      >
       <BsChevronDown className="w-8 h-8" />
      </button> */}
     </div>
    </div>
    <div className="w-full border-t border-gray-300"></div>
    <div
     ref={ref}
     className="gap-3 sm:px-4 sm:py-16 py-8 text-gray-900 grid grid-cols-1 lg:grid-cols-3 sm:mx-auto mx-4 sm:mx-0 sm:w-2/3"
    >
     {posts.map((post) => {
      return (
       <div key={post.id} ref={ref2}>
        <PostSummary key={post.id} {...post} />
       </div>
      )
     })}
    </div>
    <div className="mt-24">
     <Footer />
    </div>
   </div>
  </div>
 )
}

export const getStaticProps = async () => {
 const posts = await ghostClient.posts.browse()
 const pages = await ghostClient.pages.browse({ include: ["tags", "authors"] })

 const sortPagesUsingIndexTag = (unsortedPages: typeof pages) => {
  const getIndex = (page: typeof pages[0]) => {
   const indexTag = page.tags?.find((tag) => tag.name?.includes("#index_"))
   const index = indexTag?.name?.split("_")[1]
   return Number(index)
  }
  return unsortedPages.sort((a, b) => getIndex(a) - getIndex(b))
 }

 console.log(posts)

 return {
  props: {
   posts,
   pages: sortPagesUsingIndexTag(pages),
  },
 }
}

export default Home
