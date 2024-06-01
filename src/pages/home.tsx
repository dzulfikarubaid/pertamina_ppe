import React, { useContext, useEffect } from 'react'
import TopBar from './topbar'
import SideBar from './sidebar'
import AppContext from './context';
import { BiLink } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { auth } from '@/firebase/connect';
import { onAuthStateChanged } from 'firebase/auth';
import Account from './account';

function Home() {
  const { dashboard, cctv, lm, account } = useContext(AppContext);
  const [authUser, setAuthUser] = React.useState<any>("");
  const router = useRouter();
 const [home, setHome] = React.useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setAuthUser(user);
      setHome(true)
    } else {
      router.push("/")
    }
  });

  }, [])

  return(home &&

  (
    <div>
    <TopBar></TopBar>
    <div className='flex flex-row gap-2'>
    <SideBar></SideBar>
   <div className='p-2 w-full h-full'>
   {
      dashboard &&
      <h1>Dashboard</h1>
      
    }
    {
      cctv &&
      <div className='flex flex-col justify-center items-center w-full h-full'>
      <div className=' p-1 bg-black/30 rounded-2xl mt-32'>
      <img src="logo.png" width={175} alt="" />
      <div className='flex flex-col gap-4 justify-center items-center p-4'>
      <img src="cctv.png" width={200} alt="" />
      <div className='flex flex-row items-center bg-white p-2 py-1 rounded-xl'>
      <BiLink></BiLink>
      <input type="password" className='p-1 rounded-lg focus:outline-none' placeholder='rstp://cameraipaddress'/></div>
       <div className='flex flex-row-reverse w-full'>
       <button className='bg-blue-950 text-white p-4 py-2 rounded-lg'>Connect</button>
       </div>
      </div>
     
      </div>
      </div>
    }
    {
      account &&
      <Account></Account>
    } 
    </div>
    </div>
    
    
    </div>
  ))
}

export default Home