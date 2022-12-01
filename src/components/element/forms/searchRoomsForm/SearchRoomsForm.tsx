import { Button, Paper, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { Form, useForm } from '../../../../hooks/useForm';
import DateOfStay from '../../feilds/dateOfStayField/DateOfStay';
import GuestsCounter, { getGuestsLabel } from '../../guests/GuestsCounter';
import roomSearchValidatorConfig from '../../../../utils/validator/validatorConfig/roomSearchValidatorConfig';
import { ArrowRight } from '@mui/icons-material';
import Router from 'next/router';
import queryString from 'query-string';
import { guestsLabelGet } from '../../../../utils/appUtils';
import GuestCount from '../../../menus/GuestCount';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectTheme } from '../../../../app/slices/theme/ThemeSlice';
import PersonIcon from '@mui/icons-material/Person';
import { setRoomSearchQuery } from '../../../../app/slices/roomSearch/RoomSearch';

const oneDayMs = 86000000;
const initialState = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 1,
  children: 0,
  babies: 0, 
}; 

const SearchRoomsForm = () => {
    const { data, errors, handleInputChange, handleKeyDown, validate, handleResetForm } = useForm(initialState,true,roomSearchValidatorConfig);
    const [guestCountMenuAnchor, setGuestCountMenuAnchor] = useState<any | null>(null);
    const theme=useAppSelector(selectTheme)
    const mediaTab=useMediaQuery('(max-width:768px)')
    const dispatch=useAppDispatch()

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (validate(data)) {
        const queryParams = queryString.stringify(data);   
        dispatch(setRoomSearchQuery(queryParams))   
        Router.push(`/rooms?${queryParams}`);
      }
    };
  
    return (
        <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown as any}>
        <DateOfStay data={data} onChange={handleInputChange} errors={errors} />

        <Paper elevation={0} className='guest_count' onClick={(e) => setGuestCountMenuAnchor(e.target)} sx={{backgroundColor:theme==='light'?'#dddddd5e':'',width:mediaTab?'58%':{md:'40%',sm:'50%'}}}>
        <p className='guestTitle'>Guests</p>
        <div className="guestContent">
        <PersonIcon sx={{display:{xs:'none',lg:'inline-block',marginRight:'10px'}}} />
         <div className='guestMain'>{guestsLabelGet(data?.adults,data?.children,data?.babies)}</div>
        </div>
        </Paper>

        <div className='searchAction'>
              <Button type='submit' variant="contained" onClick={handleSubmit}  sx={{width:'100%',marginLeft:{sm:'10px',sx:'0'},padding: {sm:'28px 16px',xs:'20px 16px'}, backgroundColor:'#5c98f2',color:'#fff'}} disabled={Object.keys(errors).length > 0}>Search</Button>
        </div>
      
    {/* guest count menu */}
      <GuestCount
         anchor={guestCountMenuAnchor}
         setAnchor={setGuestCountMenuAnchor}
         data={data}
         onChange={handleInputChange}
     ></GuestCount>

        </Form>
    );
};

export default SearchRoomsForm;