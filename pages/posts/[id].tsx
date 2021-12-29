import React from "react"
import type {
 NextPage,
 InferGetServerSidePropsType,
 GetStaticPropsContext,
} from "next"
import Head from "next/head"
import { ghostClient } from "../../ghostCMSClient"

type Props = InferGetServerSidePropsType<typeof getStaticProps>

const Post: NextPage<Props> = ({ post }) => {
 return (
  <div>
   <Head>
    <title>Airshyre - {post.title}</title>
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
   <div>{post.slug}</div>
  </div>
 )
}

export const getStaticProps = async ({
 params,
}: GetStaticPropsContext<{ id: string }>) => {
 const id = params?.id
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
  paths: posts.map((post) => ({ params: { id: post.id } })),
  fallback: false,
 }
}

export default Post
