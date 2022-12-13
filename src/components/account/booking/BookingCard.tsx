import React,{useState} from 'react';
import {Box,Alert,Grid,Button} from '@mui/material'
import formatDate, { getDateDDMMYYYY } from '../../../utils/formatDate';
import RoomCard from '../../rooms/roomsMainContent/roomList/roomCard/RoomCard';
import { useBookingDeleteMutation } from '../../../app/apiSlice/bookingApiSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { displayToast } from '../../../app/slices/ToastSlice';
import BookingFormPricing from '../../booking/BookingFormPricing';
import { dmSansFont } from '../../../utils/nextFont';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BookingStatusBar from './BookingStatusBar';
import { selectTheme } from '../../../app/slices/theme/ThemeSlice';

const oneDayMs = 86_000_000;
const BookingCard = ({booking}:any) => {
    const [bookingDelete]=useBookingDeleteMutation()
    const dispatch=useAppDispatch()
    const [total,setTotalPrice]=useState(0)
    const theme=useAppSelector(selectTheme)
    const arrivalDate = new Date(booking.arrivalDate);
    const departureDate = new Date(booking.departureDate);
    const countDays = Math.max(1, Math.round((departureDate.valueOf() - arrivalDate.valueOf()) / oneDayMs));

    const displayReviewData = () => {
        if (booking.created_at !== booking.updated_at) {
          return <>
          <span>Booking Edited (admin): </span> {formatDate(booking?.updated_at || '')}
          </>;
        }
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

    const bookingStatusAlert=(status:string)=>{
        if(booking.status === 'requested'){
            return 'Please wait a moment, if your booking request is accepted then you can make payment.'
          } else if(booking.status === 'accepted'){
            return 'Your booking accepted. please pay for the booking'
          } else if(booking.status === 'confirmed'){
            return 'Your booking is confirmed. You are invited very soon'
          } else if(booking.status === 'to review'){
            return 'Welcome to our hotel. enjoy the room and extra facilities'
          } else if(booking.status === 'completed'){
            return 'Hope you enjoyed and invite you in advance to come again'
          } else if(booking.status === 'denied'){
            return 'your booking denied!'
          }
    }
    return (

        <Grid item sm={12}>
        <div className='booking_content'>
        <Grid container spacing={2}>
        <Grid item sm={8}>
        <div className='myBooking_title'>
                <h2 className={dmSansFont.className}>My Booking</h2>
                <div className="booking_status">
                <Alert sx={{textTransform:'capitalize'}} icon={<NotificationsNoneIcon fontSize="inherit" />} severity="warning">
                 {booking.status}
                </Alert>
                </div>
         </div>
        <div className="myBooking_content_box">
            <div className="bookingTimes">
            <span>Booking placed: </span> {formatDate(booking?.created_at || '')}
            {displayReviewData()}
            </div>
          <Alert severity="info">{bookingStatusAlert(booking.status)}</Alert>
        {/* booking table */}
         <div className='Booking_Information'>
          <h3 className={dmSansFont.className}>Booking Information</h3> 
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
                            <td>Number Of guest: </td>
                            <td>
                            <span>adults: {booking.adults} | </span>
                            <span>children: {booking.children} | </span>
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
            <div className="booking_status_bar">
                <div className="bar_title">
                    <BookingStatusBar booking={booking} />
                </div>
         </div>
        
        </div>
         {/* booking details */}
         <h3 style={{margin:'0'}} className={dmSansFont.className}>Booking Details</h3> 
        <div className='price_and_details' style={{backgroundColor:theme==='light'?'#fafafa':'rgb(28 28 28)'}}>
            <div className='Billing_Address_payment_method'>
                <div className='billing_main'>
                <div className='billing_content'>
                <h3 className={dmSansFont.className}>Billing Address</h3>
                    <p>{booking.name}</p>
                    <p>{booking.email}</p>
                    <p>{booking.phone}</p>
                </div>
                <div className="paymentMethod">
                <h3 className={dmSansFont.className}>Payment Method</h3>
                <p>{booking.paymentMethod}</p>
                </div>
                </div>
            </div>
            <div className="booking_pricing">
                <h3 className={dmSansFont.className}>Price Details</h3>
                <BookingFormPricing price={booking.roomId.price} countDays={countDays} setTotalPrice={setTotalPrice} totalPrice={booking.totalPrice}></BookingFormPricing>
            </div>
        </div>

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