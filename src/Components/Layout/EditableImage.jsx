'use client'

import axios from "axios";
import Image from "next/image";
import { useState } from "react";


const EditableImage=({link,setLink})=>{
    const [loading,setLoading]=useState(false)
    const handlefileChange=async(e)=>{
        console.log(e);
        setLoading(true)
       const files=e.target.files
       if(files.length===1){  
           const data=new FormData;
           data.set('file',files[0])
           const response=await axios.post('/api/upload',data)
           console.log("in Editable Image",response);
           
           setLink(response.data.imageUrl)
           setLoading(false)
       }
    }
    return(
        <>
        {link && (
         <Image className="rounded-lg " src={link} width={180} height={200}  alt="image"/>
        )}

        {!link && (
          <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
              No image
          </div>
        )}

          <label className="flex justify-center items-center mt-4 ">
            <input type="file" className="hidden" onChange={handlefileChange}/>
             <span className="cursor-pointer border rounded-lg px-4 py-2 hover:bg-blue-500 hover:text-white">
                {loading?'Editing..':'Edit'}
             </span>
          </label>
        </>
    )
}
export default EditableImage