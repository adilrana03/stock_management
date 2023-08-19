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

    return (
        <div>
            <Header />
            <div className="container my-8 mx-auto" >
                <h1 className="text-3xl font-semibold mb-6">Display Current Stock</h1>
                <div className='grid grid-cols-3'>

                    {products.map((e, i) => {
                        return <div >
                            <div >
                                <img src={e.url} alt="" width={400} height={300} />
                            </div>
                            <h3>{e.name}</h3>
                            <h3>{e.price}</h3>
                            <button className='bg-amber-300 rounded-lg cursor-pointer text-white'>Add to Cart</button>
                        </div>
                    })}


                </div>
            </div>
        </div>
    )
}

export default page