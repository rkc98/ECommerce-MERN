import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import Styles from './Product.module.css'

const Product = ({ product }) => {
    return (
        <Link className={Styles.productCard} to={`/product/${product._id}`}>
            <img src={product.images[0].url} />
            <p>{product.name}</p>

            <div>
                <ReactStars edit={false} activeColor="red" isHalf={true} color="gray" value={product.ratings} size={15} />
                <span> ({product.numberOfReviews} Reviews)</span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    )
}

export default Product
