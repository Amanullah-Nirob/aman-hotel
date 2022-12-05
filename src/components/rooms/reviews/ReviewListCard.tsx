import React from 'react';
import {Grid,Avatar} from '@mui/material'
import formatDate from '../../../utils/formatDate';
import Rating from '../../common/rating/Rating';

const ReviewListCard = ({review}:any) => {

    const displayReviewData = () => {
        if (review.created_at !== review.updated_at) {
          return `edited: ${formatDate(review?.updated_at || '')}`;
        }
        return formatDate(review?.created_at || '');
    };
    return (
        <Grid item xs={12} key={review?._id}>
        <div className="review_list">
            <div className="list_content">
            <div className="review_user_avatar">
                <Avatar src={review?.userId?.profilePic} alt='review user profile photo' sx={{width:'50px',height:'50px'}} />
            </div>
            <div className="review_content_info">
                <div className="content">
                <h4>{review?.userId?.name}</h4>
                <p>{review?.content}</p>
                </div>
                 <div className="timeAndLike_area">
                 <span className='review_date'>{displayReviewData()}</span>
                 </div>
            </div>
            </div>
            <div className='review_rating'>
                <Rating value={review.rating} readOnly />
            </div>
        </div>
    </Grid>
    );
};

export default ReviewListCard;