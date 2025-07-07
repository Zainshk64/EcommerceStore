import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TopHeader from '../components/TopHeader'
import DynamicBreadcrumbs from '../components/DynamicBread'

const Layout = ({ children }) => {
  return (
    <div>
      <div className='bg-white fixed w-full z-50'>

        <TopHeader />
        <Navbar />
      </div>

      <div className=' pt-36 sm:pt-28' >

        {children}
      </div>
      <Footer />

    </div>
  )
}

export default Layout
