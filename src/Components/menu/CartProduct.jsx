'use client'
import { cartProductPrice } from "@/context/AppProvider"
import Trash from "../icons/Trash"
import Image from "next/image"


const CartProduct=({product,index,onRemove})=>{
    return(
        <div className=" flex justify-center items-center gap-4">
            <div>
                <Image src={product.image} className='mx-auto'
                width={250}
                height={250}
                alt="pizza"
            />
            </div>
            <div className="mr-4">
                <h1 className="font-semibold text-lg">{product.name}</h1>
                {product.size && (
                <div>
                    Size : <span>{product.size.name}</span>
                </div>
                )}
                {product.extras.length>0 && product.extras.map((extra,ind)=>(
                    <div key={ind}
                    className=" text-gray-700">
                    {extra.name} ${extra.price}
                    </div>
                ))}
            </div>
            
            <div className="flex gap-4  ml-auto ">
                <div className="text-lg font-semibold">
                ${cartProductPrice(product)}
                </div>
            <div>
                <button type="button" 
                onClick={()=>onRemove(index)}
                >
                 <Trash/>
                </button>
            </div>
            </div>
        </div>
    )
}
export default CartProduct