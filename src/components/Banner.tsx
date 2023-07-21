import React, { useState, useEffect } from 'react'
import Container from './Container'
import instense from '@/core/instense';
import requests from '@/core/requests';
import Image from 'next/image';

const Banner = () => {

    const [movie, setMovie] = useState<null | any>(null);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(true);

    function Truncate(string: string, n: number) {
        return string?.length > n ? string.substring(0, n - 1) + '...' : string
    }

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                let request = await instense.get(requests.fetchNetflixOrignals);
                setMovie(request?.data?.results[Math.floor(Math.random() * request?.data?.results?.length - 1)]);
                setLoading(false);
            } catch (error) {
                setError("We have got an error while fetching the data, Please reload the page or tryagain letter!");
                setLoading(false);
            }
            return;
        }
        fetchData();
    }, []);

    return (
        <>
            {movie && <header className='flex relative items-center md:h-screen text-white' style={{
                backgroundImage:
                    `url("https://image.tmdb.org/t/p/original${movie?.poster_path}")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center"
            }}>
                <Container>
                    <div className='flex flex-col space-y-5 lg:w-5/12 w-10/12'>
                        <h1 className='text-6xl font-bold'>{movie?.title || movie?.name || movie?.original_name}</h1>
                        <div className='flex flex-row space-x-4'>
                            <button className='py-2.5 px-10 bg-gray-100/50 transition duration-300 hover:bg-white rounded hover:text-black'>Play</button>
                            <button className='py-2.5 px-10 bg-gray-100/50 transition duration-300 hover:bg-white rounded hover:text-black'>My List</button>
                        </div><p className='pt-3'>{Truncate(movie?.overview, 250)}</p>
                    </div>
                </Container>
                <div className='banner_fade_bottom absolute bottom-0 left-0' />
            </header>}

            {loading && <div className='flex flex-col items-center justify-center md:h-screen'>
                <Image alt='' src={'/loading.gif'} height={60} width={60} className='animate-pulse ' />
            </div>}

            {error && <div className="space-y-7 text-center flex flex-col md:h-screen text-white items-center justify-center md:w-7/12 md:mx-auto">
                <h1 className='text-7xl font-bold'>401</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora eaque ea optio eveniet quia rem, hic sunt est amet repellendus.</p>
            </div>}
        </>
    )
}

export default Banner