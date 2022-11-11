import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import DatePickerField from '../datePickerField/DatePickerField';

const oneDayMs = 86_000_000;

type DateOfStayProps = {
  data: any;
  errors?: { [x: string]: string };
  onChange: (target: any) => void;
  title?: string;
};

const DateOfStay: React.FC<DateOfStayProps> = ({ onChange, data, errors }) => {
  const { arrivalDate, departureDate } = data;
  console.log((+arrivalDate + oneDayMs));
  console.log(+arrivalDate);




  return (
    <div className='dateOfStay-wrapper'>
      <div className='dateOfStay'>
        <p>Check-in</p>
        <DatePickerField
          label='Check-in'
          name='arrivalDate'
          minDate={Date.now()}
          onChange={onChange}
          error={errors?.arrivalDate && errors?.arrivalDate}
          value={+arrivalDate}
          renderInput={(params) => (
            <TextField 
            {...params} 
            {...(errors?.arrivalDate && { error: true, helperText: errors?.arrivalDate })}
             />
          )}
        />
      </div>
      <div className='dateOfStay'>
      <p>Check-out</p>
        <DatePickerField
          label='Check-out'
          name='departureDate'
          minDate={+arrivalDate + oneDayMs}
          onChange={onChange}
          value={+departureDate}
          error={errors?.departureDate && errors?.departureDate}
          renderInput={(params) => (
            <TextField {...params} {...(errors?.departureDate && { error: true, helperText: errors?.departureDate })} />
          )}
        />
      </div>
    </div>
  );
};

export default DateOfStay;