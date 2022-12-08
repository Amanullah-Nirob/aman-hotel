import React,{useState} from 'react';
import {Grid,Avatar,IconButton,Button} from '@mui/material'
import formatDate from '../../../utils/formatDate';
import Rating from '../../common/rating/Rating';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { selectTheme } from '../../../app/slices/theme/ThemeSlice';
import ReviewAction from '../../menus/ReviewAction';
import TextAreaField from '../../element/feilds/InputField/TextAreaField';
import RatingField from '../../element/feilds/InputField/RatingField';
import { Form, useForm } from '../../../hooks/useForm';
import reviewValidateConfig from '../../../utils/validator/validatorConfig/reviewValidateConfig';
import ReviewLike from './ReviewLike';


const ReviewListCard = ({
    review,
    handleDeleteReview,
    handleSubmitEditReview,
    onToggleLikeSubmit
}:any) => {
    const loggedInUser=useAppSelector(selectCurrentUser)
    const theme=useAppSelector(selectTheme)
    const isAdmin = loggedInUser?.role === 'admin';
    const isAuthor = review.userId?._id === loggedInUser?._id;
    const isAuthorOrAdmin= isAdmin || isAuthor;
    const [editMode, setEditMode] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const initialData = { 
        content: review?.content, 
        rating: review?.rating,
    };
    const { data, errors, handleInputChange, validate, handleResetForm } = useForm(initialData, false, reviewValidateConfig);

    
    const displayReviewData = () => {
        if (review.created_at !== review.updated_at) {
          return `edited: ${formatDate(review?.updated_at || '')}`;
        }
        return formatDate(review?.created_at || '');
    };
    
    const handleEditReviewOpen=()=>{
        setEditMode(true)
        setAnchorEl(null);
    }

    const submitEditReview=(updateReview:any,prevRating:any)=>{
        handleSubmitEditReview(updateReview,prevRating)
        setAnchorEl(null);
        setEditMode(false)
    }
    const handleClose = () => {
        setEditMode(false)
        setAnchorEl(null);
      };

    return (
        <Grid item xs={12} key={review?._id}>
        <div className="review_list">
            <div className="list_content">
                <div className="review_user_avatar">
                    <Avatar src={review?.userId?.profilePic} alt='review user profile photo' sx={{width:'50px',height:'50px'}} />
                </div>
                    {!editMode? (
                        <div className="review_content_info">
                        <div className="content" style={{backgroundColor:theme==='light'?'#f0f2f5':'#303030'}}>
                        <h4>{review?.userId?.name}</h4>
                        <p>{review?.content}</p>
                        </div>
                        <div className="timeAndLike_area">
                        <span className='review_date'>{displayReviewData()}</span>
                        <ReviewLike review={review} onToggleLikeSubmit={onToggleLikeSubmit}></ReviewLike>
                        </div>
                        {isAuthorOrAdmin && (
                            <>
                            <IconButton sx={{padding:'5px 7px 1px 7px'}} className='reviewOptionsIcon' onClick={(event: React.MouseEvent<HTMLButtonElement>)=>setAnchorEl(event.currentTarget)}>
                            <span> <MoreHorizIcon sx={{marginTop:'1px'}} /></span>
                            </IconButton>
                            </>
                        )}
                        <ReviewAction 
                        openReviewAction={anchorEl} 
                        setOpenReviewAction={setAnchorEl}
                        handleEditReviewOpen={handleEditReviewOpen}
                        handleDeleteReview={handleDeleteReview}
                        isAuthorOrAdmin={isAuthorOrAdmin}
                        isAuthor={isAuthor}
                        review={review}
                        />

                        </div>
                    ):(
                        <div className='review_edit_form'>
                            <Form data={data} errors={errors} handleChange={handleInputChange}>
                            <TextAreaField value={data.content} label='Leave feedback' name='content' />
                            <RatingField value={data.rating}  name='rating' label='your mark:' size='large' />
                            <Button disabled={data.content === ""}  variant='outlined' size='small' style={{ marginTop: '5px' }} 
                            onClick={()=>submitEditReview({...review,content:data.content,rating:data.rating},review?.rating)}>
                            update
                            </Button>
                            <Button variant='outlined' size='small' style={{ marginTop: '5px' }} 
                            onClick={handleClose}>
                            close
                            </Button>
                            </Form>
                        </div>
                    )}
            </div>
            <div className='review_rating'>
                <Rating value={review.rating} readOnly />
            </div>
        </div>
    </Grid>
    );
};

export default ReviewListCard;