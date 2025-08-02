'use client'
import UserTabs from "@/Components/Layout/UserTabs"
import { useProfile } from "@/Components/UseProfile"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

const UsersPage=()=>{
    const {loading,data}=useProfile()
    const [users,setUsers]=useState([])

    useEffect(()=>{
     fetchUsers()
    },[])
    const fetchUsers=async()=>{
      const response=await axios.get('/api/user')
      console.log("its a respnse" ,response.data);
      
      setUsers(response.data?.users)
    }
    console.log("from user page",users);
    
    if(loading){
        return 'loading user info..'
    }
    if(!data.admin){
        return 'not an admin'
    }
    return(
        <section className="mt-8 flex flex-col justify-center items-center gap-2 ">
        <UserTabs isAdmin={true}/>
        <h1>Users page</h1>
        <div className="max-w-lg ">
          {users?.length>0 && users.map((user)=>(
            <div key={user._id} className="mt-4 flex gap-4 bg-gray-300 p-3 rounded-lg ">
                <h1>{user.username || user.name }</h1>
                {!(user.name || user.username) && (<h1 className="italic">No Name</h1>)}
                <h1>{user.email}</h1>
                <div className="ml-auto">
                    <Link className="bg-white px-4 py-2 rounded-lg"
                    href={'/users/'+user._id}
                    >
                     Edit
                    </Link>
                </div>
            </div>
          ))}
     
        </div>
        </section>
    )
}
export default UsersPage