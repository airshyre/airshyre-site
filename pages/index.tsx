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
import { PageHeader } from "../components/PageHeader"
import { Footer } from "../components/Footer"
import { AnimatePresence, motion } from "framer-motion"

const videoLink =
 "blob:https://player.vimeo.com/a243e4a5-0774-4901-ac0f-08be36a91032"
type Props = InferGetServerSidePropsType<typeof getStaticProps>
const Home: NextPage<Props> = ({ posts }) => {
 const { ref, scrollToElement } = useScroll()
 const { ref: ref2, isInView } = useIsInView()
 console.log(isInView)
 return (
  <div>
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
   <AnimatePresence>
    {isInView ? (
     <div className="fixed z-50 w-full" key="uiuiuiu">
      <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}>
       <PageHeader>
        <div className="h-16 w-full"></div>
       </PageHeader>
      </motion.div>
     </div>
    ) : null}
   </AnimatePresence>
   <div className="absolute w-screen h-screen z-0">
    <video
     className="w-full h-full object-cover brightness-50"
     src="/videos/video.mp4"
     autoPlay
     loop
     muted
     height="100%"
     width="100%"
    ></video>
   </div>

   <div className="text-slate-900 relative h-screen w-full">
    <div className="flex items-center justify-center h-screen w-screen">
     <div className="text-slate-50 flex flex-col items-center justify-center">
      <div
       className="pointer-events-none select-none w-4/5 sm:w-auto"
       ref={ref2}
      >
       <Image src={AirshyreLogo} alt="Airshyre Logo" height={60} />
      </div>
      <div className="flex items-center space-x-0 sm:space-x-4 mt-6">
       <IconContext.Provider
        value={{
         className:
          "w-10 h-10 sm:h-12 sm:w-12 p-2 transition duration-100 hover:scale-125 cursor-pointer active:scale-100",
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
         <ImSoundcloud2 className="w-9 h-9 sm:w-11 sm:h-11 hover:text-orange-600 active:text-orange-700" />
        </ExternalLink>
       </IconContext.Provider>
      </div>
      <button
       onClick={scrollToElement}
       className="transition mt-8 sm:mt-16 rounded hover:bg-slate-50/25  w-14 h-14 active:bg-slate-50/75 flex items-center justify-center"
      >
       <BsChevronDown className="w-8 h-8" />
      </button>
     </div>
    </div>
    <div className="w-full border-t border-slate-300"></div>
    <div
     ref={ref}
     className="gap-3 p-8 py-24 text-slate-900 w-screen grid grid-cols-3 mx-auto w-2/3"
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
