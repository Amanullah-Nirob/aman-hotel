import { Box, Container, Divider, Grid, Paper } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../app/slices/auth/authSlice';
import { selectBookingPendingData } from '../../app/slices/BookingPending';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import DateOfStay from '../../components/element/feilds/dateOfStayField/DateOfStay';
import InputField from '../../components/element/feilds/InputField/InputField';
import RadioGroupField from '../../components/element/feilds/InputField/RadioGroupField';
import { Form, useForm } from '../../hooks/useForm';
import { guestsLabelGet } from '../../utils/appUtils';
import { dmSansFont } from '../../utils/nextFont';
import submitBookingValidateConfig from '../../utils/validator/validatorConfig/submitBookingValidateConfig';
import LoadingButton from '@mui/lab/LoadingButton';
import { useBookingCreateMutation } from '../../app/apiSlice/bookingApiSlice';
import { displayToast } from '../../app/slices/ToastSlice';


const ConfirmBooking = () => {
    const theme=useAppSelector(selectTheme)
    const bookingPendingData=useAppSelector(selectBookingPendingData)
    const loggedInUser=useAppSelector(selectCurrentUser)
    const [bookingCreate,{isError,isLoading}]=useBookingCreateMutation()
    const dispatch=useAppDispatch()
    const handleChange=()=>{
        console.log(`demo change`);
    }

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
    
    return (
        <div className='confirm_booking_main'>
            <Container maxWidth="xl">
              <Box className="confirm_booking_all_content" sx={{transform:theme==='light'?{sm:'translate(0px, 9vh)',xs:'translate(0px, 9vh)'}:'translate(0px, 12vh)'}}>
                <Grid container spacing={3}>
                    <Grid item sm={7}>
                    <Paper variant="outlined" className='confirmForm_main'>
                     <div className="confirm_booking_title">
                     <h1 className={dmSansFont.className}>Confirm Bookings</h1>
                     </div>
                        <Divider />
                     <div className="confirm_data_guest">
                     <div className="confirm_date">
                     <DateOfStay data={bookingPendingData} onChange={handleChange} readOnly={true}/>
                     </div>
                     <div className="confirm_guest">
                      <p>Guest</p> 
                     {guestsLabelGet(bookingPendingData?.adults,bookingPendingData?.children,bookingPendingData?.babies)}
                     </div>

                     </div>
                     <div className="Booking_information_form">
                        <h2>Booking Information</h2>
                        <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown as any}>
                           <InputField name='name' label='Full Name' />
                           <InputField autoFocus name='phone' label='Phone' />
                           <InputField name='email' label='Email' />
                           <RadioGroupField name='paymentMethod' items={paymentMethodItems} />
                           <LoadingButton variant="outlined" type='submit' 
                            onClick={handleSubmit}  
                            disabled={Object.keys(errors).length !== 0} sx={{width:'100%'}} loading={isLoading?true:false} > Confirm Booking</LoadingButton>
                        </Form>
                     </div>
                    </Paper>
                    </Grid>
                    <Grid item sm={5}>
                        <div className="choose_room_card">

                        </div>
                    </Grid>
                </Grid>
             </Box>
            </Container>
          
        </div>
    );
};

export default ConfirmBooking;