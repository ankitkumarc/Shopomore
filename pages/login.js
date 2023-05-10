import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])


    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email, password }

        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        let response = await res.json()
        // console.log(response)

        setEmail('')
        setPassword('')
        if (response.success) {
            localStorage.setItem('token', response.token)
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
            router.push(process.env.NEXT_PUBLIC_HOST)
        }
        else {
            toast.error('Invalid credentials', {
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
                className="flex flex-col justify-center items-center md:flex-row shadow rounded-xl max-w-7xl w-[100%] h-[700px] md:h-[460px] mt-4">
                <div className=" h-auto w-full bg-center bg-cover rounded-lg">
                    <img src={'/logo.jpeg'}></img>

                </div>
                <div className="h-[90%] w-full ">
                    <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-2 ">
                        <img className="h-[6vh] w-auto "
                            src={'/logo2.jpeg'}
                            alt="siteLogo" srcSet="" />

                    </div>
                    <form onSubmit={handleSubmit} method='POST'>
                        <div className="flex flex-col justify-center items-center mt-4 md:mt-4 space-y-6 md:space-y-8">
                            <div className="font-bold">
                                <h1 className='mx-2 my-2'>E-mail id</h1>
                                <input onChange={handleChange} id='email' name='email' type="email" placeholder="Email-id"
                                    className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-red-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold w-auto lg:w-[340px]" />
                            </div>
                            <div className="font-bold">
                                <h1 className='mx-2 my-2'>Password</h1>
                                <input onChange={handleChange} id='password' name='password' type="password" placeholder="Password"
                                    className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-red-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold w-auto lg:w-[340px]" />
                            </div>
                            <div className="flex space-x-2 -ml-28 md:-ml-40  lg:-ml-52">
                                <input type="checkbox" id="checkbox" name="checkbox" />
                                <h3 className="text-sm font-semibold text-gray-400 -mt-1 cursor-pointer">Remember Me</h3>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <button className="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-red bg-red-500 hover:bg-red-600  font-medium ">login</button>
                        </div>
                    </form>
                    <div className='flex justify-center'>
                        <div className="text-center my-3 mx-4 ml-">
                            <Link href={'/forgot'} className="text-sm font-medium text-gray-400 hover:text-red-500 hover:underline">Forgot Password ?</Link>
                        </div>
                        <div className="text-center my-3">
                            <Link href={'/signup'} className="text-sm font-medium text-gray-400 hover:text-red-500 hover:underline">Signup</Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Login
