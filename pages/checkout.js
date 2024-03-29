import React, { useState } from 'react'
import Link from 'next/link'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Script from 'next/script';
const Razorpay = require("razorpay");

const checkout = ({ cart, deleteFromCart, subtotal }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [pincode, setPincode] = useState('')
    const [disabled, setDisabled] = useState(true)

    const handleChange = async (e) => {
        if (e.target.name == 'name')
            setName(e.target.value);
        else if (e.target.name == 'email')
            setEmail(e.target.value);
        else if (e.target.name == 'address')
            setAddress(e.target.value);
        else if (e.target.name == 'phoneno')
            setPhoneno(e.target.value);
        else if (e.target.name == 'pincode') {
            setPincode(e.target.value);
            if (e.target.value.length == 6) {
                const pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
                let pinJson = await pins.json()
                if (Object.keys(pinJson).includes(e.target.value)) {
                    setState(pinJson[e.target.value][1]);
                    setCity(pinJson[e.target.value][0]);
                }
                else {
                    setState("");
                    setCity("");
                }
            }
            else {
                setState("");
                setCity("");
            }
        }

        if (name.length > 3 && address.length > 3 && phoneno.length > 9 && pincode.length == 6) setDisabled(false);
        else setDisabled(true);


    }

    const makePayment = async (e) => {

        // Make API call to the serverless API
        let oid = Math.floor(Math.random() * Date.now());
        const productId = { cart: cart, amount: subtotal, oid: oid, name: name, email: email, address: address, phoneno: phoneno, pincode: pincode }
        const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(productId),
        })

        let txToken = await data.json();
        const { order, success } = txToken;
        if (success) {
            console.log(txToken)

            var options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
                amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Shopomore",
                description: "Test Transaction",
                image: "https://m.media-amazon.com/images/I/814ePfNubRL._AC_UL480_FMwebp_QL65_.jpg",
                order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9000090000"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            var rzp1 = new window.Razorpay(options);

            rzp1.open();
            e.preventDefault();
        }
        else {
            console.log("card is Tempered");
        }
    }


    return (
        <div className='justify-center p-2'>

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <h1 className='font-bold text-3xl my-4 text-center'>Checkout</h1>
            <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
            <div className='mx-auto flex'>
                <div className='px-2 w-1/2'>
                    <div className="relative mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600 font-bold">Full Name</label>
                        <input value={name} type="text" onChange={handleChange} placeholder='Enter your full name' id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className='px-2 w-1/2'>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600 font-bold">Email Address</label>
                        <input value={email} type="text" onChange={handleChange} placeholder='Enter your Email address' id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <div className="w-full mb-4 p-2">
                <label htmlFor="address" className="leading-7 text-sm text-gray-600 font-bold">Address</label>
                <textarea value={address} id="address" onChange={handleChange} placeholder='Enter full address' name="address" row="15" className=" w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" ></textarea>
            </div>

            <div className='mx-auto flex'>
                <div className='px-2 w-1/2'>
                    <div className="relative mb-4">
                        <label htmlFor="phoneno" className="leading-7 text-sm text-gray-600 font-bold">Phone Number</label>
                        <input value={phoneno} type="text" id="phoneno" onChange={handleChange} name="phoneno" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className='px-2 w-1/2'>
                    <div className="relative mb-4">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600 font-bold">Pincode</label>
                        <input value={pincode} type="text" id="pincode" name="pincode" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

            </div>

            <div className='mx-auto flex'>
                <div className='px-2 w-1/2'>
                    <div className="relative mb-4">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600 font-bold">State</label>
                        <input value={state} type="text" onChange={handleChange} id="state" name="phoneno" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out readOnly={true}" />
                    </div>
                </div>
                <div className='px-2 w-1/2'>
                    <div className="relative mb-4">
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600 font-bold">City</label>
                        <input value={city} type="text" onChange={handleChange} id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

            </div>

            <h2 className='font-semibold text-xl my-2'>2. Review Cart Items</h2>
            <div className="my-cart bg-red-400 px-8 py-2 z-10 rounded-xl">
                <h2 className='font-bold text-xl text-center'>Your Wishes</h2>

                <ol className='list-decimal mix-blend-darken'>
                    {Object.keys(cart).length == 0 && <div className='text-bold py-2'>Your cart is empty!!</div>}

                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex my-3">
                                <div className='w-2/3 font-bold'>{cart[k].name}</div>
                                <div className='flex items-center justify-center w-1/3 font-bold text-lg'><AiFillMinusCircle onClick={() => { deleteFromCart(k, 1) }} className='cursor-pointer' /><span className='mx-2'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { deleteFromCart(k, -1) }} className='cursor-pointer' /></div>
                            </div>
                        </li>

                    })}
                </ol>
                <div className='font-bold text-blue-700'> Subtotal: ₹ {subtotal}</div>

            </div>
            <div className='flex my-3'>
                <Link dis href={'/checkout'}> <button onClick={makePayment} id="rzp-button1" disabled={disabled} className="disabled:bg-red-400 text-black item flex text-center bg-red-600 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded-xl text-md font-bold mr-4"><BsFillBagCheckFill className='m-1' /> Pay - ₹ {subtotal}</button>
                </Link>
            </div>
        </div>

    )

}

export default checkout
