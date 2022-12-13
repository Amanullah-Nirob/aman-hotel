import Head from 'next/head';
import React from 'react';
import { useBookingGetByUserIdQuery } from '../../../app/apiSlice/bookingApiSlice';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import {Box,CircularProgress,Grid} from '@mui/material'
import BookingCard from '../../../components/account/booking/BookingCard';
import { useAppSelector } from '../../../app/hooks';
import { dmSansFont } from '../../../utils/nextFont';

const Booking = () => {
    const loggedInUser=useAppSelector(selectCurrentUser)
    const { data, error, isLoading, isSuccess } =useBookingGetByUserIdQuery(loggedInUser._id)
    
    return (
        <>
        <Head>
            <title>Booking - Account | Aman-Hotel</title>
        </Head>
         <div className='myBooking_main'>
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