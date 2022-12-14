import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import { dmSansFont } from '../../../utils/nextFont';
import {Paper,Grid,Button} from '@mui/material' 
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Image from 'next/image';
import bookingNotFound from '../../../../public/static/images/upcoming_not.svg'
import Head from 'next/head';
import { useBookingGetByUserIdQuery } from '../../../app/apiSlice/bookingApiSlice';
import Link from 'next/link';
import { selectTheme } from '../../../app/slices/theme/ThemeSlice';
import { selectFavorites } from '../../../app/slices/favorites/Favorites';
import { useMyReviewGetByIdQuery } from '../../../app/apiSlice/reviewApiSlice';
import { useMyLikesGetByIdQuery } from '../../../app/apiSlice/likeApiSlice';
import RoomCard from '../../../components/rooms/roomsMainContent/roomList/roomCard/RoomCard';
import { getDateDDMMYYYY } from '../../../utils/formatDate';
import BookingCard from '../../../components/account/booking/BookingCard';

const Dashboard = () => {
    const loggedInUser=useAppSelector(selectCurrentUser)
    const {data}:any=useBookingGetByUserIdQuery(loggedInUser._id)
    const {data:myreviews}:any=useMyReviewGetByIdQuery(loggedInUser._id)
    const {data:myLikes}:any=useMyLikesGetByIdQuery(loggedInUser._id)
    const favoriteCount=useAppSelector(selectFavorites)
    const theme=useAppSelector(selectTheme)

    
    return (
      <>
        <Head>
          <title>Dashboard - Account | Aman-Hotel</title>
        </Head>
        <div className='Dashboard_main'>
            <div className="dashboard_all_content">
                <div className="dashboard_title">
                    <h2 className={dmSansFont.className}>Hello, {loggedInUser?.name}! <span className='wave'>👋</span></h2>
                </div>
                <div className="dashboard_main_content_box">
                   <Grid container spacing={2}>
                        <Grid item sm={3} xs={6}>
                          <Paper className="box" elevation={2}>
                            <Link href={`/account/booking`} style={{color:theme==='light'?'#000':'#fff'}}>
                            <DateRangeOutlinedIcon sx={{color:'rgb(92, 152, 242)',fontWeight:'bold',fontSize:'40px'}} />
                            <div className="box_info">
                                <h1>{data?.length>0?data.length : 0}</h1>
                                <p>Bookings</p>
                            </div>
                            </Link>
                          </Paper>
                        </Grid>
                        <Grid item sm={3} xs={6}>
                          <Paper className="box" elevation={2}>
                          <Link href={`/account/review/${loggedInUser._id}`} style={{color:theme==='light'?'#000':'#fff'}}>
                            <StarOutlineIcon sx={{color:'rgb(92, 152, 242)',fontWeight:'bold',fontSize:'40px'}} />
                            <div className="box_info">
                                <h1>{myreviews?.length ? myreviews?.length:0 }</h1>
                                <p>Reviews</p>
                            </div>
                            </Link>
                          </Paper>
                        </Grid>
                        <Grid item sm={3} xs={6}>
                          <Paper className="box" elevation={2}>
                          <Link href={`/account/favorites`} style={{color:theme==='light'?'#000':'#fff'}}>
                          <FavoriteBorderIcon sx={{color:'rgb(92, 152, 242)',fontWeight:'bold',fontSize:'40px'}} />
                            <div className="box_info">
                                <h1>{favoriteCount.length}</h1>
                                <p>Favorites</p>
                            </div>
                          </Link>
                          </Paper>
                        </Grid>
                        <Grid item sm={3} xs={6}>
                          <Paper className="box" elevation={2}>
                          <Link href={`/account/likes/${loggedInUser._id}`} style={{color:theme==='light'?'#000':'#fff'}}>
                            <ThumbUpOutlinedIcon sx={{color:'rgb(92, 152, 242)',fontWeight:'bold',fontSize:'40px'}} />
                            <div className="box_info">
                                <h1>{myLikes?.length}</h1>
                                <p>Likes</p>
                            </div>
                            </Link>
                          </Paper>
                        </Grid>
                   </Grid>
                </div>
                <div className="upcoming_booking_main">
                    <div className="upTitle">
                        <h1 className={dmSansFont.className}>Your upcoming bookings</h1>
                    </div>
                    {data?.length>0?(
                    <div className="upcoming_booking_content">
                      <Grid container spacing={2}>
                        {/* {data.map((booking:any)=>(
                            <BookingCard key={booking._id} booking={booking}/>
                        ))} */}
                            <BookingCard  booking={data.slice(-1)[0]}/>
                      </Grid>
                    </div>
                    ):(
                      <div className="upcoming_booking_not_found">
                        <div className="image">
                        <Image src={bookingNotFound} alt='home banner image' fill
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        10vw"
                         />
                        </div>
                        <h2 className={dmSansFont.className}>You have no upcoming bookings!</h2>
                    </div>
                    )}
                    
                    
                    <div className="viewRoomsBtn">
                     <Button variant="contained"> View All Rooms</Button>
                    </div>
                </div>
            </div>
        </div>
      </>
      
    );
};

export default Dashboard;