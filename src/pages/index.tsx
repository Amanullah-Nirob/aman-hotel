import type { NextPage } from 'next'
import PageContainer from '../components/layouts/PageContainer'
import { useAppSelector } from '../app/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Header from '../components/shared/Header'
import HomeBanner from '../components/home/HomeBanner'


const Home: NextPage = () => {

  return (
      <PageContainer>
        <Header></Header>
        <HomeBanner></HomeBanner>
      </PageContainer>
  )
}

export default Home