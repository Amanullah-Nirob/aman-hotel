import Head from 'next/head';
import React from 'react';
import { useBookingGetByUserIdQuery } from '../../../app/apiSlice/bookingApiSlice';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import {Box,CircularProgress,Grid} from '@mui/material'
import BookingCard from '../../../components/account/booking/BookingCard';
import { useAppSelector } from '../../../app/hooks';

const Booking = () => {
    const loggedInUser=useAppSelector(selectCurrentUser)
    const { data, error, isLoading, isSuccess } =useBookingGetByUserIdQuery(loggedInUser._id)
    console.log(data);
    
    return (
        <>
        <Head>
            <title>Booking - Account | Aman-Hotel</title>
        </Head>
         <div className='myBooking_main'>
            <div className='myBooking_title'>
                <h2>My Booking</h2>
            </div>
            {!isLoading?(
            <Grid container spacing={2}>
                {data?.map((booking:any)=>(
                      <BookingCard booking={booking} key={booking._id}/> 
                ))}
            </Grid>
            ):(
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
            )}
         </div>
        </>
    );
};

export default Booking; 