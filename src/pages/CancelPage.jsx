import DynamicBreadcrumbs from '../components/DynamicBread'
import CancelOrder from '../components/UserCard/CancelOrder'
import Layout from '../Layout/Layout'
import React from 'react'

const CancelPage = () => {
  return (
    <Layout>
        <div className='px-4 md:px-16 lg:px-24 xl:px-32 pt-10 sm:pt-20' >

        <DynamicBreadcrumbs />
        </div>
        <CancelOrder/>
    </Layout>
  )
}

export default CancelPage