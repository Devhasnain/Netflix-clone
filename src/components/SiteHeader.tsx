import React, { useState, useEffect } from 'react'
import Container from './Container'
import Image from 'next/image'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { InitialState } from '@/core/redux/reducers/user_state';

const SiteHeader = () => {

    const [showHeader, setShowHeader] = useState(false);

    const handleTransition = () => {
        if (window.scrollY > 100) {
            setShowHeader(true)
        } else {
            setShowHeader(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleTransition);
        return () => window.removeEventListener('scroll', handleTransition)
    }, []);

    const { user } = useSelector((state: InitialState) => state.user);

    return (
        <div className={`${showHeader && 'bg-[#111]'} transition ease-in-out delay-150 duration-400 fixed top-0 left-0 w-full z-10`}>
            <Container>
                <div className='flex flex-col md:flex-row flex-wrap md:items-center'>
                    <div className='flex flex-col md:w-6/12'>
                        <Link href={'/'}>
                            <Image alt='' src={'/logo.png'} height={150} width={160} />
                        </Link>
                    </div>
                    <div className='flex flex-col md:w-6/12 items-end'>
                        {user ?
                            <Link href={'/profile'} className='h-[35px] rounded-full text-white w-[35px] border border-white-[5px] bg-red-500 flex flex-col items-center justify-center'>
                                <span className='text-xl font-semibold'>{user?.name ? user?.name[0] : user?.user_email[0]}</span>
                            </Link> :
                            <Link href={'/auth/sign-in'} className='py-2 px-5 text-white bg-red-500'>Sign In</Link>
                        }
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default SiteHeader