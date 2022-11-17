import { Box, Button, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Form, useForm } from '../../hooks/useForm';
import { UserType } from '../../types/types';
import registerValidatorConfig from '../../utils/validator/validatorConfig/registerValidatorConfig';
import LoadingButton from '@mui/lab/LoadingButton';
import InputField from '../element/feilds/InputField/InputField';
import RadioGroupField from '../element/feilds/InputField/RadioGroupField';
import DatePickerField from '../element/feilds/datePickerField/DatePickerField'
import SwitchInput from '../element/feilds/InputField/SwitchInput';
import withPassword from '../element/feilds/HOC/withPassword';
import { useRegisterUserMutation } from '../../app/apiSlice/useApiSlice';
import { RegisterRequest } from '../../app/interface/userinterface';
import { displayToast } from '../../app/slices/ToastSlice';

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
    const [registerUser,{ isLoading, isError, error }]=useRegisterUserMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
          if (validate(data)) {
            const registerInputValue={
              name:data.firstName + " " + data.secondName,
              email:data.email,
              password:data.password,
              birthYear:data.birthYear,
              gender:data.gender,
              role:data.role,
              subscribe:data.subscribe
            } 
            const userData= await registerUser(registerInputValue as RegisterRequest).unwrap()
            console.log(userData);
          }
        } catch (error:any) {
          dispatch(  
            displayToast({ title: "Registration Failed", message: error?.data.message? error?.data.message : 'Registration Failed', type: "error", duration: 3000, positionVert: "top",
              positionHor: "center",
          }))
        }
      };
      

    const InputFieldWithPassword = useMemo(() => withPassword(InputField), []);
    return (
        <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown as any}>
         <InputField autoFocus name='firstName' label='First name' />
         <InputField name='secondName' label='Last name' />
        <InputField name='email' label='Email' />
        <InputFieldWithPassword name='password' label='password' type='password' />
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

         <SwitchInput name='subscribe' label='special offers' onChange={handleInputChange} />
         <LoadingButton variant="outlined" type='submit' 
         onClick={handleSubmit}  
         disabled={Object.keys(errors).length !== 0} sx={{width:'100%'}} loading={isLoading?true:false} > Register</LoadingButton>
        </Form>
    );
};

export default Register;