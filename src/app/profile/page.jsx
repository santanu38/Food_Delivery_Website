'use client'
import EditableImage from "@/Components/Layout/EditableImage"
import UserForm from "@/Components/Layout/userForm"
import UserTabs from "@/Components/Layout/UserTabs"
import axios from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

const Profile=()=>{
     const session=useSession()
   
     const [user,setUser]=useState(null)
     const [isAdmin,setIsAdmin]=useState(false)
     const [message,setMessage]=useState('')
     const [loading,setLoading]=useState(false)
     const {status}=session
    
    useEffect(()=>{
         if(status==='authenticated'){
             fetchUserInfo()
         }  
    },[session,status])

    const fetchUserInfo=async()=>{
        const response=await axios.get('/api/profile')
        const user=response.data
        setUser(user)
        setIsAdmin(user.admin)
    }
    console.log(user);
  
    const handleSubmit=async (e,data)=>{
      // console.log("from profile",data);
      setLoading(true)
      e.preventDefault()
      setMessage('')
      try {
      const res=await axios.put('/api/profile',data)
        if(res.status===200){
            setMessage("Profile updated succesfully")
        }else{
            setMessage("Failed to update profile ")
        }
      } catch (error) {
         console.log("error while profile update",error);
      }
    }

    
    

    if(status==='loading'){
        return <p className="text-center mt-10">Loading session...</p>
    }
    if(status==='unauthenticated'){
      return redirect('/login')
    }
    return(
        <div className=" flex flex-col justify-center items-center mt-20">
          <UserTabs isAdmin={isAdmin}/>
            {/* <h1 className="font-semibold text-4xl text-center mt-4">Profile</h1> */}
            <div className="flex gap-6 mt-8">
              {user && <UserForm
              user={user}
              onSave={handleSubmit}
              />}
              {message && message.length>0 && (
                <span className="text-red">{message}</span>
              )}
            </div>
        </div>
    )
}
export default Profile