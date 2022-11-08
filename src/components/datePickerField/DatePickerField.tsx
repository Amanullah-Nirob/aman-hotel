import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField, TextFieldProps } from '@mui/material';
import ruLocale from 'date-fns/locale/ru';
import React from 'react';
import { DatePickerProps } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type DatePickerFieldProps = DatePickerProps<any,any> & {
  label: string;
  value: Date | number;
  minDate: Date | number;
  name: string;
  error?: string;
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, name, value, minDate, onChange, error, ...rest }) => {

  const convertToDefEventParam = (name: string, value: Date | number | null) => ({
    target: {
      name,
      value: new Date(Number(value)).getTime(),
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
      <DatePicker
        label={label}
        value={value}
        minDate={minDate || Date.now()}
        onChange={(date: number | Date | null) => {
          onChange(convertToDefEventParam(name, date));
        }}
        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} {...(error && { error: true, helperText: error })} />}
      />
    </LocalizationProvider>
  );
};

export default React.memo(DatePickerField);
