import React, { useContext } from 'react'
import { BiCamera, BiCctv, BiDesktop, BiSolidCctv, BiSolidDashboard, BiUser } from 'react-icons/bi'
import AppContext from './context';

function SideBar() {
    const { dashboard, setDashboard, cctv, setCctv, lm, setLm } = useContext(AppContext);
    function Active(variable:String){
        console.log(variable)
        if (variable === "dashboard"){
            setCctv(false)
            setDashboard(true)
            setLm(false)
        }
        else if (variable === "cctv"){
            setCctv(true)
            setDashboard(false)
            setLm(false)
        }
        else if(variable === "lm"){
            setCctv(false)
            setDashboard(false)
            setLm(true)
        }

    }
  return (
    <div className='w-[225px] h-screen bg-black flex flex-col gap-2  p-4'>
    <button onClick={()=>Active("dashboard")} className={`flex flex-row gap-2 items-center ${dashboard ? "text-white" : "text-white/70"}`}><BiSolidDashboard></BiSolidDashboard><h1>Dashboard</h1></button>
    <button onClick={()=>{Active("cctv")}} className={`flex flex-row gap-2 items-center ${cctv ? "text-white" : "text-white/70"}`}><BiSolidCctv></BiSolidCctv><h1>CCTV Connect</h1></button>
    <button onClick={()=>{Active("lm")}} className={`flex flex-row gap-2 items-center ${lm ? "text-white" : "text-white/70"}`}><BiDesktop></BiDesktop><h1>Live Monitoring</h1></button>
    </div>
  )
}

export default SideBar