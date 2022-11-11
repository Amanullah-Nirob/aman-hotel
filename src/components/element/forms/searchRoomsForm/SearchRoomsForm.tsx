import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Form, useForm } from '../../../../hooks/useForm';
import DateOfStay from '../../feilds/dateOfStayField/DateOfStay';
import GuestsCounter, { getGuestsLabel } from '../../guests/GuestsCounter';
import validatorConfig from './validatorConfig';
import { ArrowRight } from '@mui/icons-material';
import Router from 'next/router';
import queryString from 'query-string';
import { guestsLabelGet } from '../../../../utils/appUtils';
import GuestCount from '../../../menus/GuestCount';

const oneDayMs = 86000000;
const initialState = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 1,
  children: 0,
  babies: 0,
};

const SearchRoomsForm = () => {
    const { data, errors, handleInputChange, handleKeyDown, validate, handleResetForm } = useForm(initialState,true,validatorConfig);

    const [guestCountMenuAnchor, setGuestCountMenuAnchor] = useState<any | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (validate(data)) {
        const queryParams = queryString.stringify(data);
        // Router.push(`/rooms?${queryParams}`);
        console.log(queryParams);
      }
    };
    
    return (
        <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown as any}>
        <DateOfStay data={data} onChange={handleInputChange} errors={errors} />
        <div style={{border:'1px solid'}} onClick={(e) => setGuestCountMenuAnchor(e.target)}>{guestsLabelGet(data?.adults,data?.children,data?.babies)}</div>

        <Button type='button' onClick={handleResetForm}>Clear</Button>
        <Button endIcon={<ArrowRight />} type='submit' onClick={handleSubmit} disabled={Object.keys(errors).length > 0}>
        Search
        </Button>

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