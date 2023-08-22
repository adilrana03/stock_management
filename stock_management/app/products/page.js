'use client'
import Header from '@/components/Header'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const page = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        // Fetch products on load
        const fetchProducts = async () => {
            const response = await fetch('/api/product')
            let data = await response.json()
            console.log(data);
            setProducts(data.products)
        }
        fetchProducts()
    }, [])
    const handleClick = (e) => {
        console.log(e);
    }

    return (
        <div>
            <Header />
            <div className="container my-8 mx-auto" >
                <h1 className="text-3xl font-semibold mb-6 text-center">Display Current Stock</h1>
                <div className='grid grid-cols-3 gap-3'>
                    {
                        products.length == 0 ? <div className='text-center'><h1>Loading.....</h1></div> :
                            products.map((e, i) => {
                                return <div className='m-auto shadow-2xl p-3 rounded-lg'>
                                    <div className='h-[220px]'>
                                        <img src={e.url} alt="" className='h-[200px] w-[300px]' />
                                    </div>
                                    <div className='p-4 flex m-auto'>
                                        <div className='mr-12'>
                                            <h3>{e.name}</h3>
                                            <h3>₹: {e.price}</h3>
                                        </div>
                                        <div>
                                            <button className='bg-green-400 rounded-lg cursor-pointer text-white p-1' onClick={() => handleClick(e._id)}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            })
                    }
                </div>
            </div>
        </div>
    )
}

export default page