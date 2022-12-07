import React, { useState } from 'react';
import {Grid} from '@mui/material'
import ReviewListCard from './ReviewListCard';
import { useReviewUpdateMutation,useReviewDeleteMutation} from '../../../app/apiSlice/reviewApiSlice';
import { useLikeCreateMutation, useLikeDeleteMutation } from '../../../app/apiSlice/likeApiSlice';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import { useRoomReviewAndRatingUpdateMutation } from '../../../app/apiSlice/roomApiSlice';


const ReviewList = ({singleRoomData,setSingleRoomData}:any) => {
    const sortedReviews = singleRoomData?.reviews.sort((a:any, b:any) => String(b.created_at).localeCompare(String(a.created_at)));
    const loggedInUser=useAppSelector(selectCurrentUser)
    const [openReviewAction,setOpenReviewAction]=useState(null)
    const [editReviewOpen,setEditReviewOpen]=useState(false)
    const [reviewUpdate,{isLoading,isError}]=useReviewUpdateMutation()
    const [reviewDelete,{isLoading:loading}]=useReviewDeleteMutation()
    const [likeCreate]=useLikeCreateMutation()
    const [likeDelete]=useLikeDeleteMutation()
    const [roomReviewAndRatingUpdate]=useRoomReviewAndRatingUpdateMutation()

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
   
    
    const handleDeleteReview=async(reviewId:any,roomId:any,rating:any)=>{
       try {
          const {data}:any=await reviewDelete({reviewId,roomId})
          if(data.message==='success'){
            const filterNewReviews=singleRoomData.reviews.filter((review:any)=>review._id !== reviewId)
            const updateNewReviews={
              ...singleRoomData,
              reviews:filterNewReviews
            }
            setSingleRoomData(updateNewReviews)
            
            const updateRoomReviewAndRate={
              roomId:singleRoomData._id,
              countReviews: Number(singleRoomData?.countReviews) - 1,
              rate: Number(singleRoomData?.rate) - rating,
            }
          const {data:updateRoomRate}:any=await roomReviewAndRatingUpdate(updateRoomReviewAndRate)
          console.log(updateRoomRate);
           
          }
       } catch (error) {
        console.log(error);
       }
      setOpenReviewAction(null)
    }

    
    const onToggleLikeSubmit=async(reviewId:any,isLiked:any)=>{
       try {
          if(isLiked){
            const reviewFilter=sortedReviews.filter((review:any)=>review._id===reviewId)
            const likeFilter=reviewFilter[0].likes.filter((like:any)=>like.userId===loggedInUser?._id)
            const {data}:any=await likeDelete({likeId:likeFilter[0]._id,reviewId})

       
              const newLike= reviewFilter[0].likes.filter((like:any) => like._id !== likeFilter[0]._id)
              const updateLike={
               ...reviewFilter[0],
               likes:[...newLike]
              }
              const oldReviews = singleRoomData?.reviews.filter((review:any) => review._id !== updateLike._id);
              const updateSingleRoomData={
                ...singleRoomData,
                reviews:[...oldReviews,updateLike]
              }
              setSingleRoomData(updateSingleRoomData)

          }else{
            const {data}:any=await likeCreate({reviewId})
            const likeFilter=singleRoomData.reviews.filter((review:any)=>review._id=== data.reviewId)

              const oldLike= likeFilter[0].likes.filter((like:any) => like._id !== data._id)
              const updateLike={
               ...likeFilter[0],
               likes:[...oldLike,data]
              }
            const oldReviews = singleRoomData?.reviews.filter((review:any) => review._id !== updateLike._id);
            const updateSingleRoomData={
              ...singleRoomData,
              reviews:[...oldReviews,updateLike]
            }
            setSingleRoomData(updateSingleRoomData)
          }

       } catch (error) {
         console.log(error);
         
       }
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
              onToggleLikeSubmit={onToggleLikeSubmit}
             />)}
            </Grid>
        </div>
    );
};

export default ReviewList;