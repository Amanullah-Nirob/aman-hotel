import { Paper, TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { selectTheme } from '../../../../app/slices/theme/ThemeSlice';
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
  const theme=useAppSelector(selectTheme)

  return (
    <Paper elevation={0} className='dateOfStay-wrapper' sx={{backgroundColor:theme==='light'?'#dddddd5e':''}}>
      <div className='dateOfStay Check_in'>
        <p>Check-in</p>
        <DatePickerField
          label='Check-in'
          name='arrivalDate'
          minDate={Date.now()} 
          onChange={onChange}
          error={errors?.arrivalDate && errors?.arrivalDate}
          value={+arrivalDate}
          btnvariant="standard"
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
          btnvariant="standard"
          renderInput={(params) => (
            <TextField {...params} {...(errors?.departureDate && { error: true, helperText: errors?.departureDate })} />
          )}
        />
      </div>
    </Paper>
  );
};

export default DateOfStay;