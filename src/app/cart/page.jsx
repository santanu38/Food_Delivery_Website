'use client'

import Trash from "@/Components/icons/Trash"
import AdressInputs from "@/Components/Layout/AdressInputs"
import SectionHeader from "@/Components/Layout/SectionHeaders"
import CartProduct from "@/Components/menu/CartProduct"
import { useProfile } from "@/Components/UseProfile"
import { cartContext, cartProductPrice } from "@/context/AppProvider"
import axios from "axios"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import Script from 'next/script';

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

    const handleCheckout=async (e)=>{
      e.preventDefault()
      const response=await axios.post('/api/checkout',{
        cartProduct,
        address
      })
      const data=response.data
      const options={
        key:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:data.amount,
        currency:data.currency,
        name:"Pizaa web",
        description:"order payment",
        order_id:data.id,
        handler:async function (response){

        },
        prefill: {
         email: profileData.email,
        },
        theme: {
          color: "#f13a01",
        },
      }
      const rzp=new window.Razorpay(options)
      rzp.open()
    }
    return(
        <> 
          <Script
            id="razorpay-checkout-js"
            src="https://checkout.razorpay.com/v1/checkout.js"
          />
          <section className="mt-8 mb-8 flex flex-col items-center justify-center">
          <div>
              <SectionHeader mainheader="Cart"/> 
          </div>
          <div className="mt-8 flex flex-col md:flex-row gap-20">
              <div className="cartpordut p-4 md:p-0 ">
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
                  <h1 className="text-center font-semibold text-xl mt-4">Total {cartProduct.length} Products</h1>
                
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
              <div className="mt-8 ml-4 mr-4 md:ml-0 md:mr-0 bg-gray-300 p-4 rounded-lg max-h-screen">
                <h2 className="text-xl font-semi-bold text-center">Checkout</h2>
                <form className="flex flex-col md:w-md mt-4 gap-3" onSubmit={handleCheckout}>
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
        </>
    )
}
export default CartPage