import React, { useState } from 'react';
import {Grid} from '@mui/material'
import ReviewListCard from './ReviewListCard';
import { useReviewUpdateMutation,useReviewDeleteMutation} from '../../../app/apiSlice/reviewApiSlice';

const ReviewList = ({singleRoomData,setSingleRoomData}:any) => {
    const sortedReviews = singleRoomData?.reviews.sort((a:any, b:any) => String(b.created_at).localeCompare(String(a.created_at)));

    const [openReviewAction,setOpenReviewAction]=useState(null)
    const [editReviewOpen,setEditReviewOpen]=useState(false)
    const [reviewUpdate,{isLoading,isError}]=useReviewUpdateMutation()
    const [reviewDelete,{isLoading:loading}]=useReviewDeleteMutation()

    const handleClickEditReview=()=>{
      setEditReviewOpen(true)
      setOpenReviewAction(null)
    }

    const handleSubmitEditReview=async(updateReview: any)=>{
       try {
        const updateContent = { 
            _id: updateReview._id, 
            rating: updateReview.rating, 
            roomId: updateReview.roomId, 
            content: updateReview?.content 
        };
        const {data}:any=await reviewUpdate(updateContent)
        const reviewFilter = singleRoomData?.reviews.filter((review:any) => review._id !== data._id);
        const updateSingleRoomData={
            ...singleRoomData,
            reviews:[...reviewFilter,data]
        }
        setSingleRoomData(updateSingleRoomData)
        setEditReviewOpen(false)
       } catch (error) {
         console.log(error);
       }
    }
   
    
    const handleDeleteReview=async(reviewId:any,roomId:any)=>{
       try {
          const {data}:any=await reviewDelete({reviewId,roomId})
          if(data.message==='success'){
            const filterNewReviews=singleRoomData.reviews.filter((review:any)=>review._id !== reviewId)
            const updateNewReviews={
              ...singleRoomData,
              reviews:filterNewReviews
            }
            setSingleRoomData(updateNewReviews)
          }
       } catch (error) {
        console.log(error);
       }
      setOpenReviewAction(null)
    }

    return (
        <div className='review_list_contents'>
            <Grid container spacing={2}>
             {sortedReviews?.map((review:any)=> <ReviewListCard key={review?._id} review={review} 
              handleClickEditReview={handleClickEditReview}
              handleDeleteReview={handleDeleteReview}
              openReviewAction={openReviewAction}
              setOpenReviewAction={setOpenReviewAction}
              editReviewOpen={editReviewOpen}
              handleSubmitEditReview={handleSubmitEditReview}
              setEditReviewOpen={setEditReviewOpen}
             />)}
            </Grid>
        </div>
    );
};

export default ReviewList;