import React from 'react'
import type { NextPage, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ghostClient } from '../ghostCMSClient'
import { FaYoutube, FaTwitter, FaInstagramSquare, FaSpotify} from 'react-icons/fa'
import {ImSoundcloud2} from 'react-icons/im'
import { IconContext } from 'react-icons'
import { useMenu } from '../stores/useMenu'
import AirshyreLogo from '../images/airshyre_slate.svg'
import { BsChevronDown } from 'react-icons/bs'
import Link from 'next/link'
import { ExternalLink } from '../components/ExternalLink'


// const videoLink = 'blob:https://player.vimeo.com/a243e4a5-0774-4901-ac0f-08be36a91032';
type Props = InferGetServerSidePropsType<typeof getStaticProps>;
const Home: NextPage<Props> = ({ posts, pages }) => {
  const {isOpen} = useMenu();
  const [loaded, setLoaded] = React.useState(true);
  if (loaded === false) return <div>loading...</div>
  return (
    <div>
      <Head>
        <title>Airshyre</title>
        <meta name="description" content="Airshyre's music website." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Chivo:wght@300;400&family=Josefin+Sans:wght@200;300;400;500;600;700&family=Quicksand:wght@700&display=swap" rel="stylesheet"/> 
      </Head>
      <div className="text-slate-800 relative h-screen w-full">
        <div className='flex items-center justify-center h-screen w-screen'>
          <div className='flex flex-col items-center justify-center'>
            <div className='pointer-events-none select-none w-4/5 sm:w-auto'>
              <Image src={AirshyreLogo} alt='Mountains' height={60} />
            </div>
            <div className='hidden sm:block flex flex-col space-y-4 items-center justify-center sm:space-y-0 sm:flex-row sm:space-x-8 mt-6'>
              {pages.map(page => <button className='transition rounded hover:bg-gray-100 active:bg-gray-200 px-2 pt-1 pb-0 tracking-widest uppercase font-josefin font-semibold' key={page.title}>{page.title}</button>)}
            </div>
            <div className='flex items-center space-x-0 sm:space-x-4 mt-6'>
              <IconContext.Provider value={{ className: "w-10 h-10 sm:h-12 sm:w-12 p-2 transition duration-100 hover:scale-125 cursor-pointer active:scale-100" }}>
                <ExternalLink href="https://www.youtube.com/channel/UConvvkSmorbRNaz_w0BaSRQ"><FaYoutube className='hover:text-red-600 active:text-red-700'/></ExternalLink>
                <ExternalLink href="https://www.twitter.com/airshyre"><FaTwitter className='hover:text-sky-500 active:text-sky-600'/></ExternalLink>
                <ExternalLink href="https://www.spotify.com/airshyre"><FaSpotify className='hover:text-green-600 active:text-green-700 '/></ExternalLink>
                <ExternalLink href="https://www.instagram.com/airshyre"><FaInstagramSquare className='hover:text-pink-500 active:text-pink-600'/></ExternalLink>
                <ExternalLink href="https://www.soundcloud.com/airshyre"><ImSoundcloud2 className='w-11 h-11 hover:text-orange-600 active:text-orange-700'/></ExternalLink>
              </IconContext.Provider>
            </div>
            <BsChevronDown className='w-8 h-8 mt-16 sm:mt-24'/>
          </div>
        </div>
        <div className='text-white w-screen h-48 bg-slate-900'>
          ygjhgjhg
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const posts = await ghostClient.posts.browse();
  const pages = await ghostClient.pages.browse({include: ["tags", "authors"]});

  const sortPagesByIndex = (unsortedPages: typeof pages) => {
    return unsortedPages.sort((a, b) => {
      const getIndex = (page: typeof pages[0]) => {
        const indexTag = page.tags?.find(tag => tag.name?.includes("#index_"));
        const index = indexTag?.name?.split("_")[1];
        return Number(index);
      };
      return getIndex(a) - getIndex(b);
    })
  }

  return {
    props: {
      posts,
      pages: sortPagesByIndex(pages),
    }
  }
}






export default Home
