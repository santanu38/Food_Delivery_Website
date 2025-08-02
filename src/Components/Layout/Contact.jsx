'use client'

import SectionHeader from "./SectionHeaders"

const Contact=()=>{
    return(
       <section className="mt-16 text-center">
          <SectionHeader
            subheader="Don\'t hesitate"
            mainheader="Contact us"
          />
          <div className="mt-8">
            <a href="tel:+91 9064330395"
             className="text-gray-500 underline text-4xl"
            >
                9064330395
            </a>
          </div>
       </section>
    )
}
export default Contact