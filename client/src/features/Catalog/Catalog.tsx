import { useState, useEffect } from 'react'
import { Product } from '../../app/models/product'
import ProductList from './ProductList'

export default function Catalog() {
    const [products, setproducts] = useState<Product[]>([])

    useEffect(() => {
        fetch('http://localhost:5000/api/product')
            .then(Response => Response.json())
            .then(data => setproducts(data))
    }, [])
    return (
        <>
            <ProductList products={products} />
        </>
    )
}