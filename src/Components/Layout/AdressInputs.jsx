'use client'

const AdressInputs=({addressprops,setAddressProps,disabled=false})=>{
    const {phone,streetAdress,postalCode,country,city}=addressprops
    return(
        <>
            <label >Phone</label>
            <input className="p-2 border"
            type="tel"
            placeholder="Phone No"
            value={phone || ''}
            onChange={(e)=>setAddressProps('phone',e.target.value)}
            />

            <label >Street Address</label>
            <input className="p-2 border"
            type="text"
            placeholder="Street Address"
            value={streetAdress || ''}
            onChange={(e)=>setAddressProps('streetAddress',e.target.value)}
            />
        
            <label >Postal Code</label>
            <input className="p-2 border"
            type="text"
            placeholder="Postal Code"
            value={postalCode || ''}
            onChange={(e)=>setAddressProps('postalCode',e.target.value)}
            />

            <label >City</label>
            <input className="p-2 border"
            type="text"
            placeholder="City"
            value={city || ''}
            onChange={(e)=>setAddressProps('city',e.target.value)}
            />

            <label >Country</label>
            <input className="p-2 border"
            type="text"
            placeholder="Country"
            value={country || ''}
            onChange={(e)=>setAddressProps('country',e.target.value)}
            />
        </>
    )
}
export default AdressInputs