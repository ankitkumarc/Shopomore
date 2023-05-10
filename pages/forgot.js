import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router';

const Forgot = () => {
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])
    return (
        <div className="flex justify-center ">
            <div
                className="flex flex-col justify-center items-center md:flex-row shadow rounded-xl max-w-7xl w-[100%] h-[700px] md:h-[460px] mt-4">

                <div className="h-[90%] w-full ">
                    <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-2 ">
                        <img className="h-[6vh] w-auto "
                            src={'/logo2.jpeg'}
                            alt="siteLogo" srcSet="" />

                    </div>
                    <div className="flex flex-col justify-center items-center mt-4 md:mt-4 space-y-6 md:space-y-8">
                        <div className="font-bold">
                            <h1 className='mx-2 my-2'>Username/E-mail id</h1>
                            <input type="text" placeholder="Username/Email id"
                                className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-red-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold w-auto lg:w-[340px]" />
                        </div>

                        <div className="flex space-x-2 -ml-28 md:-ml-40  lg:-ml-52">
                            <input className="" type="checkbox" id="checkbox" name="checkbox" />
                            <h3 className="text-sm font-semibold text-gray-400 -mt-1 cursor-pointer">Remember Me</h3>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <button className="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-red bg-red-500 hover:bg-red-600  font-medium ">Login</button>
                    </div>
                    <div className='flex justify-center'>

                        <div className="text-center my-3">
                            <Link href={'/signup'} className="text-sm font-medium text-gray-400 hover:text-red-500 hover:underline">Signup</Link>
                        </div>
                    </div>
                </div>
                <div className="h-[90%] w-full bg-center bg-cover rounded-lg">
                    <img src={'/logo.jpeg'}></img>

                </div>

            </div>

        </div>

    )
}

export default Forgot
