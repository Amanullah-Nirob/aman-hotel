import type { NextPage } from 'next'
import PageContainer from '../components/layouts/PageContainer'
import HomeBanner from '../components/home/HomeBanner'


const Home: NextPage = () => {

  return (
      <PageContainer>
        <HomeBanner></HomeBanner>
      </PageContainer>
  )
}

export default Home