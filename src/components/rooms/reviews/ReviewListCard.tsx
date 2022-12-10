import React,{useState} from 'react';
import {Grid,Avatar,IconButton,Button,Divider, useMediaQuery} from '@mui/material'
import formatDate from '../../../utils/formatDate';
import Rating from '../../common/rating/Rating';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { selectTheme } from '../../../app/slices/theme/ThemeSlice';
import ReviewAction from '../../menus/ReviewAction';
import TextAreaField from '../../element/feilds/InputField/TextAreaField';
import RatingField from '../../element/feilds/InputField/RatingField';
import { Form, useForm } from '../../../hooks/useForm';
import reviewValidateConfig from '../../../utils/validator/validatorConfig/reviewValidateConfig';
import ReviewLike from './ReviewLike';
import { dmSansFont } from '../../../utils/nextFont';


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
    const mobile= useMediaQuery('(max-width:600px)');
    const initialData = { 
        content: review?.content, 
        rating: review?.rating,
    };
    const { data, errors, handleInputChange, validate, handleResetForm } = useForm(initialData, false, reviewValidateConfig);

    const displayReviewData = () => {
        if (review.created_at !== review.updated_at) {
          return <>
          <span>Edited : </span> {formatDate(review?.updated_at || '')}
          </>;
        }
        return <>
        <span>Created : </span> {formatDate(review?.created_at || '')}
        </>;
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
// backgroundColor:theme==='light'?'#f0f2f5':'#303030'
    return (
        <Grid item xs={12} key={review?._id}>
        <div className="review_list">
            <div className="list_box">
                <div className="list_content_top">
                <div className="review_user_avatar">
                    <Avatar src={review?.userId?.profilePic} alt='review user profile photo' sx={{width:'40px',height:'40px'}} />
                    <h4 className={dmSansFont.className} style={{color:theme==='light'?'rgb(32,33,36)':'rgb(211 211 211)'}}>{review?.userId?.name}</h4>
                </div>
                <div className='review_rating'>
                    <Rating value={review.rating} readOnly size={'small'} />
                </div>
                </div>
             
                <div className='list_content_center'>
                <p style={{color:theme==='light'?'rgb(95,99,104)':'rgb(183 183 183)'}}>{displayReviewData()}</p>
                </div>
                    {!editMode? (
                        <div className="review_content_info">
                        <div className='name_content' style={{backgroundColor:theme==='light'?'#f0f2f5':'#020202'}}>
                        <p style={{color:theme==='light'?'#000':'rgb(225 222 222)'}}>{review?.content}</p>
                        </div>
                        <div className="likes_main">
                           <div className="likes_title">
                           <p>{review?.likes?.length} people found this review helpful</p>
                           </div>
                           <div className="newLikesRequest_menu">
                            <div className='newLikesRequest'>
                            <p>Did you find this helpful?</p>
                            <ReviewLike review={review} onToggleLikeSubmit={onToggleLikeSubmit}></ReviewLike>
                            </div>
                            {isAuthorOrAdmin && (
                            <>
                            <IconButton sx={{padding:'5px 7px 1px 7px'}} className='reviewOptionsIcon' onClick={(event: React.MouseEvent<HTMLButtonElement>)=>setAnchorEl(event.currentTarget)}>
                            <span> <MoreVertRoundedIcon sx={{marginTop:'1px'}} /></span>
                            </IconButton>
                            </>
                            )}
                           </div>
                        </div>
                       
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
                            <TextAreaField value={data.content} label='Edit Review' name='content' />
                            <RatingField value={data.rating}  name='rating' label='Mark:' size='medium' />
                             <div className="edit_review_action">
                             <Button disabled={data.content === ""}  variant='outlined' size='small' style={{marginRight:'15px' }} 
                                onClick={()=>submitEditReview({...review,content:data.content,rating:data.rating},review?.rating)}>
                                update
                            </Button>
                            <Button variant='outlined' size='small'
                                onClick={handleClose}>
                                close
                            </Button>
                             </div>
                            </Form>
                        </div>
                    )}
            </div>
            <Divider sx={{margin:'12px 0'}} />
        </div>
    </Grid>
    );
};

export default ReviewListCard;