import React from 'react'
import { ClipLoader } from 'react-spinners'

const LoadingPage = () => {
  return (
    <div className='flex flex-col h-screen items-center justify-center'>
        <ClipLoader color='red' size={50} />
    </div>
  )
}

export default LoadingPage