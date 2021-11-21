import React, { useEffect } from 'react'
import styles from './ProductDetails.module.css'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../store/actions/productAction';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from '../components/ReviewCard';
import Loading from '../components/Loading';



const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))  //using match.params.id to retrieve the product id from url 

    }, [dispatch, match.params.id])

    const productDetail = useSelector(state => state.productDetail);
    const { product, loading, error } = productDetail
    const stockColor = product.stock < 1 ? 'redColor' : 'greenColor'
    // console.log(stockColor);
    console.log(loading);
    if (loading) {
        console.log("loding done");
    }

    return (


        <>
            {loading ? (<Loading />) :
                (
                    <>
                        <div className={styles.ProductDetails}>

                            <div>
                                <Carousel>
                                    {
                                        product.images &&
                                        product.images.map((item, i) => (
                                            <img src={item.url} key={item.url} alt={i} className={styles.CarouselImage} />
                                        ))

                                    }
                                </Carousel>

                            </div>

                            <div>
                                <div className={styles.detailsBlock1}>
                                    <h2>
                                        {product.name}
                                    </h2>
                                    <p>{product._id}</p>

                                </div>
                                <div className={styles.detailsBlock2}>
                                    {console.log(product.ratings)}
                                    <ReactStars edit={false} activeColor="red" isHalf={true} color="gray" value={product.ratings} size={15} />
                                    <span> ({product.numberOfReviews} Reviews)</span>
                                </div>
                                <div className={styles.detailsBlock3}>
                                    <h1>
                                        {`₹${product.price}`}
                                    </h1>
                                    <div className={styles.detailsBlock31}>
                                        <div className={styles.detailsBlock311}>
                                            <button>
                                                -
                                            </button>

                                            <input type="number" value="1" />

                                            <button>
                                                +
                                            </button>

                                        </div>
                                        <button>
                                            Add to cart
                                        </button>

                                    </div>
                                    <p className={`${stockColor}`}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </p>
                                </div>

                                <div className={styles.detailsBlock4}>

                                    Description : <p>{product.description}</p>

                                </div>
                                <button className={styles.submitReview}>Submit Review</button>
                            </div>

                        </div>

                        <h3 className={styles.reviewsHeading}>
                            Reviews
                        </h3>

                        {product.reviews && product.reviews[0] ? (
                            <div className={styles.reviews}>
                                {product.reviews &&
                                    product.reviews.map((review) => (
                                        <ReviewCard key={review._id} review={review} />
                                    ))}
                            </div>
                        ) : (
                            <p className="noReviews">No Reviews Yet</p>
                        )}
                    </>)}

        </>
    )
}


export default ProductDetails
