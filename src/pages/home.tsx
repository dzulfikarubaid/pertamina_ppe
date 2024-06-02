import React, { useContext, useEffect } from 'react'
import TopBar from './topbar'
import SideBar from './sidebar'
import AppContext from './context';
import { BiLink } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { auth } from '@/firebase/connect';
import { onAuthStateChanged } from 'firebase/auth';
import Account from './account';
import Dashboard from './dashboard';
import Cctv from './cctv';

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
   <div className='p-4 w-full h-full'>
   {
      dashboard &&
     <Dashboard>
     </Dashboard>
      
    }
    {
      cctv &&
      <Cctv></Cctv>
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