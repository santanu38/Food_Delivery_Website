'use client'
import Image from "next/image"
import React from "react"
import Right from "../icons/Right"
import Link from "next/link"

const Hero=()=>{
   return(
    <section className="bg-white md:mt-4 pl-2 md:pl-20 pr-2 md:pr-10 flex flex-col md:flex-row pt-8 ">
       <div className="py-10  md:py-12  ">
         <h1 className="font-bold text-4xl md:text-6xl text-black leading-normal">
            Everything
          is better<br />
          with a&nbsp;
          <span className="text-red-600">Pizza</span>
         </h1>
         <p className="my-6 text-gray-500 text-sm md:text-2xl leading-normal">
            Pizza is the missing piece that makes every day complete,<br/> a simple yet delicious joy in life
         </p>
         <div className="flex gap-6 text-sm mt-10 text-white">
            <Link className=" flex justify-center uppercase items-center gap-2 px-4 py-2 bg-orange-700 font-bold rounded-full "
            href={'/menu'}>
             <button className="flex">
                Order now
                <Right/>
            </button>
            </Link>
            <button className=" flex gap-2 font-semibold bg-gray-600 px-6 py-4 rounded-full">
               Learn more
               <Right/>
            </button>
         </div>
       </div>
       <div className=" ml-0 md:ml-50 ">
        <Image
         src="/pizza.png"
         width={500}
         height={500}
         objectFit="contain"
         alt="pizza"
         />
       </div>
    </section>
   )
}
export default Hero