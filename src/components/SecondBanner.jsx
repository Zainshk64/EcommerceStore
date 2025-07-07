import React from 'react'
import secondbanner from '../assets/secondBanner.png'
const SecondBanner = () => {
  return (
    <div className="px-6 py-10 md:px-16 lg:px-24 xl:px-32">
        <div className='bg-black px-5 py-5 md:py-0 md:px-20 flex flex-col md:flex-row  md:justify-center items-center text-white'>
        <div className='space-y-8 ' >
            <p className='text-green-400 font-bold'>Category</p>
            <h1 className='text-4xl font-medium'>Enhance Your Music Experience</h1>
            <div className='flex items-center gap-5'>
                <div className='p-2 text-xs bg-white text-black text-center h-15 w-15 rounded-full'>
                    <p className='font-bold'>23</p>
                    <p>Hours</p>

                </div>
                <div className='p-2 bg-white text-xs text-black text-center h-15 w-15 rounded-full'>
                    <p className='font-bold'>05</p>
                    <p>Days</p>
                    
                </div>
                <div className='p-2 bg-white text-xs text-black text-center h-15 w-15 rounded-full'>
                    <p className='font-bold'>58</p>
                    <p>Minutes</p>
                </div>
                <div className='p-2 bg-white text-xs text-black text-center h-15 w-15 rounded-full'>
                    <p className='font-bold'>20</p>
                    <p>Second</p>

                </div>
            </div>
            <button className='px-4 py-2.5 rounded-md cursor-pointer hover:bg-green-600 bg-green-500 '>Buy Now</button>
        </div>
        <div className='w-70 md:w-1/2 ' >
            <img src={secondbanner} className='scale-150 -rotate-10' alt="" />
        </div>


        </div>
        
      
    </div>
  )
}

export default SecondBanner
