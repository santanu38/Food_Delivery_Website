'use client'

import SectionHeader from "@/Components/Layout/SectionHeaders"
import MenuItems from "@/Components/menu/MenuItems"
import axios from "axios"
import { useEffect, useState } from "react"

const MenuPage=()=>{
    const [categories,setCategories]=useState([])
    const [menuItems,setMenuItems]=useState([])
    
    useEffect(()=>{
      fetchCategories()
      fetchMenuItems()
    },[])
    const fetchCategories=async ()=>{
        const response=await axios.get('/api/categories')
        setCategories(response.data?.categories)
    }
    const fetchMenuItems=async()=>{
      const response=await axios.get('/api/menu-items')
      setMenuItems(response.data?.menuItems)
    }

    return(
        <section className="mt-8">
           
            {categories && categories.length>0 && categories.map((cat)=>(
               <div key={cat._id}>
                 <div>
                    <SectionHeader mainheader={cat.name}/>
                 </div>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 mb-10">
                    {menuItems.filter((menu)=>menu.category===cat._id).map((item)=>(
                     <MenuItems {...item} key={item._id}/>
                    ))}
                   </div>
               </div>
            ))}
        </section>
    )
}
export default MenuPage