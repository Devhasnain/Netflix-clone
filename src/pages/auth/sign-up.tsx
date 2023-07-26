import React, { useState } from 'react';
import AuthPageProtector from '@/components/Auth/AuthPageProtector'
import Container from '@/components/Container'
import { useForm } from 'react-hook-form'
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { auth } from '@/core/firebase';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/core/redux/reducers/user_state';
import { useRouter } from 'next/router';

type FormData = {
    name: string,
    email: string,
    password: string
}

const SignUp = () => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigator=useRouter();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        try {
            const { email, name, password } = data;
            const register = await auth.createUserWithEmailAndPassword(email, password);
            const user_email = register?.user?.email;
            const user_id = register?.user?.uid;
            toast.success('Sign Up successful')

            dispatch(setUserData({ user_email, user_id }));
            setLoading(false);

            navigator.push('/profile');

        } catch (error: any) {
            toast.error(error?.message)
            setLoading(false);
        }

    };

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
                                <label id='name' className='text-sm' htmlFor='name'>Name</label>
                                <input {...register("name", { required: true })} className='py-2 px-4 bg-white rounded w-full text-black focus:outline-red-500' placeholder='Name' />
                            </div>
                            <div className=''>
                                <label id='email' className='text-sm' htmlFor='email'>Email</label>
                                <input {...register("email", { required: true })} className='py-2 px-4 bg-white rounded w-full text-black focus:outline-red-500' placeholder='Email Address' />
                            </div>
                            <div className=''>
                                <label className='text-sm' htmlFor='password'>Password</label>
                                <input {...register("password", { required: true })} id='password' placeholder='Password' className='py-2 px-4 bg-white rounded w-full text-black focus:outline-red-500' />
                            </div>
                            <div className=''>
                                <button className='py-2 px-5 bg-red-600 text-white'>{loading ? <BeatLoader size={8} color='white' /> : 'Sign Up'}</button>
                            </div>
                            <div className='text-center'>
                                <span className='text-sm'>Already have an account?</span><br />
                                <Link className='hover:underline text-sm text-red-600' href={'/auth/sign-in'}>Sign In now</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </AuthPageProtector>
    )
}

export default SignUp