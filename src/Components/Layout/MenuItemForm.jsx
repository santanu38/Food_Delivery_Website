import { useEffect, useState } from "react"
import EditableImage from "./EditableImage"
import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import MenuItemsPriceProps from "./MenuItemsPriceProps";
import axios from "axios";

const MenuItemForm=({menuItem,onSubmit})=>{
    // console.log("from MenuItemForm",menuItem);
    
        const [image,setIamge]=useState(menuItem?.image || '')
       const [menuName,setMenuName]=useState(menuItem?.name ||'')
       const [description,setDescription]=useState(menuItem?.description ||'')
       const [basePrice,setBasePrice]=useState(menuItem?.basePrice || 0)
       const [sizes,setSizes]=useState(menuItem?.sizes || [])
       const [extraIngredientPrices,
        setExtraIngredientPrices]=useState(menuItem?.extraIngredientPrices || [])
        const [category,setCategory]=useState(menuItem?.category || '')
         const [categories,setCategories]=useState([])

        useEffect(()=>{
         fetchCategories()
        },[])
        const fetchCategories=async()=>{
           const response=await axios.get('/api/categories')
           setCategories(response.data?.categories)
        }
       
    return(
        <>
        
        <form className="mt-8 w-full max-w-lg" onSubmit={(e)=>onSubmit(e,
            {image,name:menuName,description,basePrice,sizes,extraIngredientPrices,category}
            )}>
               <div className="flex gap-8 w-full " >
                  <div>
                     <EditableImage link={image} setLink={setIamge}/>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label >Menu Item</label>
                    <input className="border p-2 rounded-lg grow"
                    type="text" 
                    value={menuName}
                    onChange={(e)=>setMenuName(e.target.value)}
                    />
                            
                    <label >Descriptions</label>
                    <input className="border p-2 rounded-lg grow"
                    type="text" 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    />  
                    
                    <label>Category</label>
                    <select className="border p-2 rounded-lg grow"
                      value={category}
                     onChange={(e)=>setCategory(e.target.value)}
                    >
                      <option value="" >Select a category</option>
                      {categories?.length>0 && categories.map((cat)=>(
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>

                    <label >Base Price</label>
                    <input className="border p-2 rounded-lg grow"
                    type="text" 
                    value={basePrice}
                    onChange={(e)=>setBasePrice(e.target.value)}
                    /> 
                     <MenuItemsPriceProps
                      name={'Sizes'}
                      addLabel={'Add item size'}
                      props={sizes} 
                      setProps={setSizes}/>
                       
                      <MenuItemsPriceProps
                      name={'Extra ingredients'}
                      addLabel={'Add ingredients prices'}
                      props={extraIngredientPrices} 
                      setProps={setExtraIngredientPrices}/> 
                    <button  className="cursor-pointer px-4 py-2 rounded-lg bg-blue-500 text-white"
                    type="submit">Save</button> 
                  </div>
                  
                </div>
             </form>
        </>
    )
}
export default MenuItemForm