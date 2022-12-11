import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import declOfNum from '../../../utils/declOfNum';
import { dmSansFont } from '../../../utils/nextFont';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { selectTheme } from '../../../app/slices/theme/ThemeSlice';
import Rating from '../../common/rating/Rating';

const Review = ({singleRoomData,setSingleRoomData}:any) => {
    const loggedInUser=useAppSelector(selectCurrentUser)
    const totalReviewsCount = singleRoomData?.reviews?.length;
    const theme=useAppSelector(selectTheme)
    const ratingValue = +(singleRoomData?.rate / singleRoomData?.countReviews).toFixed(2);
    return (
        <div className='review_main' style={{borderColor:theme==='light'?'#ddd':'rgb(78 78 78)'}}>
                <div className='room-info_card'>
                    <h2 className={dmSansFont.className}>Overall rating  of {singleRoomData?.countReviews} Total</h2>
                    {singleRoomData?.countReviews > 0 ? (
                        <>
                        <p className='room-info_card-rating_title'>
                        <span style={{color:theme==='light'?'#5c5757':'rgb(215 215 215)'}}>{ratingValue}</span>
                        <span>Out of 5 stars</span>
                        </p>
                        <Rating value={ratingValue} name='rating' precision={0.1} readOnly size='large' />
                        </>
                    ) : (
                        <>
                        <h3>No reviews yet</h3>
                        </>
                    )}
                </div>
            <div className='review_main_title'>
                <div className='title_main'>
                <h2 className={dmSansFont.className}>Reviews and ratings</h2>
                <ArrowForwardIcon sx={{color:'rgb(95,99,104)',fontSize:'22px',marginTop:'6px'}} />
                </div>
                <p className={dmSansFont.className}>{`${totalReviewsCount} ${declOfNum(totalReviewsCount, ['review', 'reviews', 'reviews'])}`}</p>
            </div>
             <div className="review_list_main">
             {totalReviewsCount > 0 && <ReviewList singleRoomData={singleRoomData} setSingleRoomData={setSingleRoomData}></ReviewList>}
             </div>

             <div className="review_form">
             {loggedInUser && (
               <ReviewForm singleRoomData={singleRoomData} setSingleRoomData={setSingleRoomData} />
            )}
             </div>
        </div>
    );
};

export default Review;