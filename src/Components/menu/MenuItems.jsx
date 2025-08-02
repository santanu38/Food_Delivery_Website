'use client'
import { cartContext } from '@/context/AppProvider';
import Image from 'next/image';
import { useContext, useState } from 'react';
import MenuItemTile from './MenuItemTile';

const MenuItems=(menuItem)=>{
   const {name,image,description,basePrice,sizes, extraIngredientPrices}=menuItem
   const {addToCart}=useContext(cartContext)

   const [showPopup,setShowPopup]=useState(false)
   const [selectedSize,setSelectedSize]=useState(sizes[0] || null)
   const [selectedExtras,setSelectedExtras]=useState([])

   const handleAddToCartButtonClik=()=>{
      const hasOptions=sizes.length>0 || extraIngredientPrices.length>0
      if(hasOptions && !showPopup){
        setShowPopup(true)
        return
      }
      addToCart(menuItem,selectedSize,selectedExtras)
      setShowPopup(false)
   }
   const handleSelectedExtras=(e,extra)=>{
    //  console.log(e);
    const checked=e.target.checked
    if(checked){
      setSelectedExtras((prev)=>[...prev,extra])
    }else{
      setSelectedExtras((prev)=>prev.filter((e)=>e.name !==extra.name))
    }
     
   }
   let selectedPrice=basePrice
   if(selectedSize){
     selectedPrice+=selectedSize.price
   }
   if(selectedExtras){
     for(const extras of selectedExtras){
       selectedPrice+=extras.price
     }
   }

   return(
     <>
      {showPopup && (
         <div className='bg-black/38 fixed inset-0 flex items-center justify-center'
           onClick={()=>setShowPopup(false)}
         >
           <div className='bg-white p-4 rounded-lg max-w-md overflow-y-auto h-120'
            onClick={(e)=>e.stopPropagation()}
           >
               <Image src={image} className='mx-auto'
                width={250}
                height={250}
                alt="pizza"/>
                <h2 className='font-bold text-2xl text-center mb-2'>{name}</h2>
                <p className='text-center text-gray-700 mb-2'>{description}</p>
                {sizes?.length>0 &&(
                  <div className=' rounded-lg p-2'>
                     <h3 className='text-center text-gray-800 mb-2 text-xl'>pick your size</h3>
                     {sizes.map((size)=>(
                       <label key={size._id}
                       className='flex items-center gap-2 p-4 border mb-1 rounded-lg'>
                         <input type='radio'name='size'
                         onClick={()=>setSelectedSize(size)}
                         checked={selectedSize?.name === size.name}
                         /> {size.name} ${basePrice+size.price}
                       </label>
                     ))}
                  </div>
                )}
                {extraIngredientPrices?.length>0 &&(
                  <div className=' rounded-lg p-2'>
                     <h3 className='text-center text-gray-800 mb-2 text-xl'>pick your ingredient</h3>
                     {/* {JSON.stringify(selectedExtras)} */}
                     {extraIngredientPrices.map((extra)=>(
                       <label className='flex items-center gap-2 p-3 border mb-1 rounded-lg'>
                         <input type='checkbox'name={extra.name}
                          onClick={(e)=>handleSelectedExtras(e,extra)}
                         /> {extra.name} +${extra.price}
                       </label>
                     ))}
                  </div>
                )}
                <button className='bg-[#f13a01] px-4 py-2 rounded-lg 
                mx-auto w-full text-white cursor-pointer sticky bottom-2 mb-2'
                type='button'
                onClick={handleAddToCartButtonClik}
                >Add to cart ${selectedPrice}</button>
                <button className='bg-gray-700 px-4 py-2 rounded-lg mt-2
                mx-auto w-full text-white cursor-pointer '
                type='button'
                onClick={()=>setShowPopup(false)}
                >Cancel</button>
           </div>
         </div>
      )}
     <MenuItemTile onAddTocart={handleAddToCartButtonClik} {...menuItem}/> 
     </>
   )
}
export default MenuItems