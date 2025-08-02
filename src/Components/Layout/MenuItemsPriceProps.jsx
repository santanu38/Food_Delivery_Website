import { useState } from "react"
import Trash from "../icons/Trash"
import Plus from "../icons/Plus"
import ChevronUp from "../icons/ChevronUp"
import ChevronDown from "../icons/ChevronDown"

const MenuItemsPriceProps=({addLabel,name,props,setProps})=>{
      
        const [isOpen,setIsopen]=useState(false)

       const addProps=()=>{
         setProps((oldProps)=>{
            return [...oldProps,{name:'',price:0}]
         })
       }

       const editSize=(e,index,prop)=>{
         const newValue=e.target.value
         setProps((prevsizes)=>{
           const newSizes=[...prevsizes]
           newSizes[index][prop]=newValue
           return newSizes
         })
       }

      const removeProp=(index)=>{
          setProps((prevsizes)=>prevsizes.filter((val,i)=>i !==index))
      }
    return(
        <div className="bg-gray-300 p-2 rounded-lg mb-2 ">
            <button onClick={()=>setIsopen((prev)=>!prev)}
            type='button' className="flex gap-1 cursor-pointer">
              {isOpen && (
                <ChevronUp/>
              )}
              {!isOpen && (
                <ChevronDown/>
              )}
               <label className="">{name}</label>
               <span>({props?.length})</span>
            </button>
            <div className={isOpen?'block':'hidden'}>
              {props.length>0 && props.map((prop,index)=>(
                 <div key={index} className="flex gap-2 mt-2 mb-2 items-end">
                  <div>
                    <label >{name}</label>
                         <input className="border pl-2 "
                         type="text" 
                         value={prop.name}
                         onChange={(e)=>editSize(e,index,'name')}
                        />
                    </div>
                    <div>
                      <label>Price</label>
                      <input className="border pl-2"
                      type="text" 
                      value={prop.price}
                      onChange={(e)=>editSize(e,index,'price')}
                     />
                    </div>
                    <div>
                      <button className=" cursor-pointer "
                        type="button"
                        onClick={()=>removeProp(index)}
                        ><Trash/></button>
                        </div>
                 </div>
                ))}
                <button className="flex rounded-lg bg-white mx-auto p-2 cursor-pointer hover:bg-gray-400"
                type='button'
                onClick={addProps}
              >
              <Plus/>
              {addLabel} </button>
            </div>
        </div>
        
    )
}
export default MenuItemsPriceProps