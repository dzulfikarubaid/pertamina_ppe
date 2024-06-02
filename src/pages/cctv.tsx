import React from 'react'
import { BiCamera, BiCameraHome, BiCameraMovie, BiLink } from 'react-icons/bi'
import Image from 'next/image'
function Cctv() {
  const [rstp, setRstp] = React.useState<string>('')
  const [connected, setConnected] = React.useState<boolean>(false)
  function connect(){
    console.log(rstp)
    setConnected(!connected)
  }
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <div className=' p-1 bg-black/30 rounded-2xl mt-32'>
      <Image src="/logo.png" width={175} height={175} alt="" />
      <div className='flex flex-col gap-4 justify-center items-center p-4'>
      <Image src="/cctv.png" width={200} height={200} alt="" />
      {
        connected?
        <>
        <div className='flex flex-row items-center p-2 py-1 gap-2 rounded-xl'>
      <BiCameraHome></BiCameraHome>
      <h1 className='text-sm'>Your Camera Has Been <span className='text-lime-400'>Conected</span> Succesfully!!</h1>
      </div>
       <div className='flex flex-row-reverse w-full'>
       <button onClick={connect} className='bg-blue-950 text-white p-4 py-2 rounded-lg'>Disconnect</button>
       </div>
       </>
       :
       <>
       <div className='flex flex-row items-center bg-white p-2 py-1 rounded-xl'>
      <BiLink></BiLink>
      <input onChange={(e) => setRstp(e.target.value)} value={rstp} type="password" className='p-1 rounded-lg focus:outline-none' placeholder='rstp://cameraipaddress'/></div>
       <div className='flex flex-row-reverse w-full'>
       <button onClick={connect} className='bg-blue-950 text-white p-4 py-2 rounded-lg'>Connect</button>
       </div>
       </>
      }
      </div>
     
      </div>
      </div>
  )
}

export default Cctv