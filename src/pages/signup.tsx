import React, { useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/connect';
import Link from 'next/link';
import { useRouter } from 'next/router';
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
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
  async function signUp() {

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name
        }).then(() => {
          console.log(user)
         router.push("/home")

      })})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage)
        if(errorCode === "auth/email-already-in-use"){
          setErrorEmail("Email already in use")
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
      <div className='w-full h-full'>
        <div className='flex flex-row-reverse'>
          <img width={175} src="logo.png" alt="" />
        </div>
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <div className='flex flex-col justify-center items-start gap-10 w-fit '>
            <h1 className='text-4xl text-blue-900 font-semibold'>Sign Up</h1>

            <div className='flex flex-col gap-4 '>
              <label htmlFor="name">Name</label>
              <input type="text" placeholder='Enter your name' className='p-2 rounded-xl border-[1px] w-full' value={name} onChange={(e) => setName(e.target.value)}/>
              <label htmlFor="email">Email</label>
              <input type="text" placeholder='Enter your email' className='p-2 rounded-xl border-[1px] w-full' value={email} onChange={(e) => setEmail(e.target.value)}/>
              <h1 className='text-red-500'>{errorEmail}</h1>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder='Create password' className='p-2 rounded-xl border-[1px] w-full' value={password} onChange={(e) => setPassword(e.target.value)} />
              <h1 className='text-red-500'>{errorPassword}</h1>
              <label htmlFor="retype">Retype Password</label>
              <input type="password" placeholder='Retype password' className='p-2 rounded-xl border-[1px] w-full' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

              <h1 className='text-red-500'>{confirmPassword !== password ? "Password does not match" : ""}</h1>

              <button onClick={signUp} className='bg-blue-900 text-white p-4 py-2 rounded-lg w-full text-center'>Sign Up</button>
              <h1>Already have an account? <Link href="/signin" className='text-blue-950'>Sign In</Link></h1>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default SignUp;
