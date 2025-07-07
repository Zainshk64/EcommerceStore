import { DollarSign, Gift, Store, Wallet } from 'lucide-react'
import React from 'react'

const AboutUs = () => {
  const faq = [
         {
    icon: <Store/>,
    head: "10.5k",
    para: "Sellers active our site",
  },
  {
    icon: <DollarSign />,
    head: "33k",
    para: "Monthly Product Sale",
  },
  {
    icon: <Gift  />,
    head: "45.5k",
    para: "Customer active in our site",
  },
  {
    icon: <Wallet />,
    head: "25k",
    para: "Annual gross sale in our site",
  },


    ]
    return (
        <div className='px-4 md:px-16 lg:px-24 xl:px-32'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-10 py-7 sm:py-20' >
                {
                    faq.map((item, index) => (
                        <div key={index} className='text-center group px-5 py-4 mb-10 border  hover:-translate-y-2 border-black/40 sm:mb-0 hover:bg-red-500 trans flex flex-col justify-center items-center '>
                            <div className='p-3 bg-gray-300 group-hover:bg-gray-300 h-14 w-14 flex justify-center items-center rounded-full'>
                                <div className='bg-black group-hover:bg-white p-2 h-10 w-10 group-hover:h-14 group-hover:w-14 group-hover:p-4 trans cursor-pointer rounded-full text-white group-hover:text-black '>
                                    {item.icon}
                                </div>
                            </div>
                            <h1 className='font-medium mt-4 group-hover:text-white ' >{item.head}</h1>
                            <p className='text-gray-400  group-hover:text-white text-sm'>{item.para}</p>
                        </div>

                    ))
                }




            </div>

        </div>
    )
}

export default AboutUs
