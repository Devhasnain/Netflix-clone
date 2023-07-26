import React, { ReactNode, useEffect, useState } from 'react';
import { logout, setUserData } from '@/core/redux/reducers/user_state';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import LoadingPage from '../LoadingPage';
import { auth } from '@/core/firebase';

type Props = {
    children: ReactNode
}

const PageGuard = ({ children }: Props) => {

    const navigator = useRouter();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('logout')
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            if (!userAuth) {
                navigator.push('/auth/sign-in');
                dispatch(logout());
            } else {
                const user_email = userAuth?.email;
                const user_id = userAuth?.uid;
                dispatch(setUserData({ user_email, user_id }));
                setLoading(false)
            }
        });
        return unsubscribe;

    }, [dispatch]);

    return (
        <>
            {loading ? <LoadingPage /> : children}
        </>
    )
}

export default PageGuard