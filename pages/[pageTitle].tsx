import React from "react"
import type {
 NextPage,
 InferGetServerSidePropsType,
 GetStaticPropsContext,
} from "next"
import Head from "next/head"
import { ghostClient } from "../ghostCMSClient"
import Link from "next/link"
import { BsArrowLeft } from "react-icons/bs"
import { DateTime } from "luxon"
import Image from "next/image"
// import { PostContent } from "../../components/PostContent"
import { PageHeader } from "../components/PageHeader"
import { Footer } from "../components/Footer"

type Props = InferGetServerSidePropsType<typeof getStaticProps>

const Post: NextPage<Props> = ({ page }) => {
 return (
  <>
   <Head>
    <title>Airshyre — {page.title}</title>
    <meta name="description" content="Airshyre's music website." />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <div className="flex flex-col min-h-screen">
    <PageHeader />
    <div className="flex flex-grow flex-col items-center w-full">
     <div className="pt-8 sm:pt-16 pb-24 px-4 sm:px-16 mx-auto">
      <Link href="/" passHref>
       <div className="flex items-center text-blue-600 hover:underline cursor-pointer hover:text-blue-700 active:text-blue-800">
        <BsArrowLeft className="mr-2" />
        <span>Go Back</span>
       </div>
      </Link>
      <div className="text-xs mt-8 text-gray-500 font-medium">
       Posted by{" "}
       <span className="text-gray-900">{page.authors?.[0] || "Airshyre"}</span>{" "}
       on{" "}
       <span className="text-gray-900">
        {DateTime.fromISO(page.published_at || "").toFormat("MMMM dd, yyyy")}
       </span>
      </div>
      <div className="text-5xl mt-4 font-bold">{page.title}</div>
      <div className="mt-4 text-gray-400 font-medium">
       {page.meta_description}
      </div>
      <div className="mt-4 text-gray-400 font-medium">{page.featured}</div>
      <div dangerouslySetInnerHTML={{ __html: page.html || "" }} />
      <div>{page.slug}</div>
     </div>
    </div>
    <Footer />
   </div>
  </>
 )
}

type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never

export const getStaticProps = async ({
 params,
}: GetStaticPropsContext<{ pageId: string; pageTitle: string }>) => {
 if (!params?.pageId) throw new Error("Page Id is undefined!")
 const page = await ghostClient.pages.read({ id: params.pageId })
 return {
  props: {
   page,
  },
 }
}

export async function getStaticPaths() {
 const pages = await ghostClient.pages.browse({ include: ["tags", "authors"] })
 const sortedPages = ((unsortedPages: typeof pages) => {
  const getIndex = (page: typeof pages[0]) => {
   const indexTag = page.tags?.find((tag) => tag.name?.includes("#index_"))
   const index = indexTag?.name?.split("_")[1]
   return Number(index)
  }
  return unsortedPages.sort((a, b) => getIndex(a) - getIndex(b))
 })(pages)
 return {
  paths: sortedPages.map((page) => ({
   params: { pageID: page.id, pageTitle: page.title },
  })),
  fallback: false,
 }
}

export default Post