'use client'
import React, { useState } from "react" 
import Link from "next/link"
import Image from "next/image"
import {signIn} from "next-auth/react";
import { signInSchema } from "@/schemas/signInSchema";
import { toast } from "sonner"


const Login=()=>{
  const [email,setEmail]=useState('')
     const [password,setPassword]=useState('')
     const [emailError,setEmailError]=useState('')
     const [passwordError,setPasswordError]=useState('')

     const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData={
          email,
          password
        }
        const result=signInSchema.safeParse(formData)
         if(!result.success){
         
            console.log(result.error.format());
            const validationError=result.error.format()
            setEmailError(validationError.email?._errors[0] || '')
            setPasswordError(validationError.password?._errors[0] || '')
            return
         }
        const res=await signIn('credentials',{
         callbackUrl: "/",
         email:formData.email,
         password:formData.password
      })
      if(res?.error){
         if(res.error==='CredentialsSignin'){
            toast('Login Failed',{
             description: 'Incorrect username or password',
            })
         }else{
           toast('Error',{
            description: result.error,
           })
         }
      }
   }
    return(
     <div className="flex justify-center items-center mt-14">
          <div className="bg-gray-300 p-10 shadow-2xl">
             <h1 className="font-semibold text-4xl text-center">Login</h1>
             <div className="flex mt-6 text-xl gap-2 ">
                <h2>Don't  have an account ?</h2>
                <Link href={'/register'} className="text-blue-500">Sign Up</Link>
             </div>
             <form className="flex flex-col gap-6 mt-10" onSubmit={handleSubmit} >
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
                Login</button>
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
export default Login