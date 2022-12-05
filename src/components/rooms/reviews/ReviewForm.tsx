import React from 'react';
import {Button} from '@mui/material'
import { Form, useForm } from '../../../hooks/useForm';
import { ReviewType } from '../../../types/types';
import reviewValidateConfig from '../../../utils/validator/validatorConfig/reviewValidateConfig';
import RatingField from '../../element/feilds/InputField/RatingField';
import TextAreaField from '../../element/feilds/InputField/TextAreaField';
import { useReviewCreateMutation } from '../../../app/apiSlice/reviewApiSlice';

const ReviewForm = ({singleRoomData,setSingleRoomData}:any) => {

    const initialData = { 
        content: '' as ReviewType['content'], 
        likes: [], 
        rating: 5 as ReviewType['rating'],
        roomId: singleRoomData?._id
    };
    
    const { data:reviewData, errors, handleInputChange, validate, handleResetForm } = useForm(initialData, true, reviewValidateConfig);
    const [reviewCreate,{isLoading,isError}]=useReviewCreateMutation()

    const handleSubmit = async(e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validate(reviewData)) {
            const {data}:any=await reviewCreate(reviewData)
            const allReviews = singleRoomData.reviews;
            const updateSingleRoomData={
                ...singleRoomData,
                reviews:[...allReviews,data]
            }
            setSingleRoomData(updateSingleRoomData);
            handleResetForm(e)
        }
    };
     
    return (
        <Form data={reviewData} errors={errors} handleChange={handleInputChange}>
            <TextAreaField label='Leave feedback' name='content' />
            <RatingField name='rating' label='your mark:' size='large' />
            <Button variant='contained' sx={{width:'100%',marginBottom:'15px'}} onClick={handleSubmit} type='submit'>
              Submit
            </Button>
        </Form>
    );
};

export default ReviewForm;