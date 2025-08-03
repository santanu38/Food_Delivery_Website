'use client'

import DeleteButton from "@/Components/DeleteButton"
import UserTabs from "@/Components/Layout/UserTabs"
import { useProfile } from "@/Components/UseProfile"
import axios from "axios"
import { useEffect, useState } from "react"


const CategoriesPage=()=>{
    const [categoryName,setCategoryName]=useState('')
    const [message,setMessage]=useState('')
    const [categories,setCategories]=useState([])
    const [editedCategory,setEditedCategory]=useState(null)

    const {loading:profileLoading,data:profileData}=useProfile()

    useEffect(()=>{
       fetchCategories()
    },[])
    const fetchCategories=async()=>{
       const response=await axios.get('/api/categories')
       setCategories(response.data?.categories)
    }

    console.log(categories);
    
   if(profileLoading){
     return 'Loading user Info'
    }
   if(!profileData.admin){
    return 'Not an Admin'
   }
   const handleSubmit=async(e)=>{
     e.preventDefault()
     try {
        if(editedCategory){
          // console.log("editedCategory",editedCategory.name);
          const data={name:categoryName}
          data._id=editedCategory._id
          const res=await axios.put('/api/categories',data)

          setCategoryName('')
          if(res.status===200) setMessage("category updated succesfully")
          else setMessage("failed to update category ")//todo->toaster use
           fetchCategories()
           setEditedCategory(null)
        }else{
          const res=await axios.post('/api/categories',{name:categoryName})
          fetchCategories()
          setCategoryName('')
          if(res.status===200) setMessage("new category created succesfully")
         else setMessage("failed to create new category ")//todo->toaster use
        }
     } catch (error) {
        console.log("error while create new category",error); 
     }finally{
        setMessage('')
     }
   }

   const handleDelete=async(_id)=>{
     await axios.delete('/api/categories?_id='+_id)
      fetchCategories()
   }
    return(
        <section className="mt-8 max-w-lg mx-auto flex flex-col items-center justify-center ">
            <UserTabs isAdmin={true}/>
            <form onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-4 justify-center items-center">
                <label className="mx-auto">
                  {editedCategory?'Update category':'New categoy Name'}
                  {editedCategory && (
                    <> : <b>{editedCategory.name}</b></>
                  )}
                  </label>
                <div className="flex flex-col md:flex-row gap-2">
                    <input className="border rounded-lg py-2 grow"
                    type="text" 
                    value={categoryName}
                    onChange={(e)=>setCategoryName(e.target.value)}
                    />
                    <div className="flex gap-4 md:gap-2">
                      <button className="bg-blue-500 px-4 py-2 text-white rounded-lg cursor-pointer">
                      {editedCategory?'Update':'Create'}
                      </button>
                      <button className="bg-red-400 rounded-lg px-4 py-2 text-white cursor-pointer"
                      type="button"
                      onClick={()=>{
                        setEditedCategory(null)
                        setCategoryName('')
                      }}
                      >Cancel</button>
                    </div>
                </div>
            </form>
            {message && message.length>0 &&(
                <span>{message}</span>
            )}
            <div className="flex flex-col justify-center items-center gap-2 w-full ">
                <h2 className="mt-8">Edit Categories</h2>
                {categories.length>0 && categories.map((cat)=>(
                  <div key={cat._id} className="flex gap-3 text-xl bg-gray-300 w-full p-3 rounded-lg">
                      <h1>{cat.name}</h1>
                     <div className="flex gap-4 mx-auto md:mx-0 md:ml-auto">
                       <button className="bg-white px-4 py-2 rounded-lg cursor-pointer
                        hover:bg-blue-400 hover:text-white"
                        type="button"
                        onClick={()=>{
                          setCategoryName(cat.name)
                          setEditedCategory(cat)
                        }}
                        >Edit</button>
                      <DeleteButton 
                      label={"Delete"} onDelete={()=>handleDelete(cat._id)} bgColor={'white'}/>
                     </div>
                  </div>
                ))}
            </div>
        </section>
    )
}
export default CategoriesPage