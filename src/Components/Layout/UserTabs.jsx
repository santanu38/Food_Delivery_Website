'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const UserTabs=({isAdmin})=>{
    const path=usePathname()
    console.log(path);
    
    return(
         <div className="flex gap-3 tabs">
           <Link className={path==='/profile'?'active':''} 
           href={'/profile'}>
            Profile
           </Link>
             {isAdmin && (
              <>
                <Link className={path==='/categories'?'active':''} 
                 href={'/categories'}>
                 Categories
                </Link>
                <Link className={path.includes('/menu-items')?'active':''} 
                  href={'/menu-items'}>
                  Menu Items
                 </Link>
                <Link className={path.includes('users')?'active':''} 
                  href={'/users'}>
                   Users
                 </Link>        
              </>
            )}
        </div>
    )
}
export default UserTabs