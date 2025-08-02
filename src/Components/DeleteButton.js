import { useState } from "react"

const DeleteButton=({label,onDelete,bgColor})=>{
   const [showConfirm,setShowConfirm]=useState(false)
    
   if(showConfirm){
    return(
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
               <div>Are you sure you want to delete?</div>
               <div className="flex gap-4 justify-center items-center mt-2">
                <button type='button'
                className="bg-gray-400 px-4 py-2 text-white cursor-pointer rounded-lg"
                 onClick={()=>setShowConfirm(false)
                 }
                >
                  Cancel
                </button >
                <button type="button"
                className="bg-red-500 px-4 py-2 rounded-lg cursor-pointer text-white"
                 onClick={()=>{
                    setShowConfirm(false)
                    onDelete()
                 }}
                >
                Yes,&nbsp;delete!
                </button>
               </div>
            </div>
        </div>
    )
   }
    return(
    <button type="button"
    className={`bg-${bgColor} px-4 py-2 rounded-lg cursor-pointer hover:bg-red-400 hover:text-white`}
     onClick={()=>setShowConfirm(true)}
    >{label}</button>
  )
}
export default DeleteButton