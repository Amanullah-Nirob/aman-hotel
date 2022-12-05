import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import declOfNum from '../../../utils/declOfNum';
import { dmSansFont } from '../../../utils/nextFont';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

const Review = ({singleRoomData,setSingleRoomData}:any) => {
    const loggedInUser=useAppSelector(selectCurrentUser)
    const sortedReviews = singleRoomData?.reviews.sort((a:any, b:any) => String(b.created_at).localeCompare(String(a.created_at)));
    const totalReviewsCount = sortedReviews.length;

    return (
        <div className='review_main'>
            <div className='review_main_title'>
                <h2 className={dmSansFont.className}>Reviews of this room</h2>
                <p>{`${totalReviewsCount} ${declOfNum(totalReviewsCount, ['review', 'reviews', 'reviews'])}`}</p>
            </div>
             <div className="review_list_main">
             {totalReviewsCount > 0 && <ReviewList reviews={sortedReviews} setSingleRoomData={setSingleRoomData}></ReviewList>}
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