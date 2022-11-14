import { Box, Button, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Form, useForm } from '../../hooks/useForm';
import { UserType } from '../../types/types';
import registerValidatorConfig from '../../utils/validator/validatorConfig/registerValidatorConfig';
import visiblePassword from '../element/feilds/HOC/visiblePassword';
import InputField from '../element/feilds/InputField/InputField';
import RadioGroupField from '../element/feilds/InputField/RadioGroupField';
import DatePickerField from '../element/feilds/datePickerField/DatePickerField'
import SwitchInput from '../element/feilds/InputField/SwitchInput';

const genderItems = [
    { id: 'male', title: 'male' },
    { id: 'female', title: 'female' },
  ];
  
const initialData: UserType = {
    firstName: '',
    secondName: '',
    gender: 'male',
    role: 'user',
    birthYear: Date.now(),
    email: '',
    password: '',
    subscribe: false,
  };

const Register = () => {
    const { data, errors, handleInputChange, handleKeyDown, validate } = useForm(initialData, true, registerValidatorConfig);
    const dispatch=useAppDispatch()

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validate(data)) {
          console.log(data);
          
        }
      };
    const InputFieldWithPassword = useMemo(() => visiblePassword(InputField), []);
    return (
        <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown as any}>
         <div className='register_name_area'>
         <InputField autoFocus name='firstName' label='First name' />
         <InputField name='secondName' label='Last name' />
         </div>
        <InputField name='email' label='Email' />
        <InputFieldWithPassword name='password' label='password' type='password' />
        <div className="date_gender">
        <DatePickerField
          value={data.birthYear}
          onChange={handleInputChange}
          openTo='year'
          label='Date of Birth'
          name='birthYear'
          minDate={new Date('1950-01-01')}
          error={errors?.birthYear && errors?.birthYear}
          renderInput={(params: JSX.IntrinsicAttributes) => (
            <TextField {...params} {...(errors?.birthYear && { error: true, helperText: errors?.birthYear })} />
          )}
        />
        <RadioGroupField name='gender' items={genderItems} />
        </div>
         <SwitchInput name='subscribe' label='special offers' onChange={handleInputChange} />
         <Button variant="outlined" type='submit' onClick={handleSubmit}  disabled={Object.keys(errors).length !== 0} sx={{width:'100%'}}> Register</Button>
        </Form>
    );
};

export default Register;