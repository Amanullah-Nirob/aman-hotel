import React,{useState} from 'react';
import {Box,CircularProgress,Grid,Button} from '@mui/material'
import formatDate, { getDateDDMMYYYY } from '../../../utils/formatDate';
import RoomCard from '../../rooms/roomsMainContent/roomList/roomCard/RoomCard';
import { useBookingDeleteMutation } from '../../../app/apiSlice/bookingApiSlice';
import { useAppDispatch } from '../../../app/hooks';
import { displayToast } from '../../../app/slices/ToastSlice';
import BookingFormPricing from '../../booking/BookingFormPricing';

const oneDayMs = 86_000_000;
const BookingCard = ({booking}:any) => {
    const [bookingDelete]=useBookingDeleteMutation()
    const dispatch=useAppDispatch()
    const [total,setTotalPrice]=useState(0)

    const arrivalDate = new Date(booking.arrivalDate);
    const departureDate = new Date(booking.departureDate);
    const countDays = Math.max(1, Math.round((departureDate.valueOf() - arrivalDate.valueOf()) / oneDayMs));

    const displayReviewData = () => {
        if (booking.created_at !== booking.updated_at) {
          return <>
          <span>Edited : </span> {formatDate(booking?.updated_at || '')}
          </>;
        }
        return <>
        <span>Booking placed : </span> {formatDate(booking?.created_at || '')}
        </>;
    };
    
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

        <Grid item sm={12}>
        <div className='booking_content'>
        <Grid container spacing={2}>
        <Grid item sm={8}>
        <div className="myBooking_content_box">
         <div className="bookingTimes">
            {displayReviewData()}
         </div>
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
        <BookingFormPricing price={booking.roomId.price} countDays={countDays} setTotalPrice={setTotalPrice} totalPrice={booking.totalPrice}></BookingFormPricing>
        </div> 
        </Grid>
        <Grid item sm={4}>
        <div className="my_booking_card_main">
        <RoomCard {...booking.roomId}></RoomCard>
            <Button variant="outlined" fullWidth onClick={()=>handleDeleteBooking(booking._id,booking.roomId._id)}>Cancel booking</Button>
        </div>
        </Grid>
        </Grid>
        </div>
        </Grid> 
    );
};

export default BookingCard;