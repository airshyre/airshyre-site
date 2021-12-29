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
import AirshyreLogo from "../images/airshyre_slate.svg"
import { BsChevronDown } from "react-icons/bs"
import { ExternalLink } from "../components/ExternalLink"

// const videoLink = 'blob:https://player.vimeo.com/a243e4a5-0774-4901-ac0f-08be36a91032';
type Props = InferGetServerSidePropsType<typeof getStaticProps>
const Home: NextPage<Props> = ({ posts }) => {
 return (
  <div>
   <Head>
    <title>Airshyre</title>
    <meta name="description" content="Airshyre's music website." />
    <link rel="icon" href="/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
     rel="preconnect"
     href="https://fonts.gstatic.com"
     crossOrigin="true"
    />
    <link
     href="https://fonts.googleapis.com/css2?family=Chivo:wght@300;400&family=Josefin+Sans:wght@200;300;400;500;600;700&family=Quicksand:wght@700&display=swap"
     rel="stylesheet"
    />
   </Head>
   <div className="text-slate-800 relative h-screen w-full">
    <div className="flex items-center justify-center h-screen w-screen">
     <div className="flex flex-col items-center justify-center">
      <div className="pointer-events-none select-none w-4/5 sm:w-auto">
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
      <BsChevronDown className="w-8 h-8 mt-16 sm:mt-24" />
     </div>
    </div>
    <div className="text-slate-700 w-screen h-48 bg-slate-100 border-t border-slate-300">
     {posts.map((post) => {
      return (
       <div>
        {post.feature_image ? (
         <div className="rounded overflow-hidden aspect-video w-full">
          <Image
           objectPosition="50% -90%"
           layout="responsive"
           width={100}
           height={100}
           src={post.feature_image}
           objectFit="cover"
          />
         </div>
        ) : null}
        <span className="text-2xl font-medium">{post.title}</span>
       </div>
      )
     })}
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

 return {
  props: {
   posts,
   pages: sortPagesUsingIndexTag(pages),
  },
 }
}

export default Home
