import BestProduct from '../components/BestProduct'
import Wishlist from '../components/Wishlist'
import Layout from '../Layout/Layout'
import React from 'react'

const WishlistPage = () => {
  return (
    <Layout>
      
        <Wishlist/>
        <BestProduct/>
    </Layout>
  )
}

export default WishlistPage