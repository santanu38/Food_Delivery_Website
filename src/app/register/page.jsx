'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios from "axios"
import { useRouter } from "next/navigation"
import {signIn} from "next-auth/react";

const Register=()=>{
   const [username,setUsername]=useState('')
   const [email,setEmail]=useState('')
   const [password,setPassword]=useState('')
   const [emailError,setEmailError]=useState('')
   const [passwordError,setPasswordError]=useState('')
   
  const router=useRouter()
   const handleSubmit=async (e)=>{
       e.preventDefault()
       const formData={
         username,
         email,
         password
       }
       const result=signUpSchema.safeParse(formData)
       if(!result.success){
         
         console.log(result.error.format());
         const validationError=result.error.format()
         setEmailError(validationError.email?._errors[0] || '')
         setPasswordError(validationError.password?._errors[0] || '')
         return
       }
       
      try {
         await axios.post('api/sign-up',formData)
         console.log("regsiter succesfully");
         router.replace(`/login`)
         
      } catch (error) {
         console.log("error while sign-up",error);
         
      }finally{
         setEmail('')
         setPassword('')
         setEmailError('')
         setPasswordError('')
      }
   }
    return(
      <div className="flex justify-center items-center mt-14">
          <div className="bg-gray-300 p-10 shadow-2xl">
             <h1 className="font-semibold text-4xl text-center">Sign Up</h1>
             <div className="flex mt-6 text-xl gap-2 ">
                <h2>already hava an account ?</h2>
                <Link href={'/login'} className="text-blue-500">Login</Link>
             </div>
             <form className="flex flex-col gap-6 mt-10" onSubmit={handleSubmit}>
                <input type="text" 
                  placeholder="Username"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  className={`border p-3 ${emailError?"border-red-500":'border'}`}
                />
                
                <input type="Email" 
                  placeholder="Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className={`border p-3 ${emailError?"border-red-500":'border'}`}
                />
                {emailError && <span className="text-red-500 ">{emailError}</span>}
                <input type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className={`border p-3 ${passwordError?'border-red-500':'border'}`}
                />
                {passwordError && <span className='text-red-500 '>{passwordError}</span>}
                <button type="submit"
                className="bg-blue-500 text-white p-3 cursor-pointer hover:bg-blue-700">
                Sign Up</button>
                <h1 className="text-center">Or</h1>
                <button onClick={()=>signIn('google',{ callbackUrl: "/"})}
                className="flex gap-3 justify-center items-center cursor-pointer border px-4 py-2  hover:bg-blue-300 hover:text-white
                ">Sign In with
                   <Image
                    src="/google.png"
                    alt="Google"
                    width={20}
                    height={20}
                    className="object-contain"
                   />
                </button>
             </form>
   
          </div>
      </div>

   )

}
export default Register