import React,{useEffect,useState} from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import { dmSansFont } from '../../../utils/nextFont';
import { selectTheme } from '../../../app/slices/theme/ThemeSlice';

const ReviewLike = ({review,onToggleLikeSubmit}:any) => {
    const loggedInUser=useAppSelector(selectCurrentUser)
    const theme=useAppSelector(selectTheme)
    const isLiked = review?.likes?.some((like:any) => like.userId === loggedInUser?._id);
    const [status, setStatus] = useState(false);
    
    useEffect(() => { 
      if (loggedInUser) {
        setStatus(isLiked); 
      }
    }, [review?.likes, loggedInUser]);

    return (
     <IconButton
        aria-label='like'
        onClick={()=>onToggleLikeSubmit(review._id,isLiked)}
        disableRipple
        disabled={!loggedInUser}
        sx={{
          border:'1px solid',
          borderColor:theme==='light'?'#d7d7d7':'#585858',
          padding:'3px 10px',
          borderRadius:'0'

      }}
      >

        <div className='like-button_content'>
          {status ? <ThumbUpAltIcon sx={{color:'#5c98f2',fontSize:'17px'}} /> : <ThumbUpAltOutlinedIcon sx={{fontSize:'17px'}} />}
          <span className={dmSansFont.className} style={{color:status?'#5c98f2':''}}>Like {review?.likes?.length}</span>
        </div>
      </IconButton>
    );
};

export default ReviewLike;