import React from 'react';
import { TextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';

type InputTypes = {
  type?: string;
  label?: string;
  name: string;
  placeholder?: string;
  value?: string;
  error?: any | null;
  autoFocus?: boolean;
  btnvariant?:string;
} & MuiTextFieldProps;

const InputField: React.FC<InputTypes> = ({ label, type = 'text', name, value, onChange, btnvariant='outlined', error = null, ...rest }) => {
  return (
    <TextField
      variant={btnvariant}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      required
      {...rest}
      {...(error && { error: true, helperText: error })}
    />
  );
}; 

export default React.memo(InputField);
