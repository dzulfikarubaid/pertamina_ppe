import { auth } from '@/firebase/connect';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

function Start() {
  const [authUser, setAuthUser] = React.useState<any>("");
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setAuthUser(user);
      router.push("/home")
    } else {
      // User is signed out
      // ...
    }
  });

  }, [])
  return (
    <div className='flex flex-col justify-center w-full h-screen gap-5 p-32'>
    <h1 className='text-5xl font-semibold'>Workplace Security Portal</h1>
    <p>Enhancing Safety through Real-Time <span className='font-semibold'>CCTV Monitoring and Control Explore in here</span></p>
    <div className='flex flex-row gap-3 items-center'>
    <Link href="/signin" className='border-blue-900 border-[1px] p-4 py-2 rounded-lg'>Sign In</Link>
    <Link href="/signup" className='bg-blue-900 text-white p-4 py-2 rounded-lg'>Sign Up</Link></div>
    
    <div className='flex flex-row-reverse absolute bottom-16 right-24'>
    <img src="logo.png" alt="" width={175} />
    </div>
    
    </div>
  )
}

export default Start