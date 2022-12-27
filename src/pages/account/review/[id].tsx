import React, { useState } from 'react';
import RoomCard from '../../../components/rooms/roomsMainContent/roomList/roomCard/RoomCard';
import RoomServices from '../../../services/RoomServices';
import {Grid, Paper} from '@mui/material'
import ReviewList from '../../../components/rooms/reviews/ReviewList';
import Head from 'next/head';
const MyReviews = ({data}:any) => {
    const [reviewsData,setReviewsData]=useState(data)

   const updateReviews=(updateReviews:any)=>{
     const updateData=reviewsData.filter((review:any)=>review.roomId?._id === updateReviews._id)
     const finalUpdate={
        ...updateData[0],
        roomId:updateReviews
    }
    const prevReviewData=reviewsData.map((prevReview:any)=>prevReview._id !== finalUpdate._id? prevReview: finalUpdate)
    setReviewsData(prevReviewData);
  }
  
 
    return (
        <>
        <Head>
            <title>Review- Account | Aman-Hotel</title>
        </Head>
        <div className='myReview_main'>
            <Grid container>
            {reviewsData.map((review:any)=>(
                <Grid item xs={12} key={review._id} sx={{paddingBottom:'26px'}}>
                    <Grid container spacing={2}>
                        <Grid item sm={8} xs={12}>
                        <Paper className='myReview_content' variant="outlined">
                        <ReviewList myReview={true} singleRoomData={review.roomId} setSingleRoomData={updateReviews}></ReviewList>
                        </Paper>
                        </Grid> 
                        <Grid item sm={4} xs={12}>
                        <div className='review_room_card_main'>
                        <RoomCard {...review.roomId}></RoomCard>
                        </div>
                        </Grid> 
                    </Grid>
                </Grid>
            ))}
            </Grid>
           
        </div>
        </>

    );
};

export const getServerSideProps = async ({ params }: any) => {
    try {
        const id = params.id
        const TemData=await RoomServices.getMyReview(id)
        const ids = TemData.map((o:any) => o.roomId._id)
        const filteredReviews =TemData.filter((reviewData:any, index:any) => !ids.includes(reviewData.roomId._id, index + 1))         
        return { props: {data:filteredReviews} }
    } catch (err) {
        console.log(err);
        return { props: {} }
    }
}
  
export default MyReviews;