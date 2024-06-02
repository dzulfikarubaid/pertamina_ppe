import Link from 'next/link'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
    <div className='flex flex-col gap-3'>
    <h1 className='text-blue-900 font-semibold'>404 Error</h1>
    <h1 className='text-5xl font-bold'>Page Not Found</h1>
    <p>Sorry, the page you are looking for doesn't exist. Here are some helpful links:</p>
    <div className='flex flex-row gap-4'>
    <button className='border-blue-900 p-4 py-2 border-[1px] flex items-center flex-row gap-2 rounded-lg' onClick={() => window.history.back()}> <BiArrowBack></BiArrowBack><h1>Go Back</h1> </button>
    <Link className='bg-blue-900 text-white p-4 py-2 rounded-lg' href={"/home"}>Take me home</Link>
    </div>
    </div>
    </div>
  )
}

export default NotFound