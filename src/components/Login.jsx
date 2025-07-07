import React, { useState } from 'react'
import loginBanner from '../assets/loginbanner.jpg'
import googleicon from '../assets/googleicon.png'

const Login = () => {
    const [LogIn, SetLogin] = useState('Sign Up')
    return (
        <div className='py-10 '>
            <div className='flex p-5 lg:flex-row flex-col justify-evenly'>
                <div className='sm:w-1/2 mx-auto md:w-3/5 '>
                    <img src={loginBanner} alt="" />
                </div>
                <div className='sm:w-1/2 mx-auto md:w-80  trans pt-10 sm:pt-20'>
                    <div>
                        <h1 className='text-3xl text-red-500'>{LogIn ==='Sign Up' ? 'Create an Account!' : 'Login With Exclusive'}</h1>
                        <p className='text-gray-500 text-sm'>Enter your details Below.</p>
                        <form action="">

                            <div className='py-5 space-y-10'>
                                {
                                    LogIn === "Sign Up" && (
                                        <input type="username" placeholder='Name' className='w-full pb-2 focus:outline-none border-b' required />
                                    )
                                }
                                <input type="email" placeholder='Email or Phone Number' className='w-full pb-2 focus:outline-none border-b ' required />
                                <input type="password" placeholder='Password' className='w-full pb-2 focus:outline-none border-b ' required />
                            </div>
                            {
                                LogIn === "Sign Up" ? (

                                    <input type="submit" value={LogIn} id='signup' className='p-3 w-full bg-red-500 cursor-pointer text-white rounded-lg' />
                                ) : (
                                    <div className='flex justify-between items-center'>
                                    <input type="submit" value={LogIn} id='signin' className='px-4 py-2.5  bg-red-500 cursor-pointer text-white rounded-lg' />
                                    <p className='text-red-500 cursor-pointer'>Forgot Password?</p>

                                    </div>
                                )
                            }

                        </form>
                        {LogIn === "Sign Up" ?
                            <>
                            <div className=''>
                                <div className=' border border-neutral-300 rounded-lg mt-4 justify-center flex items-center gap-5' >
                                    <img src={googleicon}  alt="" />
                                     Continue With Google
                                </div>

                                <p className='text-center my-3 text-gray-500  '>Already Have an Account! <span className='underline cursor-pointer' onClick={() => SetLogin('Sign In')} >Sign In</span> </p>
                            </div>

                            </> : <>
                                <p className='text-center mt-7 text-gray-500  '>New Here! <span className='underline cursor-pointer' onClick={() => SetLogin('Sign Up')} >Sign Up</span> </p>

                            </>}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
