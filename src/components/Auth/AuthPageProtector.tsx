import React, { ReactNode, useEffect, useState } from 'react';
import { InitialState } from '@/core/redux/reducers/user_state';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import LoadingPage from '../LoadingPage';

type Props = {
    children: ReactNode
}

const AuthPageProtector = ({ children }: Props) => {

    const { user } = useSelector((state: InitialState) => state.user);
    const navigator = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            navigator.push('/profile');
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }, []);

    return (
        <>
            {loading ? <LoadingPage /> :
                <div className='relative h-screen flex flex-col items-center justify-center' style={{
                    backgroundImage: "url('/login-bg.jpg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}>
                    <div className='absolute top-0 left-0 h-screen w-full'
                        style={{
                            opacity: "60%",
                            backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.8) 0,rgba(0,0,0,0) 60%,rgba(0,0,0,0.8) 100%)"
                        }}
                    ></div>
                    <div className='z-10 w-full'>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default AuthPageProtector