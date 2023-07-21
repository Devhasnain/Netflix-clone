import React, { useEffect, useState } from 'react';
import instense from '@/core/instense';
import Image from 'next/image';
import Styles from '../styles/row.module.css';
import Slider from 'react-slick';

type Props = {
    title: string,
    fetchUrl: string,
    isLargeRow: boolean
}

const baseURL = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }: Props) => {

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: isLargeRow ? 3 : 4,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const [movie, setMovie] = useState<null | any>(null);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                let request = await instense.get(fetchUrl);
                setMovie(request?.data?.results);
                setLoading(false);
            } catch (error) {
                setError("We have got an error while fetching the data, Please reload the page or tryagain letter!");
                setLoading(false);
            }
            return;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className={`text-white space-y-6 pt-8 pb-8`}>
            <h2 className='text-4xl font-semibold'>{title}</h2>
            {movie &&
                <Slider {...settings}>
                    {movie?.map((item: any) => {
                        return (
                            <div className={`flex space-x-3 rounded transition duration-300 hover:scale-[1.03] overflow-hidden ${isLargeRow ? 'h-[250px]' : 'max-h-[500px]'} pr-[10px] `} key={movie?.id}>
                                <Image className='w-full h-full rounded' alt={''} src={`${baseURL}${isLargeRow ? item?.backdrop_path : item?.poster_path}`} height={100} width={100} />
                            </div>
                        )
                    })}
                </Slider>}

            {loading && <div className='flex flex-row items-center justify-center'>
                <Image alt='' src={'/loading.gif'} height={60} width={60} className='animate-pulse ' /></div>}

            {error && <div className="space-y-7 text-center flex flex-col md:h-screen text-white items-center justify-center md:w-7/12 md:mx-auto">
                <h1 className='text-7xl font-bold'>401</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora eaque ea optio eveniet quia rem, hic sunt est amet repellendus.</p>
            </div>}
        </div>
    )
}

export default Row