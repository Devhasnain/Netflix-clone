import React, { useState, useEffect } from 'react'
import Container from './Container'
import Image from 'next/image'

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


    return (
        <div className={`${showHeader && 'bg-[#111]'} transition ease-in-out delay-150 duration-400 fixed top-0 left-0 w-full z-10`}>
            <Container>
                <div className='flex flex-col md:flex-row flex-wrap md:items-center'>
                    <div className='flex flex-col md:w-6/12'>
                        <Image alt='' src={'/logo.png'} height={150} width={160} />
                    </div>
                    <div className='flex flex-col md:w-6/12 items-end'>
                        <div className='h-[35px] w-[35px] flex flex-row bg-white items-center justify-center rounded-full shadow overflow-hidden border'>
                            <Image alt='' src={'/profile-avatar.png'} height={25} width={25} />
                        </div>
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default SiteHeader