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

const Dashboard = () => {
    const loggedInUser=useAppSelector(selectCurrentUser)

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
                   <Grid container spacing={5}>
                        <Grid item sm={3}>
                          <Paper className="box" elevation={2}>
                            <DateRangeOutlinedIcon sx={{color:'rgb(92, 152, 242)',fontWeight:'bold',fontSize:'40px'}} />
                            <div className="box_info">
                                <h1>0</h1>
                                <p>Bookings</p>
                            </div>
                          </Paper>
                        </Grid>
                        <Grid item sm={3}>
                          <Paper className="box" elevation={2}>
                            <StarOutlineIcon sx={{color:'rgb(92, 152, 242)',fontWeight:'bold',fontSize:'40px'}} />
                            <div className="box_info">
                                <h1>0</h1>
                                <p>Reviews</p>
                            </div>
                          </Paper>
                        </Grid>
                        <Grid item sm={3}>
                          <Paper className="box" elevation={2}>
                            <FavoriteBorderIcon sx={{color:'rgb(92, 152, 242)',fontWeight:'bold',fontSize:'40px'}} />
                            <div className="box_info">
                                <h1>0</h1>
                                <p>Favorites</p>
                            </div>
                          </Paper>
                        </Grid>
                        <Grid item sm={3}>
                          <Paper className="box" elevation={2}>
                            <ThumbUpOutlinedIcon sx={{color:'rgb(92, 152, 242)',fontWeight:'bold',fontSize:'40px'}} />
                            <div className="box_info">
                                <h1>0</h1>
                                <p>Likes</p>
                            </div>
                          </Paper>
                        </Grid>
                   </Grid>
                </div>
                <div className="upcoming_booking_main">
                    <div className="upTitle">
                        <h1 className={dmSansFont.className}>Your upcoming bookings</h1>
                    </div>
                    <div className="upcoming_booking_content">
                    </div>
                    <div className="upcoming_booking_not_found">
                        <div className="image">
                        <Image src={bookingNotFound} alt='home banner image' fill
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        10vw"
                        placeholder="blur" blurDataURL={`/_next/image?url=${bookingNotFound}&w=16&q=1`} />
                        </div>
                        <h2 className={dmSansFont.className}>You have no upcoming bookings!</h2>
                    </div>
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