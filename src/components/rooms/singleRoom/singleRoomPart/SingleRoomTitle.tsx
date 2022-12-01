import React from 'react';
import {Divider,Paper, Button} from '@mui/material'
import { dmSansFont,dmFont,roboto } from '../../../../utils/nextFont';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NumbersIcon from '@mui/icons-material/Numbers';
import KingBedOutlinedIcon from '@mui/icons-material/KingBedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const SingleRoomTitle = ({data,theme}:any) => {
    return (
        <Paper variant="outlined"  className="single_room_info">
        <div className="roomInfoTileBoxMain">
            <div className="rtTop">
               <div className='data_room_type'>
                 <Paper  elevation={2}  className='rtType'>{data?.type}</Paper>
               </div>
               <div className="data_room_share_save">
               <Button sx={{textTransform:'capitalize'}} variant="text" startIcon={<IosShareOutlinedIcon />}>Share</Button>
               <Button sx={{textTransform:'capitalize'}} variant="text" startIcon={<FavoriteBorderOutlinedIcon />}>Save</Button>
               </div>
            </div>
            <div className="rtTitleMain">
                 <h1 className={dmSansFont.className}>{data?.title}</h1>
                <div className={dmSansFont.className+" moreInfo"}>
                <div className='rating'>
                    <StarBorderIcon sx={{fontSize:'27px',color:'#faaf00'}}/> 
                    <p>N/A ({data?.countReviews})</p>
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