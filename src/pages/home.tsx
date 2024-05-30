import React, { useContext } from 'react'
import TopBar from './topbar'
import SideBar from './sidebar'
import AppContext from './context';
import { BiLink } from 'react-icons/bi';

function Home() {
  const { dashboard, cctv } = useContext(AppContext);

  return (
    <div>
    <TopBar></TopBar>
    <div className='flex flex-row gap-2'>
    <SideBar></SideBar>
   <div className='p-2 w-full h-full'>
   {
      dashboard ?
      <h1>Dashboard</h1>
      : cctv &&
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
    </div>
    </div>
    
    
    </div>
  )
}

export default Home