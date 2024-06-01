import React, { useContext } from 'react'
import { BiCamera, BiCctv, BiDesktop, BiSolidCctv, BiSolidDashboard, BiUser } from 'react-icons/bi'
import AppContext from './context';

function SideBar() {
    const { dashboard, setDashboard, cctv, setCctv, lm, setLm, account, setAccount } = useContext(AppContext);
    
  return (
    <div className='w-[225px] h-screen bg-black flex flex-col gap-8  p-4 py-8'>
    <button onClick={setDashboard} className={`flex flex-row gap-2 items-center ${dashboard ? "text-white" : "text-white/70"}`}><BiSolidDashboard></BiSolidDashboard><h1>Dashboard</h1></button>
    <button onClick={setCctv} className={`flex flex-row gap-2 items-center ${cctv ? "text-white" : "text-white/70"}`}><BiSolidCctv></BiSolidCctv><h1>CCTV Connect</h1></button>
    <button onClick={setLm} className={`flex flex-row gap-2 items-center ${lm ? "text-white" : "text-white/70"}`}><BiDesktop></BiDesktop><h1>Live Monitoring</h1></button>
    <button onClick={setAccount} className={`flex flex-row gap-2 items-center ${account ? "text-white" : "text-white/70"}`}><BiUser></BiUser><h1>Account</h1></button>
    </div>

  )
}

export default SideBar