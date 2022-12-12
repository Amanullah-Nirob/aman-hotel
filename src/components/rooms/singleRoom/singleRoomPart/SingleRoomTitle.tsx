import React from 'react';
import {Divider,Paper, Button} from '@mui/material'
import { dmSansFont,dmFont,roboto } from '../../../../utils/nextFont';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NumbersIcon from '@mui/icons-material/Numbers';
import KingBedOutlinedIcon from '@mui/icons-material/KingBedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { addFavorite, removeFavorite, selectFavorites } from '../../../../app/slices/favorites/Favorites';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '../../../common/rating/Rating';

const SingleRoomTitle = ({data,theme}:any) => {
    const favoritesList=useAppSelector(selectFavorites)
    const dispatch=useAppDispatch()
    const countReviews = data.reviews ? data.reviews.length : 0;
    // @ts-ignore
    const rating = countReviews > 0 ? data.reviews.reduce((acc, cur) => acc + cur.rating, 0) : 0;

    const isRoomInFavoritesList = favoritesList?.some((favorite:any) => favorite._id === data._id);
    const handleWishlistChange=(room:any)=>{
      if(isRoomInFavoritesList){
         dispatch(removeFavorite(room))
      }else{
        dispatch(addFavorite(room))
      }
    }
    return (
        <Paper variant="outlined"  className="single_room_info">
        <div className="roomInfoTileBoxMain">
            <div className="rtTop">
               <div className='data_room_type'>
                 <Paper  elevation={2}  className='rtType'>{data?.type}</Paper>
               </div>
               <div className="data_room_share_save">
               <Button sx={{textTransform:'capitalize'}} variant="text" startIcon={<IosShareOutlinedIcon />}>Share</Button>
               <Button sx={{textTransform:'capitalize'}} variant="text" startIcon={isRoomInFavoritesList?<FavoriteIcon/>:<FavoriteBorderOutlinedIcon />} onClick={()=>handleWishlistChange(data)}>Save</Button>
               </div>
            </div>
            <div className="rtTitleMain">
                 <h1 className={dmSansFont.className}>{data?.title}</h1>
                <div className={dmSansFont.className+" moreInfo"}>
                <div className='rating'>
                  <div className="starRating">
                  <Rating name='read-only' value={rating} totalCount={countReviews} readOnly />
                  </div>
                    <p>({data?.countReviews})</p>
                </div>
                <div className="roomNumber">
                   <NumbersIcon sx={{color:'#388e3c'}}/> 
                    <p>Room Number: {data?.roomNumber}</p>
                </div>
                </div>
            </div>
            <Divider />
            <div className={"rtTitleBottom"}>
               <div className="guestInfoRoom">
               <PersonOutlineIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848',fontSize:'26px' }} /> <p>2 guests</p>
               </div>
               <div className="guestInfoRoom">
               <KingBedOutlinedIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848', fontSize:'26px'}}/> <p>1 beds</p>
               </div>
               <div className="guestInfoRoom">
               <BathtubOutlinedIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848',fontSize:'26px' }}/> <p>1 baths (Shared)</p>
               </div>
               <div className="guestInfoRoom">
               <MeetingRoomOutlinedIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848',fontSize:'26px' }}/> <p>1 bedrooms</p>
               </div>
               <div className="guestInfoRoom">
               <HomeOutlinedIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848', fontSize:'26px'}}/> <p>Shared</p>
               </div>
            </div>
        </div>
        </Paper>
    );
};

export default SingleRoomTitle;