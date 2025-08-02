'use client'

import { SessionProvider } from "next-auth/react"
import { createContext, useEffect, useState } from "react";

export function cartProductPrice(cartProduct){
   let price=cartProduct.basePrice;
   if(cartProduct.size){
     price+=cartProduct.size.price
   }
   if(cartProduct.extras?.length>0){
     for(const extra of cartProduct.extras){
       price+=extra.price
     }
   }
   return price
}
export const cartContext=createContext({})

export default function AppProvider({ children,}) {
  const [cartProduct,setCartProduct]=useState([])

  const ls=typeof window !=='undefined'? window.localStorage :null

  useEffect(()=>{
   if(ls && ls.getItem('cart')){
     setCartProduct(JSON.parse(ls.getItem('cart')))
   }
  },[])

  function clearCart(){
    setCartProduct([])
    saveProductToLocalStorage([])
  }

  function removeCartProduct(indexToRemove){
     setCartProduct((prevCartproduct)=>{
      const newCartProduct=prevCartproduct.filter((val,index)=>index !==indexToRemove)
      saveProductToLocalStorage(newCartProduct)
      return newCartProduct;
     })
  }

  function saveProductToLocalStorage(cartProduct){
    if(ls){
      ls.setItem('cart',JSON.stringify(cartProduct))
    }
  }

  function addToCart(product,size=null,extras=[]){
     setCartProduct((prevProduct)=>{
       const cartProduct={...product,size,extras}
       const newProduct=[...prevProduct,cartProduct]
       saveProductToLocalStorage(newProduct)
       return newProduct
     })
  }
  return (
    <SessionProvider>
      <cartContext.Provider value={{
        cartProduct,setCartProduct,addToCart,clearCart, removeCartProduct
      }}>
         {children}
      </cartContext.Provider>
    </SessionProvider>
  );
}