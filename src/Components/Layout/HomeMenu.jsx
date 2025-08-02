'use client'
import Image from "next/image"
import MenuItems from "../menu/MenuItems"
import SectionHeader from "./SectionHeaders"
import { useEffect, useState } from "react"
import axios from "axios"

const HomeMenu=()=>{
  const [bestSeller,setBestSelller]=useState([])
  useEffect(()=>{
    fetchMenuItems()
  },[])
  const fetchMenuItems=async()=>{
    const response=await axios.get('/api/menu-items')
    const menuItems=response.data.menuItems
    // console.log(menuItems);
    setBestSelller(menuItems.slice(-3))
  }
   return(
     <section className=" ">
        <div className="absolute  left-0 right-0 w-full justify-start">
            <div className="absolute left-0 -top-[100px]">
            <Image src="/sallad1.png" width={109} height={189} alt="sallad1"/>
           </div>
          <div className="absolute right-0 -top-[200px]">
            <Image src="/sallad2.png" width={109} height={189} alt="sallad2"/>
          </div>
        </div>
        <SectionHeader 
         subheader="CHECK OUT"
         mainheader="OUR BEST SELLERS"
        />
        <div className="grid md:grid-cols-3 gap-4 pl-20 pr-12 mt-10">
          {bestSeller.length>0 && bestSeller.map((item)=>(
            <MenuItems key={item._id}{...item}/>
          ))}
           
        </div>
     </section>
   )
}
export default HomeMenu