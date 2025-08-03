'use client'

import DeleteButton from "@/Components/DeleteButton"
import Left from "@/Components/icons/Left"
import MenuItemForm from "@/Components/Layout/MenuItemForm"
import UserTabs from "@/Components/Layout/UserTabs"
import { useProfile } from "@/Components/UseProfile"
import axios from "axios"
import Link from "next/link"
import { redirect, useParams } from "next/navigation"
import { useEffect, useState } from "react"

const EditMenuPage=()=>{
   const {loading,data}=useProfile()
  
  const {id}=useParams()

    const [menuItem,setMenuItem]=useState(null)
    const [isEdited,setIsEdited]=useState(false)

    useEffect(()=>{
        fetchMenuItems()
    },[])
    const fetchMenuItems=async()=>{
      const result=await axios.get('/api/menu-items')
      const menu=result.data.menuItems.find((i)=>i._id===id)
      setMenuItem(menu)
    }
    // console.log("try",menuItem);
    const handleSubmit=async(e,data)=>{
       e.preventDefault()
       const formData={_id:id,...data}
      try {
         await axios.put('/api/menu-items',formData)
         setIsEdited(true)
         console.log("menu items created succesfully"); 
       } catch (error) {
        console.log("while submitting menu item form",error);
      }
    }
 const handleDelete=async()=>{
    await axios.delete('/api/menu-items?_id='+id)
     setIsEdited(true)
 }
    if(loading){
      return 'user info loading...'
    }
    if(!data.admin){
      return 'not an Admin'
    }
    
    if(isEdited){
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
             <MenuItemForm menuItem={menuItem} onSubmit={handleSubmit}/>
            <div className="w-full md:w-1/2 max-w-lg ">
               <div className="p-2  w-1/2 mx-auto md:mx-0 md:ml-auto ">
                <DeleteButton label={'Delete Menu'} onDelete={handleDelete} bgColor={'red-400'}/>
               </div>
            </div>
        </section>
    )
}
export default EditMenuPage