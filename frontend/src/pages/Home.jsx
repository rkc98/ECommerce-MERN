import { Mouse } from '@material-ui/icons'
import React from 'react'
import Product from '../components/Product'

import Styles from './Home.module.css'

const product = {
    name: "Demo",
    images: [{ url: "https://cached.imagescaler.hbpl.co.uk/resize/scaleHeight/815/cached.offlinehbpl.hbpl.co.uk/news/OMC/all-products-20170125054108782.gif" }],
    price: "$2000",
    _id: "some123"

}

const Home = () => {

    return (
        <>


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

                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />

            </div>


        </>
    )
}

export default Home
