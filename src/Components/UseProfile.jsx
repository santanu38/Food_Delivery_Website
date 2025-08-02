'use client'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"


export const useProfile=()=>{
   const session=useSession()
  const [data,setData]=useState(null)
  const [loading,setLoading]=useState(true)
   useEffect(()=>{
    
     fetchUserInfo()
    
   },[session])
   const fetchUserInfo=async()=>{
       setLoading(true)
    try {
        const response=await axios.get('/api/profile')
        const user=response.data
        setData(user)
     } catch (error) {
        console.log("error in categories page",error); 
     }finally{
       setLoading(false)
     }
   }
 
   return {loading,data}
}
