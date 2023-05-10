import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
const cors = require('cors')

export default function App({ Component, pageProps }) {
  const [subtotal, setSubtotal] = useState(0)
  const [cart, setCart] = useState({})
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)
  const router = useRouter();

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.log(error)
      localStorage.clear()
    }

    const token = localStorage.getItem('token')
    if (token) {
      setUser({ value: token })
      setKey(Math.random)
    }
  }, [router.query])

  const logout = () => {
    localStorage.removeItem("token")
    setUser({ value: null })
    setKey(Math.random())
    router.push('/')
  }


  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
    let tprice = 0
    let key = Object.keys(myCart)
    for (let i = 0; i < key.length; i++) {
      tprice += myCart[key[i]].price * myCart[key[i]].qty
    }
    setSubtotal(tprice);
  }

  const buyNow = (itemCode, qty, price, name, size, varient) => {
    let newCart = { itemCode: { qty: 1, price, name, size, varient } }

    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }

  const addToCart = (itemCode, qty, price, name, size, varient) => {
    let newCart = cart
    if (itemCode in cart) {
      newCart[itemCode].qty += qty;
    }
    else {
      newCart[itemCode] = { qty: 1, qty, price, name, size, varient }
    }

    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = () => {
    setCart({})
    saveCart({})
  }

  const deleteFromCart = (itemCode, qty) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }

    setCart(newCart)
    saveCart(newCart)
  }



  return (
    <>
      <Navbar logout={logout} user={user} key={key} cart={cart} saveCart={saveCart} addToCart={addToCart} deleteFromCart={deleteFromCart} clearCart={clearCart} subtotal={subtotal} />
      <Component {...pageProps} buyNow={buyNow} cart={cart} saveCart={saveCart} addToCart={addToCart} deleteFromCart={deleteFromCart} clearCart={clearCart} subtotal={subtotal} />
      <Footer />
    </>
  )
}
