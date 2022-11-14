import type { NextPage } from 'next'
import Head from 'next/head'
import HomeBanner from '../components/home/HomeBanner'


const Home: NextPage = () => {

  return (
    <>
    <Head>
     <title>
      AmanHotel
    </title>
    </Head>
    <HomeBanner></HomeBanner>
    </>
  )
}

export default Home