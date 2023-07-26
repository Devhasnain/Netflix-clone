import Banner from '@/components/Banner'
import Container from '@/components/Container'
import LoadingPage from '@/components/LoadingPage'
import PageGuard from '@/components/Profile/PageGuard'
import Row from '@/components/Row'
import SiteHeader from '@/components/SiteHeader'
import requests from '@/core/requests'


export default function Home() {
  return (
    <main className=''>
      <PageGuard>
        <SiteHeader />
        <Banner />
        <Container>
          <Row title='Netflix Orignals' fetchUrl={requests.fetchNetflixOrignals} isLargeRow={false} />
          <Row title='Top Rated' fetchUrl={requests.fetchTopRated} isLargeRow={false} />
          <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} isLargeRow={false} />
          <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} isLargeRow={false} />
          <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} isLargeRow={false} />
          <Row title='Romantic Movies' fetchUrl={requests.fetchRomanceMovies} isLargeRow={false} />
          <Row title='Documentories' fetchUrl={requests.fetchDocumentories} isLargeRow={false} />
        </Container>
      </PageGuard>
    </main>
  )
}
