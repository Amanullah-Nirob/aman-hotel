import React from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';

const ReviewLike = ({review,onToggleLikeSubmit}:any) => {
    const loggedInUser=useAppSelector(selectCurrentUser)
    const isLiked = review?.likes?.some((like:any) => like.userId === loggedInUser?._id);

    return (
     <IconButton
        aria-label='like'
        onClick={()=>onToggleLikeSubmit(review._id,isLiked)}
        disableRipple
        disabled={!loggedInUser}
      >
        <span>like</span>
        <span style={{marginLeft:'10px'}}>{review?.likes?.length}</span>
        {/* <div className='like-button__wrapper'>
          {status ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          {displayCount}
        </div> */}
      </IconButton>
    );
};

export default ReviewLike;