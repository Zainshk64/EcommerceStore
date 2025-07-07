import Layout from '../Layout/Layout'
import DynamicBreadcrumbs from '../components/DynamicBread'
import React from 'react'

const NotFound = () => {
  return (
    <Layout >
        <div className='px-4 md:px-16 lg:px-24 xl:px-32' >
            <DynamicBreadcrumbs/>
            <h1 className='text-5xl text-center  my-20' >
            Not Found Page

            </h1>
        </div>
    </Layout>
  )
}

export default NotFound