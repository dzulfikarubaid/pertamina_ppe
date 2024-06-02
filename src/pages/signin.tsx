import { auth } from '@/firebase/connect';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [authUser, setAuthUser] = React.useState<any>("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
  async function signIn() {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false)
        console.log(user)
       router.push("/home")

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setLoading(false)

        console.log(errorCode, errorMessage)
        if(errorCode === "auth/invalid-credential"){
          setErrorEmail("Invalid email or password")
          setErrorPassword("Invalid email or password")
        }
        else if(errorCode === "auth/invalid-email"){
          setErrorEmail("Invalid email")
        }
        else if(errorCode === "auth/weak-password"){
          setErrorPassword("Password must be at least 6 characters")
        }
      });
  }

  return (
    <div className='flex flex-row'>
    <img src="gambar.png" width={720} alt="" />
    <div className='flex flex-col justify-start items-center'>
    <img className='h-[250px]' src="logo.png" alt="" />
    <div className='flex flex-col justify-center items-center gap-6'>
    <h1 className='text-4xl text-blue-900 font-semibold'>Sign In</h1>
    <h1>Welcome back! Please enter your details.</h1>
    <div className='flex flex-col justify-center items-start gap-4 text-left'>
    <label htmlFor="email">Email</label>
    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter your email' className='p-2 rounded-xl border-[1px] w-full'/>
    <p className='text-red-500'>{errorEmail}</p>
    <label htmlFor="password">Password</label>
    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter your password' className='p-2 rounded-xl border-[1px] w-full'/>
    <p className='text-red-500'>{errorPassword}</p>
    {!loading?
              <button onClick={signIn} className='bg-blue-900 text-white p-4 py-2 rounded-lg w-full text-center'>Sign In</button>
              :
              <button disabled className='bg-blue-900 text-white p-4 py-2 rounded-lg w-full text-center'>Loading...</button>
              }
    <h1>Don’t have an account? <Link href="/signup" className='text-blue-950 text-center'>Sign Up</Link></h1>
    </div>
    </div>
    </div>
    </div>
  )
}

export default SignIn