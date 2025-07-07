import React from 'react'
import Layout from '../Layout/Layout'
import About from '../components/About/About'
import AboutUs from '../components/About/AboutUs'
import { TestimonialsSectionDemo } from '../components/TestimonialsSectionDemo'

const AboutPage = () => {
  return (
    <Layout>
        <About/>
        <AboutUs/>
        <TestimonialsSectionDemo/>
    </Layout>
  )
}

export default AboutPage
