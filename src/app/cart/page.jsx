'use client'

import Trash from "@/Components/icons/Trash"
import AdressInputs from "@/Components/Layout/AdressInputs"
import SectionHeader from "@/Components/Layout/SectionHeaders"
import CartProduct from "@/Components/menu/CartProduct"
import { useProfile } from "@/Components/UseProfile"
import { cartContext, cartProductPrice } from "@/context/AppProvider"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"

const CartPage=()=>{
    const {cartProduct,removeCartProduct}=useContext(cartContext)
    const {data:profileData}=useProfile()
    const [address,setAddress]=useState({})
    // console.log(cartProduct);
    
    useEffect(()=>{
      if(profileData?.city){
       const {phone,streetAdress,postalCode,city,country}=profileData
       const formAddress={
        phone,
        streetAdress,
        postalCode,
        city,
        country
       };
       setAddress(formAddress)
      }

    },[profileData])
    let subtotal=0;
    for(const p of cartProduct){
       subtotal+=cartProductPrice(p)
    }

    return(
        <section className="mt-8 mb-8 flex flex-col items-center justify-center">
         <div>
            <SectionHeader mainheader="Cart"/> 
         </div>
         <div className="mt-8 flex gap-20">
            <div className="cartpordut ">
                {cartProduct.length===0 && (
                  <div>No products in your shopping cart</div>
                )}
                {cartProduct.length>0 && cartProduct.map((product,index)=>(
                  <CartProduct 
                   key={index}
                  product={product} 
                  index={index}
                  onRemove={removeCartProduct}
                  />
                ))}
                <h1 className="text-center font-semibold text-xl">Total {cartProduct.length} Products</h1>
               
                <div className="total flex justify-end-safe items-center text-lg">
                  <div className="text-gray-700 text-lg">
                     Subtotal :<br/>
                     Delivery :<br/>
                     Total :
                  </div>
                  <div className="text-lg font-semibold">
                    ${subtotal}<br/>
                    $5<br/>
                     ${subtotal+5}
                  </div>
                </div>
            </div>
            <div className="mt-8 bg-gray-300 p-4 rounded-lg max-h-screen">
              <h2 className="text-xl font-semi-bold text-center">Checkout</h2>
              <form className="flex flex-col w-md mt-4 gap-3">
                 <AdressInputs
                  addressprops={address}
                 />
                  <button className="bg-[#f13a01] text-white mt-4 px-4 py-2 rounded-lg cursor-pointer"
                  type="submit">
                  Pay ${subtotal+5}
                  </button>
              </form>
            </div>
         </div>
        </section>
    )
}
export default CartPage