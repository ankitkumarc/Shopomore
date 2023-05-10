import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { HiShoppingCart } from 'react-icons/hi';
import { RiAccountCircleFill } from 'react-icons/ri';
import { TiShoppingCart } from 'react-icons/ti';


const Navbar = ({ cart, deleteFromCart, clearCart, subtotal, user, logout }) => {
    // console.log(user.value)
    const ref = useRef();
    const [dropdown, setDropdown] = useState()

    const toggleCart = () => {
        if (ref.current.classList.contains("hidden")) {
            ref.current.classList.remove("hidden");
            ref.current.classList.add('block');
        }
        else if (!ref.current.classList.contains("hidden")) {
            ref.current.classList.remove('block');
            ref.current.classList.add('hidden');
        }
    }
    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-center item-center py-2 shadow-md sticky top-0 z-10 bg-white'>
            <div className='logo mx-5'>
                <Link href="/">
                    <Image width={200} height={40} src="/slogan.jpeg" alt="" />
                </Link>
            </div>
            <div className='nav'>
                <ul className='flex items-center space-x-2 font-bold md:text-emerald-900 mx-2 my-2'>
                    <Link href={'/tshirts'}><li>Tshirts</li></Link>
                    <Link href={'/hoodies'}><li>Hoodies</li></Link>
                    <Link href={'/stickers'}><li>Stickers</li></Link>
                    <Link href={'/mugs'}><li>Mugs</li></Link>
                </ul>
            </div>
            <div className="flex cart absolute right-2 top-3 mx-2  text-center">
                {dropdown && <div onMouseOver={() => setDropdown(true)} onMouseLeave={() => { setDropdown(false); }} className='absolute right-7 bg-red-400 font-bold top-5 py-2 rounded-md px-5 w-32'>
                    <ul>
                        <Link href={'/myaccount'}><li className='py-1 text-sm'>My Account</li></Link>
                        <Link href={'/orders'}><li className='py-1 text-sm'>Orders</li></Link>
                        <li onClick={logout} className='py-1 text-sm'>Logout</li>
                    </ul>
                </div>}
                {user.value && <><RiAccountCircleFill onMouseOver={() => setDropdown(true)} onMouseLeave={() => { setDropdown(false) }} className='text-xl md:text-2xl mx-2' /><TiShoppingCart onClick={toggleCart} className='text-xl md:text-2xl text-center' /></>}
                {
                    !user.value && <><Link href={'/login'}>
                        <button className="text-black item flex text-center bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded text-md mr-2">Login</button>
                    </Link></>
                }
            </div >

            <div ref={ref} className="my-cart overflow-y-scroll bg-red-400 absolute top-2 right-2 px-8 py-10 z-10 rounded-xl transform hidden transition-transform w-72 h-[90vh]">
                <h2 className='font-bold text-xl'>Your Wishes</h2>
                <span onClick={toggleCart} className='absolute top-2 right-2 text-2xl cursor-pointer'><AiFillCloseCircle className='cursor-pointer' /></span>
                <ol className='list-decimal mix-blend-darken'>
                    {Object.keys(cart).length == 0 && <div className='text-bold py-4'>Your cart is empty!!</div>}

                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex my-5">
                                <div className='w-2/3 font-bold'>{cart[k].name}</div>
                                <div className='flex items-center justify-center w-1/3 font-bold text-lg'><AiFillMinusCircle onClick={() => { deleteFromCart(k, 1) }} className='cursor-pointer' /><span className='mx-2'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { deleteFromCart(k, -1) }} className='cursor-pointer' /></div>
                            </div>
                        </li>

                    })}
                </ol>
                <div className='flex items-center justify-center p-2 bg-blue-500 rounded-md my-3 text-bold'> Subtotal: ₹ {subtotal}</div>
                <div className='flex items-center justify-center'>
                    <Link href={'/checkout'}> <button className="text-black item flex text-center bg-red-600 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm font-bold mr-2"><HiShoppingCart className='m-1' /> Checkout</button>
                    </Link>
                    <button onClick={clearCart} className="text-black item flex text-center font-bold bg-red-600 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm mr-2">Clear Cart</button>
                </div>
            </div>
        </div >
    )
}

export default Navbar
