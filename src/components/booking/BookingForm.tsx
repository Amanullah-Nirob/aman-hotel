import { Box, Button, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRoomSearchQuery, setRoomSearchQuery } from '../../app/slices/roomSearch/RoomSearch';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import { Form, useForm } from '../../hooks/useForm';
import { guestsLabelGet } from '../../utils/appUtils';
import { dmSansFont } from '../../utils/nextFont';
import bookingValidatorConfig from '../../utils/validator/validatorConfig/bookingValidatorConfig';
import DateOfStay from '../element/feilds/dateOfStayField/DateOfStay';
import GuestCount from '../menus/GuestCount';
import BookingFormPricing from './BookingFormPricing';
import { ArrowRight } from '@mui/icons-material';
import { selectCurrentUser } from '../../app/slices/auth/authSlice';
import { useBookingCreateMutation } from '../../app/apiSlice/bookingApiSlice';
import { displayToast } from '../../app/slices/ToastSlice';

const oneDayMs = 86_000_000;

const BookingForm = ({roomId,price}:any) => {
    const searchQueryData=useAppSelector(selectRoomSearchQuery)
    const [totalPrice, setTotalPrice] = useState(0);
    const [guestCountMenuAnchor, setGuestCountMenuAnchor] = useState<any | null>(null);
    const theme=useAppSelector(selectTheme)
    const dispatch=useAppDispatch()
    const loggedInUser=useAppSelector(selectCurrentUser)
    const [bookingCreate,{isError,isLoading}]=useBookingCreateMutation()
    
    const initialData = {
        arrivalDate: searchQueryData.arrivalDate || Date.now(),
        departureDate: searchQueryData.departureDate || Date.now() + oneDayMs,
        adults: searchQueryData.adults || 1,
        children: searchQueryData.children || 0,
        babies: searchQueryData.babies || 0,
        userId: loggedInUser?._id,
        roomId: roomId,
        totalPrice: 0,
    };

    const { data, errors, enterError, setEnterError, handleInputChange, handleResetForm, handleKeyDown, validate } =
    useForm(initialData, false, bookingValidatorConfig);
    const countDays = Math.max(1, Math.round((data.departureDate - data.arrivalDate) / oneDayMs));

    const handleSubmit = async(event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
       try {
        if (validate(data)) {
          const bookingData = {
            ...data,
            totalPrice,
          };
         const newBookingData=await bookingCreate(bookingData).unwrap()
         dispatch(  
          displayToast({ 
          title: "Booking successfully completed", 
          message:'You are welcome to book a room', 
          type: "success", duration: 3000, positionVert: "top",
          positionHor: "center"
        }))
         console.log(newBookingData);
        }
       } catch (error:any) {
        dispatch(  
          displayToast({ 
          title: "Booking Exist", 
          message: error?.data.message? error?.data.message : 'This room is already booked', 
          type: "warning", duration: 3000, positionVert: "top",
          positionHor: "center"
        }))
         console.log(error);
       }
    };

    // useEffect(()=>{
    //     dispatch(setRoomSearchQuery(data))
    // },[data])
    return (
        <>
        <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown as any}>
          <Paper variant="outlined" sx={{marginTop:'15px'}}>
          <Box sx={{'.MuiPaper-root':{backgroundColor:'transparent',display:'flex',padding:'10px'}}} className='bookingFilterDate' >
          <DateOfStay data={data} onChange={handleInputChange} errors={errors} />
          </Box>  
          </Paper>
  
        <Paper variant="outlined" className='guest_count gbooking' onClick={(e) => setGuestCountMenuAnchor(e.target)} 
            sx={{padding:'9px 9px',cursor:'pointer'}}>
            <p className={dmSansFont.className +' guestTitle'}>Guests</p>
            <div className="guestContent">
            <div className='guestMain'>{guestsLabelGet(data?.adults,data?.children,data?.babies)}</div>
            </div>
        </Paper>
        <Box className='pricing'>
        <BookingFormPricing price={price} countDays={countDays} setTotalPrice={setTotalPrice} totalPrice={totalPrice}></BookingFormPricing>
        </Box>
        <Button
          endIcon={<ArrowRight />}
          type='submit'
          className='form-btn__submit mt-0'
          onClick={handleSubmit}
          disabled={Object.keys(errors).length > 0 || !!enterError || !loggedInUser?._id}
          fullWidth
          variant="contained"
          sx={{backgroundColor:'#5c98f2',borderRadius:'15px',padding:'10px 11px',color:'#fff'}}
        >
          Book Now
        </Button> 
        </Form>
        {enterError && <p className='form_enter_error'>{enterError}</p>}
        {!loggedInUser?._id && <p className='form_enter_error'>You need to Login First</p>}
        {/* guest count menu */}
        <GuestCount
        anchor={guestCountMenuAnchor}
        setAnchor={setGuestCountMenuAnchor}
        data={data}
        onChange={handleInputChange}
       ></GuestCount>
        </>
    );
};

export default BookingForm;