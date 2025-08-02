'use client'

const SectionHeader=({subheader,mainheader})=>{
   return(
       <div className="text-center ">
            <h3 className="font-bold text-2xl">{subheader}</h3>
           <h2 className="font-semibold italic text-xl md:text-4xl text-[#f13a01]">{mainheader}</h2>
        </div>
   )
}
export default SectionHeader