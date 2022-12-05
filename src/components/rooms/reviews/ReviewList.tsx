import React from 'react';
import {Grid} from '@mui/material'
import ReviewListCard from './ReviewListCard';

const ReviewList = ({reviews,setSingleRoomData}:any) => {

    return (
        <div className='review_list_contents'>
            <Grid container spacing={2}>
             {reviews.map((review:any)=> <ReviewListCard key={review?._id} review={review}/>)}
            </Grid>
        </div>
    );
};

export default ReviewList;