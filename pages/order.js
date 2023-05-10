import React from 'react'
import { GrMapLocation } from 'react-icons/gr';
import { MdOutlineCelebration } from 'react-icons/md';

const order = () => {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-8 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">SHOPOMORE</h2>
                        <h1 className="text-gray-900 text-xl title-font font-medium mb-4">Order ID: #696969</h1>
                        <p className="flex leading-relaxed mb-4"><MdOutlineCelebration className='mt-1 mx-1' />Congrats! Your order is confirmed</p>
                        <div className="flex mb-4">
                            <a className="flex-grow text-red-500 border-b-2 border-red-500 py-2 text-md px-1 text-center">Description</a>
                            <a className="flex-grow border-b-2 border-gray-300 py-2 text-md px-1 text-center">Quantity</a>
                            <a className="flex-grow border-b-2 border-gray-300 py-2 text-md px-1 text-center"> Item Price</a>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500 text-center text-md">Tshirt(XL BLUE)</span>
                            <span className="ml-auto text-gray-900 text-center text-md">1</span>
                            <span className="ml-auto text-gray-900 text-center text-md">₹ 499</span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500 text-md">Tshirt(XL BLUE)</span>
                            <span className="ml-auto text-gray-900 text-md">1</span>
                            <span className="ml-auto text-gray-900 text-md">₹ 499</span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500 text-md">Tshirt(XL BLUE)</span>
                            <span className="ml-auto text-gray-900 text-md">1</span>
                            <span className="ml-auto text-gray-900 text-md">₹ 499</span>
                        </div>
                        <div className="flex my-2">
                            <span className="title-font font-medium text-xl text-gray-900">SubTotal: ₹ 5800</span>


                        </div>
                        <div className='flex justify-start my-2'>
                            <button className="flex text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded"><GrMapLocation className='mx-2 mt-1' />TrackOrder</button>
                        </div>
                    </div>
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                </div>
            </div>
        </section>
    )
}

export default order
