import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { DatePickerProps } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SxProps } from "@mui/system";

type DatePickerFieldProps = DatePickerProps<any,any> & {
  label: string;
  value: Date | number;
  minDate: Date | number;
  name: string;
  error?: string;
  btnvariant?:"standard" | "filled" | "outlined"
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, name, value, minDate, onChange, error,btnvariant, ...rest }) => {

  const convertToDefEventParam = (name: string, value: Date | number | null) => ({
    target: {
      name,
      value: new Date(Number(value)).getTime(),
    },
  });

  const popperSx: SxProps = {
    "& .MuiTabs-root": { backgroundColor: "rgba(120, 120, 120, 0.4)" }
  };


  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={value}
        inputFormat="dd/MM/yyyy"
        minDate={minDate || Date.now()}
        onChange={(date: number | Date | null) => {
          onChange(convertToDefEventParam(name, date));
        }}
        PopperProps={{
          sx: popperSx
        }}
        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField 
          variant={btnvariant || "standard"}
         {...params} {...(error && { error: true, helperText: error })} 
         />}
      />
    </LocalizationProvider>
    </>

  );
};

export default React.memo(DatePickerField);
