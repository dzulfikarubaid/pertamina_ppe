import React from 'react';

function SignUp() {
  return (
    <div className='flex flex-row'>
      <img src="gambar.png" width={720} alt="" />
      <div className='w-full h-full'>
        <div className='flex flex-row-reverse'>
          <img width={175} src="logo.png" alt="" />
        </div>
        <div className='flex flex-col justify-center items-center w-full h-full'>
        <div className='flex flex-col justify-center items-start gap-10 w-fit '>
          <h1 className='text-4xl text-blue-900 font-semibold'>Sign Up</h1>
          
          <div className='flex flex-col gap-4 '>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Enter your name' className='p-2 rounded-xl border-[1px] w-full' />
            <label htmlFor="email">Email</label>
            <input type="text" placeholder='Enter your email' className='p-2 rounded-xl border-[1px] w-full' />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Create password' className='p-2 rounded-xl border-[1px] w-full' />
            <label htmlFor="retype">Retype Password</label>
            <input type="password" placeholder='Retype password' className='p-2 rounded-xl border-[1px] w-full' />

            <a href='/home' className='bg-blue-900 text-white p-4 py-2 rounded-lg w-full text-center'>Sign Up</a>
            <h1>Already have an account? <a href="/signin" className='text-blue-950'>Sign In</a></h1>
          </div>
        </div>
        </div>
        </div>
      </div>
    
  );
}

export default SignUp;
