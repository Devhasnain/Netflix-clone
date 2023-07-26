import Container from '@/components/Container'
import PageGuard from '@/components/Profile/PageGuard'
import SiteHeader from '@/components/SiteHeader'
import configurations from '@/configuration'
import { auth } from '@/core/firebase'
import { InitialState, logout } from '@/core/redux/reducers/user_state'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector((state: InitialState) => state.user);
  const dispatch = useDispatch();
  const navigator = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
      toast.success("You have signed out from user account!")
      navigator.push('/auth/sign-in');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <PageGuard>
      <SiteHeader />
      <Container>
        <div className='flex flex-row h-screen items-center'>
          <div className='flex flex-col lg:mx-auto lg:w-7/12 text-white'>
            <div className='flex flex-row justify-between items-center pb-4 border-b'>
              <div className='flex flex-row justify-start items-center space-x-5'>
                <div className='h-[80px] rounded-full text-white w-[80px] border border-white-[5px] bg-red-500 flex flex-col items-center justify-center'>
                  <span className='text-4xl font-semibold'>{user?.name ? user?.name[0] : user?.user_email[0]}</span>
                </div>
                <h2 className='text-2xl'>{user?.name ? user?.name : user?.user_email}</h2>
              </div>
              <button className='py-2 px-4 bg-red-600' onClick={handleLogout}>Sign Out</button>
            </div>

            <div className='space-y-2'>
              {configurations.stripe_plans.map((item, index: number) => {
                return (
                  <div className='p-2' key={index}>
                    <div className='flex flex-row items-center justify-between p-3 w-full bg-gray-500/5 hover:bg-gray-300/5 transition duration-300'>
                      <div className='flex flex-col'>
                        <h4 className='text-xl'>{item.title}</h4>
                        <span className=''>${item.payment}</span>
                      </div>
                      <Link href={'/'} className='py-2 px-5 bg-red-600'>Subscribe</Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </PageGuard>
  )
}

export default Profile