import React, { use, useContext, useEffect } from 'react'
import { auth } from '../firebase/connect';
import { onAuthStateChanged } from 'firebase/auth';
import { Sign } from 'crypto';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BiChevronDown, BiChevronUp, BiExit, BiX } from 'react-icons/bi';
import AppContext from './context';
import Image from 'next/image';
function TopBar() {
  const [authUser, setAuthUser] = React.useState<any>("");
  const router = useRouter();
  const { setAccount } = useContext(AppContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setAuthUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

  }, [])

  async function SignOut() {
    auth.signOut();
    // setLogout(false)
    router.push("/")

  }
  const [logout, setLogout] = React.useState(false);
  function Move(){
    setAccount()
    setLogout(false)
  }
  return (
    <div className='w-full p-1 flex flex-row justify-between items-center bg-black/10'>
      <Link href="/home">
        <Image width={175} height={50} className='w-[175px] h-auto' src="/logo.png" alt="" /></Link>
      <div className='pr-4 '>

        <button onClick={() => setLogout(!logout)}>
          <div className='flex flex-row gap-2 items-center'>
            <Image width={30} height={30} className='w-[30px] h-[30px] object-cover rounded-full' src={authUser?.photoURL ?? "/user3.png"} alt="" />
            <h1 className='text-black'>{authUser?.displayName}</h1>
            {logout ? <BiChevronUp></BiChevronUp> : <BiChevronDown></BiChevronDown>}
          </div>
        </button>
        {logout &&
          <button onClick={Move} className='text-left  flex flex-col absolute top-20 w-[350px] h-fit right-4 bg-white rounded-2xl shadow-xl border-[1px] z-10'>
         
            <div className='w-full border-b-[2px] flex flex-row gap-4 p-4 py-8 hover:bg-black/10 rounded-t-xl items-center'>
              <Image width={48} height={48} className='w-[48px] h-[48px] object-cover rounded-full' src={authUser?.photoURL ?? "/user3.png"} alt="" />
              <div className='flex flex-col'>
                <h1 className=' font-semibold'>{authUser?.displayName}</h1>
                <p className='text-black/50'>{authUser?.email}</p></div>
            </div>
            <button className='text-left w-full flex flex-row items-center gap-2 hover:bg-black/10 py-4 px-4 rounded-b-xl' onClick={SignOut}><BiExit></BiExit><h1>Sign Out</h1></button>

          </button>
        }
      </div>
    </div>
  )
}

export default TopBar