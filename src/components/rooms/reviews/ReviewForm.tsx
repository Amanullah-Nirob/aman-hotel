import React from 'react';
import {Button} from '@mui/material'
import { Form, useForm } from '../../../hooks/useForm';
import { ReviewType } from '../../../types/types';
import reviewValidateConfig from '../../../utils/validator/validatorConfig/reviewValidateConfig';
import RatingField from '../../element/feilds/InputField/RatingField';
import TextAreaField from '../../element/feilds/InputField/TextAreaField';
import { useReviewCreateMutation } from '../../../app/apiSlice/reviewApiSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRoomReviewAndRatingUpdateMutation } from '../../../app/apiSlice/roomApiSlice';
import { dmSansFont } from '../../../utils/nextFont';

const ReviewForm = ({singleRoomData,setSingleRoomData}:any) => {

    const initialData = { 
        content: '' as ReviewType['content'], 
        likes: [], 
        rating: 5 as ReviewType['rating'],
        roomId: singleRoomData?._id
    };
    
    const { data:reviewData, errors, handleInputChange, validate, handleResetForm } = useForm(initialData, true, reviewValidateConfig);
    const [reviewCreate,{isLoading,isError}]=useReviewCreateMutation()
    const [roomReviewAndRatingUpdate]=useRoomReviewAndRatingUpdateMutation()

    const handleSubmit = async(e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validate(reviewData)) {
            const {data}:any=await reviewCreate(reviewData)
            const allReviews = singleRoomData.reviews;

            const updateRoomReviewAndRate={
                roomId:singleRoomData._id,
                countReviews: (singleRoomData?.countReviews || 0) + 1, 
                rate: Number(singleRoomData?.rate) + Number(data.rating),
            }
            const {data:updateRoomRate}:any=await roomReviewAndRatingUpdate(updateRoomReviewAndRate)
            
            const updateSingleRoomData={
                ...singleRoomData,
                reviews:[...allReviews,data],
                countReviews:updateRoomRate.countReviews,
                rate:updateRoomRate.rate
            }
           
            
            setSingleRoomData(updateSingleRoomData);
            handleResetForm(e)
        }
    };
     
    return (
       <div className="reviewForm">
        <div className="review_form_title">
        <h2 className={dmSansFont.className}>Rate this Room</h2>
        <p>Tell others what you think.</p>
        </div>
          <Form data={reviewData} errors={errors} handleChange={handleInputChange}>
            <TextAreaField label='Leave feedback' name='content' />
            <RatingField name='rating' label='Marks:' size='medium' />
            <LoadingButton variant="contained" type='submit' loading={isLoading?true:false}
               sx={{width:'100%',margin:'15px 0'}} onClick={handleSubmit}>
              Submit
            </LoadingButton>
        </Form>
       </div>
    );
};

export default ReviewForm;