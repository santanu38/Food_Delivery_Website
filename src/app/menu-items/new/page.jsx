'use client'

import UserTabs from "@/Components/Layout/UserTabs"
import { useProfile } from "@/Components/UseProfile"
import axios from "axios"
import { useState } from "react"
import Link from "next/link"
import Right from "@/Components/icons/Right"
import Left from "@/Components/icons/Left"
import { redirect } from "next/navigation"
import MenuItemForm from "@/Components/Layout/MenuItemForm"

const NewMenuItem=()=>{
    const {loading,data}=useProfile()

    const [created,setCreated]=useState(false)

    const handleSubmit=async(e,data)=>{
       e.preventDefault()
       
      try {
         await axios.post('/api/menu-items',data)
         setCreated(true)
         console.log("menu items created succesfully"); 
       } catch (error) {
        console.log("while submitting menu item form",error);
      }
    }

    if(loading){
        return 'Loading User Info'
    }
    if(!data.admin){
        return 'Not an Admin'
    }
    if(created){
       redirect('/menu-items')
    }
    return(
        
        <section className="mt-8 flex flex-col justify-center items-center gap-2 ">
            <UserTabs isAdmin={true}/>
            <Link className="bg-gray-300 px-4 py-2 flex gap-1 mt-8"
                href={'/menu-items'}>
                <Left/>
                Show All Menu Items
              </Link>
             <MenuItemForm menuItem={null} onSubmit={handleSubmit}/>
        </section>
    )
}
export default NewMenuItem