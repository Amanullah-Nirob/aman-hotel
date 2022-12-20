import type { NextPage } from 'next'
import Head from 'next/head'
import { useAppSelector } from '../app/hooks'
import { selectTheme } from '../app/slices/theme/ThemeSlice'
import HomeBanner from '../components/home/HomeBanner'


const Home: NextPage = () => {
  const theme=useAppSelector(selectTheme)
  return (
    <>
    <Head>
     <title>AmanHotel</title>
     <meta 
      name="theme-color" key="theme-color"
      content={ theme ==='light'?'#f8f8f8':'#000'}
      />
    </Head>
    <HomeBanner></HomeBanner>
    </>
  )
}

export default Home