import AuthPageProtector from '@/components/Auth/AuthPageProtector';
import Container from '@/components/Container';
import Link from 'next/link';
import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useForm } from 'react-hook-form';
import { auth } from '@/core/firebase';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/core/redux/reducers/user_state';
import { useRouter } from 'next/router';

type FormData = {
    email: string,
    password: string
}

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigator = useRouter();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        try {
            const { email, password } = data;
            const signin = await auth.signInWithEmailAndPassword(email, password);
            const user_email = signin?.user?.email;
            const user_id = signin?.user?.uid;
            toast.success('Sign In successful')

            dispatch(setUserData({ user_email, user_id }));
            setLoading(false);

            navigator.push('/profile');

        } catch (error: any) {
            toast.error(error?.message)
            setLoading(false);
        }
    }


    return (
        <AuthPageProtector>
            <Container>
                <div className='flex flex-row items-center justify-center h-full'>
                    <div className='flex flex-col lg:w-4/12 md:mx-auto text-white bg-black p-8 shadow-lg rounded'>
                        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
                            <div className=''>
                                <h3 className='text-3xl'>Sign In</h3>
                            </div>
                            <div className=''>
                                <label id='email' className='text-sm' htmlFor='email'>Email</label>
                                <input {...register("email", { required: true })} className='py-2 px-4 bg-white rounded w-full text-black focus:outline-red-600' placeholder='Email Address' />
                            </div>
                            <div className=''>
                                <label className='text-sm' htmlFor='password'>Password</label>
                                <input {...register("password", { required: true })} id='password' placeholder='Password' className='py-2 px-4 bg-white rounded w-full text-black focus:outline-red-600' />
                            </div>
                            <div className=''>
                                <button className='py-2 px-5 bg-red-600 text-white'>{loading ? <BeatLoader size={8} color='white' /> : "Sign In"}</button>
                            </div>
                            <div className='text-center'>
                                <span className='text-sm'>Don&apos;t have an account?</span><br />
                                <Link className='hover:underline text-sm text-red-600' href={'/auth/sign-up'}>Sign Up now</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </AuthPageProtector>
    )
}

export default SignIn