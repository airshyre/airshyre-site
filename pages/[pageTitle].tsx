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
import { PostContent } from "../components/PostContent"

type Props = InferGetServerSidePropsType<typeof getStaticProps>

const Post: NextPage<Props> = ({ page }) => {
  return (
    <>
      <Head>
        <title>Airshyre — {page.title}</title>
        <meta name="description" content="Airshyre's music website." />
      </Head>
      <div className="flex flex-col min-h-screen">
        <PageHeader />
        {/* <div className="flex flex-grow flex-col items-center justify-center w-full"> */}
        <div className="flex flex-col items-center pt-8 sm:pt-16 pb-24 px-4 sm:px-16 mx-auto w-2/3">
          <PostContent content={page}>
            <Link href="/" passHref>
              <div className="flex items-center text-blue-600 hover:underline cursor-pointer hover:text-blue-700 active:text-blue-800">
                <BsArrowLeft className="mr-2" />
                <span>Go Back</span>
              </div>
            </Link>
            <div className="flex flex-col items-center w-full">
              <div className="text-5xl mt-4 font-bold w-min">{page.title}</div>
              <div className="mt-4 text-gray-400 font-medium">
                {page.meta_description}
              </div>
              <div className="mt-4 text-gray-400 font-medium">
                {page.featured}
              </div>
            </div>
          </PostContent>
        </div>
        {/* </div> */}
        <Footer />
      </div>
    </>
  )
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ pageTitle: string }>) => {
  const pages = await ghostClient.pages.browse({
    fields: ["title", "id"],
  })
  const pageId = pages.find((page) => {
    console.log(page.title?.toLowerCase(), params?.pageTitle)
    return page.title?.toLowerCase() === params?.pageTitle
  })?.id
  if (pageId === undefined) throw new Error("Page not found!")
  const page = await ghostClient.pages.read({ id: pageId })
  return {
    props: {
      page,
    },
  }
}

export async function getStaticPaths() {
  const pages = await ghostClient.pages.browse({
    include: ["tags"],
    fields: ["title"],
  })
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
      params: { pageTitle: page.title?.toLowerCase() },
    })),
    fallback: false,
  }
}

export default Post
