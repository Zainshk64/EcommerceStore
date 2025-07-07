import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Todays from '../components/Todays'
import TopHeader from '../components/TopHeader'
import Category from '../components/Category'
import Layout from '../Layout/Layout'
import Arrival from '../components/Arrival'
import Faq from '../components/Faq'
import BestProduct from '../components/BestProduct'
import SecondBanner from '../components/SecondBanner'

const Home = () => {
  return (
    <Layout>
      {/* <Navbar /> */}
      <Banner />
      <Todays />
      <Category/>
      <SecondBanner/>
      <Arrival/>
      <BestProduct/>
      <Faq/>
    </Layout>
  )
}

export default Home