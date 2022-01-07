import { useState, useEffect } from 'react'
import agent from '../../app/api/agent'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { Product } from '../../app/models/product'
import ProductList from './ProductList'

export default function Catalog() {
    const [products, setproducts] = useState<Product[]>([])
    const [loading, setloading] = useState(true)

    useEffect(() => {
        agent.Catalog.list()
        .then(products => setproducts(products))
        .catch(error => console.log(error))
        .finally(() => setloading(false))
    }, [])

    if (loading) return <LoadingComponent message='Loading products...'/>

    return (
        <>
            <ProductList products={products} />
        </>
    )
}