import React from "react"
import type { NextPage, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import Image from "next/image"
import { ghostClient } from "../ghostCMSClient"
import AirshyreLogo from "../images/airshyre_white.svg"
import { PostThumbnail } from "../components/PostThumbnail"
import { PageHeader } from "../components/PageHeader"
import { Footer } from "../components/Footer"
import { FlyoutMenu } from "../components/FlyoutMenu"
import { useMenu } from "../stores/useMenu"
import { PostFeatured } from "../components/PostFeatured"

const backgroundImages = [
 "https://images.pexels.com/photos/773594/pexels-photo-773594.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
 "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1814&q=80",
 "https://images.pexels.com/photos/300857/pexels-photo-300857.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
 "https://images.pexels.com/photos/11017979/pexels-photo-11017979.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=3000&w=2250",
]
type Props = InferGetServerSidePropsType<typeof getStaticProps>
const Home: NextPage<Props> = ({ posts }) => {
 const { isOpen } = useMenu()
 const [featuredPost, ...allPosts] = posts
 return (
  <div className="relative">
   <Head>
    <title>Airshyre — Home</title>
    <meta name="description" content="Airshyre's music website." />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <PageHeader isDynamic />
   {isOpen ? <FlyoutMenu items={[{ link: "/", title: "item1" }]} /> : null}
   <div className="absolute w-screen h-4/5 z-0 brightness-50">
    <Image
     src={backgroundImages[3]}
     objectFit="cover"
     layout="fill"
     objectPosition="50% 40%"
     alt="yo"
    />
   </div>

   <div className="text-gray-900 relative h-screen w-full">
    <div className="flex items-center justify-center h-4/5 w-screen">
     <div className="text-gray-50 flex flex-col items-center justify-center">
      <div className="pointer-events-none select-none w-4/5 sm:w-auto">
       <Image
        src={AirshyreLogo}
        alt="Airshyre Logo"
        height={60}
        priority
        loading="eager"
       />
      </div>
     </div>
    </div>
    <div className="w-full border-t border-gray-300"></div>
    <div className="mx-auto -mt-8 w-full flex items-center justify-center ">
     <PostFeatured {...posts[0]} />
    </div>
    <div className="mt-8 gap-4 items-center justify-center py-8 text-gray-900 grid grid-cols-1 mx-4 sm:px-4 sm:py-16 sm:mx-auto sm:w-2/3 lg:grid-cols-3">
     {posts.map((post) => {
      return (
       <div key={post.id} className="flex flex-col items-center justify-center">
        <PostThumbnail key={post.id} {...post} />
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
 const posts = ghostClient.posts.browse()
 const pages = ghostClient.pages
  .browse({ include: ["tags", "authors"] })
  .then((unsortedPages) => {
   const getIndex = (page: typeof unsortedPages[0]) => {
    const indexTag = page.tags?.find((tag) => tag.name?.includes("#index_"))
    const index = indexTag?.name?.split("_")?.[1]
    if (isNaN(Number(index)))
     throw new Error("Page does not have a valid index tag.")
    return Number(index)
   }
   return unsortedPages.sort((a, b) => getIndex(a) - getIndex(b))
  })
 return {
  props: {
   posts: await posts,
   pages: await pages,
  },
 }
}

export default Home
