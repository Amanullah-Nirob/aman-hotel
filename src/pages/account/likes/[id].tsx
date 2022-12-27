import { Grid, Paper } from '@mui/material';
import Head from 'next/head';
import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import ReviewList from '../../../components/rooms/reviews/ReviewList';
import RoomCard from '../../../components/rooms/roomsMainContent/roomList/roomCard/RoomCard';
import RoomServices from '../../../services/RoomServices';

const MyLikes = ({data}:any) => {
    const [likesData,setLikesData]=useState(data)
    const loggedInUser=useAppSelector(selectCurrentUser)
    const updateReviews=(updateReviews:any)=>{  
        const updateData=likesData.filter((like:any)=>like.reviewId?.roomId?._id === updateReviews._id)
        const localLikesUpdate={
           ...updateData[0].reviewId,
           roomId:updateReviews
       }
        const mainLikesUpdate={
           ...updateData[0],
           reviewId:localLikesUpdate
       }
       
       const newLikesData=likesData.map((prevLikes:any)=>prevLikes._id !== mainLikesUpdate._id? prevLikes: mainLikesUpdate)
       setLikesData(newLikesData);
    }
    
    
    
    return (
        <>
        <Head>
            <title>Review- Account | Aman-Hotel</title>
        </Head>
        {likesData?.length > 0 ? (
            <div className='myReview_main'>
            <Grid container>
            {likesData.map((review:any)=>(
                <Grid item xs={12} key={review._id}>
                    <Grid container spacing={2}>
                        <Grid item sm={8} xs={12} >
                        <Paper className='myReview_content' variant="outlined">
                        <ReviewList myLikes={true} singleRoomData={review.reviewId.roomId} setSingleRoomData={updateReviews}></ReviewList>
                        </Paper>
                        </Grid> 
                        <Grid item sm={4} xs={12}>
                        <div className='review_room_card_main'>
                        <RoomCard {...review.reviewId.roomId}></RoomCard>
                        </div>
                        </Grid> 
                    </Grid>
                </Grid>
            ))}
            </Grid>
        </div>)
        : (
           <h3>No Like yet</h3>
         )
        }
        
        </>
    );
};

export const getServerSideProps = async ({ params }: any) => {
    try {
        const id = params.id
        const TemData=await RoomServices.getMyLikes(id)
        const ids = TemData.map((o:any) => o.reviewId.roomId._id)
        const filteredLikes =TemData.filter((likeData:any, index:any) => !ids.includes(likeData.reviewId.roomId._id, index + 1))         
        return { props: {data:filteredLikes} }
    } catch (err) {
        console.log(err);
        return { props: {} }
    }
}
export default MyLikes;