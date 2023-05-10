import React from 'react'
import Link from 'next/link'
import mongoose from "mongoose";
import Product from '@/models/Product';

const tshirts = ({ products }) => {
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-14 mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center">
                        {Object.keys(products).map((item) => {
                            return <Link key={item._id} passHref={true} href={`/products/${item.slug}`} className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer rounded-md shadow-lg m-4 border-r-6">
                                <div className="block relative rounded-md overflow-hidden ">
                                    <img alt="ecommerce" className="px-auto object-contain mix-blend-darken m-auto h-[26vh] md:h-[36vh] block" src="https://m.media-amazon.com/images/I/61m7GPwnSCL._AC_UL600_FMwebp_QL65_.jpg" />
                                </div>
                                <div className="mt-4 text-center">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirt</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                                    <p className="mt-1">{item.price}</p>
                                    <div className='mt-1'>
                                        {products[item].size.includes('S') && <span className='border border-black-300 px-1 mx-1'>S</span>}
                                        {products[item].size.includes('M') && <span className='border border-black-300 px-1 mx-1'>M</span>}
                                        {products[item].size.includes('L') && <span className='border border-black-300 px-1 mx-1'>L</span>}
                                        {products[item].size.includes('XL') && <span className='border border-black-300 px-1 mx-1'>XL</span>}
                                        {products[item].size.includes('XXL') && <span className='border border-black-300 px-1 mx-1'>XXL</span>}
                                    </div>
                                    <div className='mt-1'>
                                        {products[item].color.includes('red') && <button className="border-2 border-red-300 rounded-full bg-red-500 w-5 h-5 mx-1 focus:outline-none"></button>}
                                        {products[item].color.includes('blue') && <button className="border-2 border-blue-300 rounded-full bg-blue-500 w-5 h-5 mx-1 focus:outline-none"></button>}
                                        {products[item].color.includes('white') && <button className="border-2 border-white-300 rounded-full bg-white-500 w-5 h-5 mx-1 focus:outline-none"></button>}
                                        {products[item].color.includes('grey') && <button className="border-2 border-grey-300 rounded-full bg-grey-500 w-5 h-5 mx-1 focus:outline-none"></button>}
                                        {products[item].color.includes('black') && <button className="border-2 border-black-300 rounded-full  bg-black-500 w-5 h-5 mx-1 focus:outline-none"></button>}

                                    </div>
                                </div>
                            </Link>
                        })}

                    </div>
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }


    let products = await Product.find({ category: 'tshirt' });
    let tshirts = {};
    for (let item of products) {
        if (item.title in tshirts) {
            if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
                tshirts[item.title].color.push(item.color)
            }
            if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
                tshirts[item.title].size.push(item.size)
            }
        }
        else {
            tshirts[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQty > 0) {
                tshirts[item.title].color = [item.color]
                tshirts[item.title].size = [item.size]
            }
        }
    }
    return {
        props: { products: JSON.parse(JSON.stringify(tshirts)) }
    }
}

export default tshirts
