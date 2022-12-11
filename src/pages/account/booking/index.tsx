import Head from 'next/head';
import React from 'react';
import { useBookingDeleteMutation, useBookingGetByUserIdQuery } from '../../../app/apiSlice/bookingApiSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import {Box,CircularProgress,Grid,Button} from '@mui/material'
import RoomCard from '../../../components/rooms/roomsMainContent/roomList/roomCard/RoomCard';
import { getDateDDMMYYYY } from '../../../utils/formatDate';
import { displayToast } from '../../../app/slices/ToastSlice';

const Booking = () => {
    const loggedInUser=useAppSelector(selectCurrentUser)
    const { data, error, isLoading, isSuccess } =useBookingGetByUserIdQuery(loggedInUser._id)
    const [bookingDelete]=useBookingDeleteMutation()
    const dispatch=useAppDispatch()
    const handleDeleteBooking=async(bookingId:string,roomId:string)=>{
      try {
        const data=await bookingDelete({bookingId,roomId}).unwrap()
        dispatch(  
            displayToast({ 
            title: "Booking deleted", 
            message:'Thank you again for deleting the booking', 
            type: "success", duration: 3000, positionVert: "top",
            positionHor: "center"
        }))
      } catch (error) {
        console.log(error);
      }
    }
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
                      <Grid item sm={4} key={booking._id}>
                      <div className='booking_content'>
                      <table className='booking-info'>
                            <tbody className='booking-info__body'>
                            <tr className='booking-info__item'>
                                <td>Check-in</td>
                                <td>
                                <span>{`${getDateDDMMYYYY(booking.arrivalDate)}`}</span>
                                </td>
                            </tr>
                            <tr className='booking-info__item'>
                                <td>Check-out</td>
                                <td>
                                <span>{`${getDateDDMMYYYY(booking.departureDate)}`}</span>
                                </td>
                            </tr>
                            <tr className='booking-info__item'>
                                <td>Number Of guest:- </td>
                                <td>
                                <span>adults: {booking.adults}</span>
                                <span>children: {booking.children}</span>
                                <span>babies: {booking.babies}</span>
                                </td>
                            </tr>
                            <tr className='booking-info__item'>
                                <td>Booking cost:</td>
                                <td>
                                <span>&#2547; {`${booking.totalPrice}`}</span>
                                </td>
                            </tr>
                            </tbody>
                    </table>
                          <RoomCard {...booking.roomId}></RoomCard>
                          <Button variant="outlined" fullWidth onClick={()=>handleDeleteBooking(booking._id,booking.roomId._id)}>Cancel booking</Button>
                      </div>
                      </Grid>  
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