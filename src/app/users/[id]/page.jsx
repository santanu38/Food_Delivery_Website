'use client'
import UserForm from "@/Components/Layout/userForm"
import UserTabs from "@/Components/Layout/UserTabs"
import { useProfile } from "@/Components/UseProfile"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const UserEditPage=()=>{
    const {loading,data}=useProfile()
    const {id}=useParams()

    const [user,setUser]=useState(null)
   
    useEffect(()=>{
      fecthUser()
    },[])

    const fecthUser=async()=>{
      const response=await axios.get('/api/profile?_id='+id)
      setUser(response.data)
    }
    console.log('from edit user',user);
    
    
    const handleSubmit=async(e,data)=>{
         e.preventDefault()
         const formData={_id:id,...data}
         await axios.put('/api/profile',formData)
          fecthUser()
    }
    if(loading){
        return 'loading user info..'
    }
    if(!data.admin){
        return 'not an admin'
    }
    return(
        <section className="flex flex-col justify-center items-center mt-8 ">
           <UserTabs isAdmin={true}/>
           <UserForm user={user} onSave={handleSubmit}/>
        </section>
    )
}
export default UserEditPage