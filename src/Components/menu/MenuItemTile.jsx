'use client'
import Image from 'next/image';
const MenuItemTile=({onAddTocart,...item})=>{
   const {image,name,description,basePrice,sizes,extraIngredientPrices}=item
    return(
        <div className="bg-gray-400 flex flex-col  items-center p-4 rounded-lg hover:bg-white hover:shadow-lg hover:shadow-black/25 transition-all">
               <Image src={image}
                width={250}
                height={250}
                alt="pizza"/>
                <h4 className="font-semibold my-3 text-2xl">{name}</h4>
                <p className="text-gray-800 text-center text-xl line-clamp-2">{description}</p>
                <button className="bg-[#f13a01] text-white px-6 py-2 rounded-full my-4 cursor-pointer"
                 type='button'
                 onClick={onAddTocart}
                >
                  {(sizes.length>0 || extraIngredientPrices.length>0)?(
                    <span>Add to cart from (${basePrice})</span>
                  ):(<span>
                      Add to cart ${basePrice}
                  </span>)}
                  
                </button>
          </div>
    )
}
export default MenuItemTile