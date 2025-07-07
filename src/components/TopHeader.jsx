import { ChevronDown, Turtle, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const TopHeader = () => {
    const [showTop , setShowTop] = useState(true);
    return (
        <>
        {showTop && (
            

        
        <div className='bg-black px-4 md:px-16 lg:px-24 xl:px-32 text-white p-2.5' >
            <div className='flex justify-between'>

                <div className='flex items-center gap-1'>
                    <X className=' h-8 w-8 cursor-pointer ' onClick={()=>setShowTop(false)} />
                    <p className='text-xs sm:text-sm '>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <Link to={'/shop'} className='underline italic ml-5 animate-pulse' >Shop Now </Link>  </p>
                </div>
                <div>
                    <p className='inline-flex items-center gap-1'>English <ChevronDown /></p>
                </div>
            </div>
        </div>
        )}
        </>
    )
}

export default TopHeader
