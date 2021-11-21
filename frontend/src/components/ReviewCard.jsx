import React from 'react'
import styles from './ReviewCard.module.css'
import ReactStars from 'react-rating-stars-component';
const ReviewCard = ({ review }) => {
    return (
        <div className={styles.reviewCard}>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
            <ReactStars edit={false} activeColor="red" isHalf={true} color="gray" value={review.rating} size={15} />
            <p>{review.name}</p>
            <span>
                {review.comment}
            </span>
        </div>
    )
}

export default ReviewCard
