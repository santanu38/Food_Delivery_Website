'use client'

import Right from "@/Components/icons/Right"
import UserTabs from "@/Components/Layout/UserTabs"
import { useProfile } from "@/Components/UseProfile"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"


const MenuItemsPage=()=>{
    const {loading,data}=useProfile()
    const [menuItems,setMenuItems]=useState([])

    useEffect(()=>{
     fetchMenuItems()
    },[])
    const fetchMenuItems=async()=>{
      const result=await axios.get('/api/menu-items')
      setMenuItems(result.data.menuItems)
    }
    if(loading){
        return 'Loading user info...'
    }
    if(!data.admin){
        return 'Not an Admin'
    }
    console.log("from menu-item",menuItems);
    
    return(
        <section className="mt-8 flex flex-col justify-center items-center gap-2">
           <UserTabs isAdmin={true}/>
           <div className="mt-8">
             <Link className="bg-gray-300 px-4 py-2 flex gap-1"
                href={'/menu-items/new'}>
                Create New Menu
                <Right/>
              </Link>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 p-2 mt-4 gap-4">
            {menuItems.length>0 && menuItems.map((item,index)=>(
               <Link key={index} href={'/menu-items/edit/'+item._id} className="bg-gray-300 p-4 hover:shadow-lg transition-all duration-300">
                <div className="">
                   <Image src={item.image} alt='' width={200} height={200} className="rounded-lg text-center mx-auto"/>
                </div>
                <div className="text-center mt-2 font-semibold text-xl">
                  {item.name}
                </div>
                <div className="font-serif">
                    {item.description}
                </div>
               </Link>
            ))}
           </div>
        </section>
    )
}

export default MenuItemsPage