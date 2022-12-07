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
        <Form data={reviewData} errors={errors} handleChange={handleInputChange}>
            <TextAreaField label='Leave feedback' name='content' />
            <RatingField name='rating' label='your mark:' size='large' />
            <LoadingButton variant="contained" type='submit' loading={isLoading?true:false}
               sx={{width:'100%',marginBottom:'15px'}} onClick={handleSubmit}>
              Submit
            </LoadingButton>
        </Form>
    );
};

export default ReviewForm;