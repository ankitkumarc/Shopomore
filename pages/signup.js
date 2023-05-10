import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Signup = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const router = useRouter();

    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value)
        }
        else if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }

    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, email, password }

        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        let response = await res.json()
        setEmail('')
        setName('')
        setPassword('')
        toast.success('Congrats! your account is Created', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <div className="flex justify-center ">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div
                className="flex flex-col justify-center items-center md:flex-row shadow rounded-xl max-w-7xl w-[100%] h-[925px] md:h-[460px] ">

                <div className="h-[90%] w-full ">
                    <div className="text-xl cursor-pointer flex flex-col justify-center items-center mb-0 ">
                        <img className="h-[6vh] w-auto "
                            src={'/logo2.jpeg'}
                            alt="siteLogo" srcSet="" />

                    </div>
                    <form onSubmit={handleSubmit} method='POST'>
                        <div className="flex flex-col justify-center items-center mt-2 md:mt-2 space-y-2 md:space-y-2">
                            <div className="font-bold">
                                <h1 className='mx-2 my-2'>Full Name</h1>
                                <input onChange={handleChange} value={name} type="text" placeholder="Enter Your Name" id="name" name='name'
                                    className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-red-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold w-auto lg:w-[340px]" />
                            </div>
                            <div className="font-bold">
                                <h1 className='mx-2 my-2'>Email</h1>
                                <input onChange={handleChange} value={email} type="email" placeholder="Enter your Email-id" id="email" name='email'
                                    className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-red-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold w-auto lg:w-[340px]" />
                            </div>
                            <div className="font-bold">
                                <h1 className='mx-2 my-2'>Password</h1>
                                <input onChange={handleChange} value={password} type="password" placeholder="Password" id="password" name='password'
                                    className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-red-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold w-auto lg:w-[340px]" />
                            </div>

                            <div className="flex space-x-2 -ml-28 md:-ml-40  lg:-ml-52">
                                <input className="" type="checkbox" id="checkbox" name="checkbox" />
                                <h3 className="text-sm font-semibold text-gray-400 -mt-1 cursor-pointer">Remember Me</h3>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <button className="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-red bg-red-500 hover:bg-red-600  font-medium ">Signup</button>
                        </div>
                    </form>
                    <div className='flex justify-center'>

                        <div className="text-center my-3">
                            <Link href={'/login'} className="text-sm font-medium text-gray-400 hover:text-red-500 hover:underline">Login</Link>
                        </div>
                    </div>
                </div>
                <div className=" h-auto w-full bg-center bg-cover rounded-lg">
                    <img src={'/logo.jpeg'}></img>

                </div>
            </div>

        </div>

    )
}

export default Signup
