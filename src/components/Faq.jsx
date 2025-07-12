import { Headphones, Shield, Truck } from 'lucide-react'
import React from 'react'

const Faq = () => {

    const faq = [
        {
            icon: <Truck />,
            head: 'FREE AND FAST DELIVERY',
            para: 'free delivery for all order over $140.',

        },
        {
            icon: <Headphones />,
            head: '24/7 CUSTOMER SUPPORT',
            para: 'friendly 24/7 customer support.'
        }, {
            icon: <Shield />,
            head: 'MONEY BACK GURANTEE',
            para: 'We return your money with in 30 days.'
        },


    ]
    return (
        <div className='px-6 sm:py-10 md:px-16 lg:px-24 xl:px-32'>
            <div className='grid grid-cols-1 md:grid-cols-3 py-7 sm:py-20' >
                {
                    faq.map((item, index) => (
                        <div key={index} className='text-center mb-10 sm:mb-0 flex flex-col justify-center items-center '>
                            <div className='p-3 bg-gray-300 h-14 w-14 group  flex justify-center items-center rounded-full'>
                                <div className='bg-black p-2 h-10 w-10 group-hover:h-14 group-hover:w-14 group-hover:p-4 trans cursor-pointer rounded-full text-white'>
                                    {item.icon}
                                </div>
                            </div>
                            <h1 className='font-medium mt-4 ' >{item.head}</h1>
                            <p className='text-gray-400 text-sm'>{item.para}</p>
                        </div>

                    ))
                }




            </div>

        </div>
    )
}

export default Faq 
