'use client'
import { cartContext } from "@/context/AppProvider";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import ShoppingCart from "../icons/ShoppingCart";
import MenuBar from "../icons/MenuBar";

function AuthLink({status,username}){
  if(status==="authenticated"){
    return(
      <>
        <Link href={'/profile'}>Hello:{username}</Link>
        <button  onClick={()=>signOut()}
        className="bg-[#f13a01] text-white px-8 py-2 rounded-full">Logout</button>
       </>
    )
  }
  if(status !=="authenticated"){
    return (
      <>
        <Link href={'/login'} className="bg-[#f13a01] text-white px-8 py-2 rounded-full">Login</Link>
        <Link href={'/register'} className="bg-[#f13a01] text-white px-8 py-2 rounded-full">Register</Link>
      </>
    )
  }
}
const Header=()=>{
  const session=useSession()
  console.log(session);
  const status=session.status
  const userData=session.data?.user
  const {cartProduct}=useContext(cartContext)
  let userName=userData?.username || userData?.email
  if(userName && userName.includes(' ')){
    userName=userName.split(' ')[0]
  }
  const [mobileNavOpen,setMobileNavOpen]=useState(false)
  
    return(
       <header className="sticky top-0 z-50 bg-white w-full p-4">
       <div className="md:hidden flex items-center justify-between">
          <Link href={'/'}
           className="text-[#f13a01] font-extrabold text-2xl"
          >ST PIZZA</Link>
          <div>
            <Link href={'/cart'} className="relative">
             <ShoppingCart/>
             {cartProduct.length>0 && (
              <span className="absolute -top-2 -right-2
              bg-[#f13a01] text-white rounded-full py-1 px-1 leading-3">{cartProduct.length}</span>
             )}
            </Link>
          </div>
          <button className="p-1 border"
          onClick={()=>setMobileNavOpen((prev)=>!prev)}
          >
              <MenuBar/>
            </button>
       </div>
     {mobileNavOpen && (
       <div className="md:hidden bg-gray-300 flex flex-col mt-2 text-xl gap-2 p-2">
          <Link href={'/'} className="focus:text-[#f13a01]">Home</Link>
          <Link href={'/menu'} className="focus:text-[#f13a01]">Menu</Link>
          <Link href={'/#about'} className="focus:text-[#f13a01]">About</Link>
          <Link href={'/#contact'} className="focus:text-[#f13a01]">Contact</Link>
          <AuthLink status={status} username={userName}/>
       </div>
     )}


        <div className="hidden md:flex sticky top-0 z-10  items-center justify-between"
        >
           <Link href={'/'}
           className="text-[#f13a01] font-extrabold text-2xl"
          >ST PIZZA</Link>
          <nav className="flex items-center gap-6 font-semibold mx-auto text-2xl ">
           
            <Link href={'/'} className="hover:text-[#f13a01]">Home</Link>
            <Link href={'/menu'} className="hover:text-[#f13a01]">Menu</Link>
            <Link href={'/#about'} className="hover:text-[#f13a01]">About</Link>
            <Link href={'/#contact'} className="hover:text-[#f13a01]">Contact</Link>
            
          </nav>
          <nav className="flex items-center justify-center gap-3 mr-4">
            <AuthLink status={status} username={userName}/>
              {status==='authenticated' && (
                <Link href={'/cart'} className="relative">
                <ShoppingCart/> 
              {cartProduct.length>0 &&(
                <span className="absolute -top-2 -right-3 bg-[#f13a01] text-white px-1 py-1 rounded-full text-xs leading-3">
                  {cartProduct.length}
                </span>
              )}
              </Link>
              )}
          </nav>
        </div>
       </header>
    )
}
export default Header