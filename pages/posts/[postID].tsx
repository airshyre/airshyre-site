import React from "react"
import type {
  NextPage,
  InferGetServerSidePropsType,
  GetStaticPropsContext,
} from "next"
import Head from "next/head"
import { ghostClient } from "../../ghostCMSClient"
import Link from "next/link"
import { BsArrowLeft } from "react-icons/bs"
import { DateTime } from "luxon"
import { PostContent } from "../../components/PostContent"
import { PageHeader } from "../../components/PageHeader"
import { Footer } from "../../components/Footer"

type Props = InferGetServerSidePropsType<typeof getStaticProps>

const Post: NextPage<Props> = ({ post }) => {
  return (
    <>
      <Head>
        <title>Airshyre — {post.title}</title>
        <meta name="description" content="Airshyre's music website." />
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
              <span className="text-gray-900">
                {post.authors?.[0] || "Airshyre"}
              </span>{" "}
              on{" "}
              <span className="text-gray-900">
                {DateTime.fromISO(post.published_at || "").toFormat(
                  "MMMM dd, yyyy"
                )}
              </span>
            </div>
            <div className="text-5xl mt-4 font-bold">{post.title}</div>
            <div className="mt-4 text-gray-400 font-medium">
              {post.meta_description}
            </div>
            <div className="mt-4 text-gray-400 font-medium">
              {post.featured}
            </div>
            <PostContent content={post} />
            <div>{post.slug}</div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ postID: string }>) => {
  const id = params?.postID
  if (!id) throw new Error("Post Id is undefined!")
  const post = await ghostClient.posts.read({ id })
  return {
    props: {
      post,
    },
  }
}

export async function getStaticPaths() {
  const posts = await ghostClient.posts.browse()
  return {
    paths: posts.map((post) => ({ params: { postID: post.id } })),
    fallback: false,
  }
}

export default Post
