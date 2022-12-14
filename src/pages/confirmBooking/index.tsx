import { Box, Container, Divider, Grid, Paper } from '@mui/material';
import React,{useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../app/slices/auth/authSlice';
import { selectBookingPendingData } from '../../app/slices/BookingPending';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import InputField from '../../components/element/feilds/InputField/InputField';
import RadioGroupField from '../../components/element/feilds/InputField/RadioGroupField';
import { Form, useForm } from '../../hooks/useForm';
import { dmSansFont } from '../../utils/nextFont';
import submitBookingValidateConfig from '../../utils/validator/validatorConfig/submitBookingValidateConfig';
import LoadingButton from '@mui/lab/LoadingButton';
import { useBookingCreateMutation } from '../../app/apiSlice/bookingApiSlice';
import { displayToast } from '../../app/slices/ToastSlice';
import { getDateDDMMYYYY } from '../../utils/formatDate';
import RoomCard from '../../components/rooms/roomsMainContent/roomList/roomCard/RoomCard';
import BookingFormPricing from '../../components/booking/BookingFormPricing';
import { oneDayMs } from '../../components/booking/BookingForm';
import BreadCrumb from '../../components/element/BreadCrumb';
import Head from 'next/head';
import Router from 'next/router';


const ConfirmBooking = () => {
    const theme=useAppSelector(selectTheme)
    const bookingPendingData=useAppSelector(selectBookingPendingData)
    const loggedInUser=useAppSelector(selectCurrentUser)
    const [totalPrice, setTotalPrice] = useState(0);
    const [bookingCreate,{isError,isLoading}]=useBookingCreateMutation()
    const dispatch=useAppDispatch()
    const countDays = Math.max(1, Math.round((bookingPendingData.departureDate - bookingPendingData.arrivalDate) / oneDayMs));

    const paymentMethodItems = [
        { id: 'SSLCOMMERZ', title: 'SSLCOMMERZ' },
        { id: 'cash', title: 'cash' },
        { id: 'other', title: 'other' }
    ];
    const initialData = {
        arrivalDate: bookingPendingData.arrivalDate,
        departureDate: bookingPendingData.departureDate,
        adults: bookingPendingData.adults || 1,
        children: bookingPendingData.children || 0,
        babies: bookingPendingData.babies || 0,
        userId: bookingPendingData?.userId,
        roomId: bookingPendingData.roomId,
        totalPrice: bookingPendingData.totalPrice,
        name:loggedInUser.name,
        email:loggedInUser.email,
        phone:'',
        paymentMethod: 'SSLCOMMERZ',
    };

    const { data, errors, enterError, setEnterError, handleInputChange, handleResetForm, handleKeyDown, validate } = 
    useForm(initialData, true, submitBookingValidateConfig);
    
    const handleSubmit = async(event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
       try {
        if (validate(data)) {
         const newBookingData=await bookingCreate(data).unwrap()
         console.log(newBookingData);
         
         dispatch(  
          displayToast({ 
          title: "Booking pending", 
          message:'You are welcome to book a room', 
          type: "success", duration: 3000, positionVert: "top",
          positionHor: "center"
        }))
         Router.push('/account/booking')
        }
       } catch (error:any) {
        dispatch(  
          displayToast({ 
          title: "Booking failed", 
          message: error?.data.message? error?.data.message : 'This room is already booked', 
          type: "warning", duration: 3000, positionVert: "top",
          positionHor: "center"
        }))
         console.log(error);
       }
    };

    const breadCrumb = [
        {text:'Home',url: '/'},
        {text: 'Confirm Booking'}
    ];


    return (
 <>
    <Head>
     <title>Room | AmanHotel</title>
    </Head>
    <div className='confirm_booking_main'>
            <Container maxWidth="xl">
              <Box className="confirm_booking_all_content" sx={{transform:theme==='light'?{sm:'translate(0px, 8vh)',xs:'translate(0px, 9vh)'}:'translate(0px, 10vh)'}}>
              <BreadCrumb breacrumb={breadCrumb} />
              <div className="confirm_booking_title mobile">
                     <h1 className={dmSansFont.className}>Confirm Bookings</h1>
                     <Divider />
                </div>
                <Grid container spacing={3} className='confirmBookingMainGrid'>
                    <Grid item md={7} xs={12}>
                    <Paper variant="outlined" className='confirmForm_main'>
                     <div className="confirm_booking_title">
                     <h1 className={dmSansFont.className}>Confirm Bookings</h1>
                     <Divider />
                     </div>
                     <div className="confirm_data_guest">
                    <h2 className={dmSansFont.className}>Your Booking</h2>
                     <Paper variant="outlined" className="guestData_main">
                     <div className="confirm_date">
                         <p>Date</p>
                         <div className="date">
                         <h4> Check in: <span>{getDateDDMMYYYY(bookingPendingData.arrivalDate)}</span></h4>
                        <h4> Check out: <span>{getDateDDMMYYYY(bookingPendingData.departureDate)}</span></h4>
                         </div>
                     </div>
                     <div className="confirm_guest">
                      <p>Guests</p> 
                      <h4>Adults: <span>{bookingPendingData?.adults}</span> </h4>
                       <h4> Children: <span>{bookingPendingData?.children}</span> | Babies: <span>{bookingPendingData?.babies}</span> </h4>
                     </div>
                     </Paper>
                     </div>
                     <div className="Booking_information_form">
                        <h2 className={dmSansFont.className}>Booking Information</h2>
                        <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown as any}>
                           <InputField name='name' label='Full Name' size='small' />
                           <InputField autoFocus name='phone' label='Phone' size='small'/>
                           <InputField name='email' label='Email' size='small' />
                           <RadioGroupField name='paymentMethod' items={paymentMethodItems} />
                           <LoadingButton variant="outlined" type='submit' 
                            onClick={handleSubmit}  
                            disabled={Object.keys(errors).length !== 0} sx={{width:'100%'}} loading={isLoading?true:false} > Confirm Booking</LoadingButton>
                        </Form>
                     </div>
                    </Paper>
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <Paper className="choose_room_card">
                            <div className="RoomCard">
                            <RoomCard {...bookingPendingData.room} />
                            </div>
                            <div className='roomPrice'>
                            <h2 className={dmSansFont.className}>Price Details</h2>
                            <BookingFormPricing price={bookingPendingData.room.price} countDays={countDays} setTotalPrice={setTotalPrice} totalPrice={bookingPendingData.totalPrice}></BookingFormPricing>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
             </Box>
            </Container>
        </div>
        </>
    );
};

export default ConfirmBooking;