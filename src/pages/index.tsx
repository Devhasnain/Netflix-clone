import Banner from '@/components/Banner'
import Container from '@/components/Container'
import Row from '@/components/Row'
import SiteHeader from '@/components/SiteHeader'
import requests from '@/core/requests'


export default function Home() {
  return (
    <main className=''>
      <SiteHeader />
      <Banner />
      <Container>
        <Row title='Netflix Orignals' fetchUrl={requests.fetchNetflixOrignals} isLargeRow={false} />
        <Row title='Top Rated' fetchUrl={requests.fetchTopRated} isLargeRow={true} />
        <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} isLargeRow={true} />
        <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} isLargeRow={true} />
        <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} isLargeRow={true} />
        <Row title='Romantic Movies' fetchUrl={requests.fetchRomanceMovies} isLargeRow={false} />
        <Row title='Documentories' fetchUrl={requests.fetchDocumentories} isLargeRow={false} />
      </Container>
    </main>
  )
}
