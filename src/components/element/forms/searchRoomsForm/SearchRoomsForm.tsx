import { Button } from '@mui/material';
import React from 'react';
import { Form, useForm } from '../../../../hooks/useForm';
import DateOfStay from '../../feilds/dateOfStayField/DateOfStay';
import GuestsCounter from '../../guests/GuestsCounter';
import validatorConfig from './validatorConfig';
import { ArrowRight } from '@mui/icons-material';
import Router from 'next/router';
import queryString from 'query-string';

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
        <GuestsCounter data={data} onChange={handleInputChange} />
      <Button
        variant='outlined'
        type='button'
        size='small'
        onClick={handleResetForm}
        className='form-btn__reset'
        fullWidth
      >
        Clear
      </Button>
      <Button
        endIcon={<ArrowRight />}
        type='submit'
        className='form-btn__submit'
        onClick={handleSubmit}
        disabled={Object.keys(errors).length > 0}
        fullWidth
      >
      Pick up a number
      </Button>

        </Form>
    );
};

export default SearchRoomsForm;