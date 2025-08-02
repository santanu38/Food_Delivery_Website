'use client'

import SectionHeader from "./SectionHeaders"

const About=()=>{
   return(
      <section className="mt-16" >
        <SectionHeader
        subheader="Our story"
        mainheader="About Us"
        />
        <div className="text-gray-500 flex flex-col p-4 md:p-0 text-center mx-auto mt-4 font-semibold text-xl gap-4  max-w-md justify-center items-center">
             <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste quos suscipit tempora? Aperiam esse fugiat inventore laboriosam officiis quam rem!
            </p>
            <p>At consectetur delectus ducimus est facere iure molestias obcaecati 
                quaerat vitae voluptate? Aspernatur dolor explicabo iste minus molestiae pariatur 
                provident quibusdam saepe?
                </p>
            <p>Laborum molestias neque nulla obcaecati odio quia quod reprehenderit sit 
                vitae voluptates? Eos, tenetur.
                </p>
        </div>
        
      </section>
   )
}
export default About