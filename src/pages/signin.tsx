import React from 'react'

function SignIn() {
  return (
    <div className='flex flex-row'>
    <img src="gambar.png" width={720} alt="" />
    <div className='flex flex-col justify-start items-center'>
    <img src="logo.png" alt="" />
    <div className='flex flex-col justify-center items-center gap-10'>
    <h1 className='text-4xl text-blue-900 font-semibold'>Sign In</h1>
    <h1>Welcome back! Please enter your details.</h1>
    <div className='flex flex-col justify-center items-start gap-4 text-left'>
    <label htmlFor="username">Name</label>
    <input type="text" placeholder='username' className='p-2 rounded-xl border-[1px] w-full'/>
    <label htmlFor="password">Password</label>
    <input type="password" placeholder='password' className='p-2 rounded-xl border-[1px] w-full'/>
    <a href='/home' className='bg-blue-900 text-white p-4 py-2 rounded-lg w-full text-center'>Sign In</a>
    <h1>Don’t have an account? <a href="/signup" className='text-blue-950 text-center'>Sign Up</a></h1>
    </div>
    </div>
    </div>
    </div>
  )
}

export default SignIn