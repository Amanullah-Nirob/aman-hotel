import React from 'react';
import { Form, useForm } from '../../../../hooks/useForm';
import DateOfStay from '../../Fields/dateOfStayField/DateOfStay';
import validatorConfig from './validatorConfig';

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
    return (
        <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown as any}>
        <DateOfStay data={data} onChange={handleInputChange} errors={errors} />
        </Form>
    );
};

export default SearchRoomsForm;