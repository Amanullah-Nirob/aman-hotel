import React, { useState } from 'react';
import RoomCard from '../../../components/rooms/roomsMainContent/roomList/roomCard/RoomCard';
import RoomServices from '../../../services/RoomServices';
import {Grid} from '@mui/material'
import ReviewList from '../../../components/rooms/reviews/ReviewList';
const MyReviews = ({data}:any) => {
    const [reviewsData,setReviewsData]=useState(data)
    console.log(reviewsData);
  const updateReviews=(updateReviews:any)=>{
     const updateData=reviewsData.filter((review:any)=>review.roomId?._id === updateReviews._id)
     const finalUpdate={
        ...updateData[0],
        roomId:updateReviews
     }

     const prevReviewData=reviewsData.filter((prevReview:any)=>prevReview._id !== finalUpdate._id)
     const updateReviewData=[
        ...prevReviewData,
        finalUpdate
     ]
    setReviewsData(updateReviewData);
    console.log(updateReviewData);
  }


 
 
    return (
        <div>
            <Grid container>
            {reviewsData.map((review:any)=>(
                <Grid item sm={12} key={review._id}>
                    <Grid container >
                        <Grid item sm={8}>
                        <ReviewList singleRoomData={review.roomId} setSingleRoomData={updateReviews}></ReviewList>
                        </Grid> 
                        <Grid item sm={4}>
                        <RoomCard {...review.roomId}></RoomCard>
                        </Grid> 
                    </Grid>
                </Grid>
            ))}
            </Grid>
           
        </div>
    );
};

export const getServerSideProps = async ({ params }: any) => {
    try {
        const id = params.id
        const data=await RoomServices.getMyReview(id)
        return { props: {data} }
    } catch (err) {
        console.log(err);
        return { props: {} }
    }
}
  
export default MyReviews;