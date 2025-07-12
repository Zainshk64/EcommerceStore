import { Copyright, Facebook, Instagram, Linkedin, Mail, Search, Send, Share, TwitchIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import qrcode from '../assets/qrcode.jpg'
import google from '../assets/google.png'


const Footer = () => {
  return (
    <div className='px-4 bg-black text-white md:px-16 lg:px-24 xl:px-32' >
      <div className='sm:py-20 pt-10 md:pt-20 grid grid-cols-1  md:grid-cols-5 gap-8'>
        <div>
          <h1 className='font-medium text-2xl mb-5'>Exclusive</h1>
          <div className='space-y-3'>

          <p  className='text-sm text-gray-300'>Subscribe</p>
          <p className='text-sm text-gray-300'>Get 10% off your first day.</p>
          <div className="relative w-full max-w-sm">
            <Send className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter Your Email"
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-400 placeholder-gray-500 focus:outline-none text-sm"
            />
          </div>
          </div>

        </div>

        <div>
          <h1 className='font-medium text-2xl mb-5'>Support</h1>
          <div className='text-sm text-gray-300 space-y-4'>
            <p>111 ABC Sarani , Dhaska DH , UK </p>
            <p>exclusive@gmail.com</p>
            <p>+92 79389 992</p>
          </div>
        </div>

        <div>
          <h1 className='font-medium text-2xl mb-5'>Account</h1>
          <div className='text-sm text-gray-300 flex flex-col space-y-4' >
            <Link to={'/'}>My Account</Link>
            <Link to={'/'}>Login</Link>
            <Link to={'/'}>Cart</Link>
            <Link to={'/'}>Whishlist</Link>
            <Link to={'/'}>Shop</Link>
          </div>
        </div>

        <div>
          <h1 className='font-medium text-2xl mb-5'>Quick Link</h1>
          <div className='text-sm text-gray-300 flex flex-col space-y-4'>
            <Link to={'/'}>Privacy Policy</Link>
            <Link to={'/'}>Terms of Use</Link>
            <Link to={'/'}>FAQ</Link>
            <Link to={'/'}>Contact</Link>
          </div>
        </div>

        <div>
          <h1 className='font-medium text-2xl mb-5'>Download App</h1>
          <p className='text-sm text-gray-300'>Save $3 With App New User..</p>
          <div className='flex items-center' >
            <div>
              <img src={qrcode} className='' width={100} alt="" />
            </div>
            <div className=''>
              <img src={google} alt="" width={130} />
            </div>
          </div>
          <div className='inline-flex gap-6 mt-5'>
            <Facebook className='h-5 w-5' />
            <Instagram className='h-5 w-5' />
            <TwitchIcon className='h-5 w-5'/>
            <Linkedin className='h-5 w-5'/>
          </div>
        </div>

      </div>
      <hr className='h-10 opacity-25' />


      <div className='mt-10 pb-7 text-center'>
        <p className='text-gray-300 text-sm flex justify-center gap-2 items-center'> <Copyright className='h-5 w-5'/> Copyright All Rights Reserved By ZainShk {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}

export default Footer
