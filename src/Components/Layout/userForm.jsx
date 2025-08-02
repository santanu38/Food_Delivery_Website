'use client'


import { useState } from "react"
import AdressInputs from "./AdressInputs"
import EditableImage from "./EditableImage"
import { useProfile } from "../UseProfile"

const UserForm=({user,onSave})=>{
  
       const [userName,setUserName]=useState(user?.username || '')
    //    const [email,setEmail]=useState('')
       const [image,setImage]=useState(user?.image || '')
       const [phone,setPhoneNo]=useState(user?.phone || '')
       const [streetAdress,setStreetAdress]=useState(user?.streetAdress || '')
       const [postalCode,setPostalCode]=useState(user?.postalCode || '')
       const [city,setCity]=useState(user?.city || '')
       const [country,setCountry]=useState(user?.country || '')
       const [admin,setAdmin]=useState(user?.admin || false)
       const {data:loggedInUserData}=useProfile()

       const handleAddressChange=(propName,value)=>{
          if(propName==='phone') setPhoneNo(value)
          if(propName==='streetAdress') setStreetAdress(value)
          if(propName==='postalCode') setPostalCode(value)
          if(propName==='city') setCity(value)
           if(propName==='country') setCountry(value)
       }
    return(
        <div className="flex mt-8 gap-4">
            <div>
                <div className="">
                  <EditableImage link={image} setLink={setImage}/>
                </div>
            </div>
            <form className="grow flex flex-col gap-2 " onSubmit={(e)=>onSave(e,{
                username:userName,phone,admin,image, streetAdress, city, country, postalCode,
            })}>
               <div className="flex gap-6">
                 <div className="flex flex-col">
                    <label >Username</label>
                   <input className="p-2 border"
                   type="text"
                    placeholder="Username"
                    value={userName}
                 onChange={(e)=>setUserName(e.target.value)}
                 />
                 </div>

                 <div className="flex flex-col">
                    <label>Email</label>
                 <input className="p-2 border"
                    type="email"
                    disabled={true}
                    value={user?.email}
                    placeholder={'email'}
                 />
                 </div>
               </div>

                <AdressInputs 
                addressprops={{phone,streetAdress,postalCode,city,country}}
                setAddressProps={handleAddressChange}
                />
                 {loggedInUserData && loggedInUserData.admin && (
                    <label className="p-2 flex items-center gap-2 mb-2" htmlFor="chadmin">
                        <input type="checkbox" 
                         htmlFor="chadmin"
                         value={'1'}
                        checked={admin}
                        onChange={(e)=>setAdmin(e.currentTarget.checked)}
                        />
                        Admin
                    </label>
                 )}
                <button className="bg-blue-500 cursor-pointer mt-4 hover:bg-blue-700 hover:text-white py-2"
                type="submit">Save</button>
            </form>
        </div>
    )
    
}
export default UserForm