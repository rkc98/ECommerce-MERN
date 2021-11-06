
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Metadata from '../components/layout/Metadata'
import Product from '../components/Product'
import { getProducts } from '../store/actions/productAction'

import Styles from './Home.module.css'


const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("called");
        dispatch(getProducts())
    }, [dispatch])

    const { loading, products, error, productsCount } = useSelector(state => state.products)
    console.log(JSON.stringify(products));
    return (
        <>
            <Metadata title="Home Page" />

            <div className={Styles.banner}>
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                {/* <a href={Styles.container}>
                    <button>
                        Scroll <Mouse style={{ fontSize: 12, }} />
                    </button>
                </a> */}
            </div>

            <h2 className={Styles.homeHeading}>Featured Products</h2>

            <div className={Styles.container}>

                {products && products.map(product => <Product key={product._id} product={product} />)}
            </div>


        </>
    )
}

export default Home
