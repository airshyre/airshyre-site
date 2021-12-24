import type { NextPage, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {ghostClient} from '../ghostCMSClient'

type Props = InferGetServerSidePropsType<typeof getStaticProps>;
const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Airshyre</title>
        <meta name="description" content="Airshyre's music blog." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{width: "100vw", height: "100vh", display: "flex", alignItems: 'center', justifyContent: "center"}}>
        <p>Under construction...</p>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const posts = await ghostClient.posts.browse();
  const pages = await ghostClient.pages.browse();
  return {
    props: {
      posts,
      pages
    }
  }
}

export default Home
