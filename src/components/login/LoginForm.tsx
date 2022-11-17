import { Button } from '@mui/material';
import React, { useMemo } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Form, useForm } from '../../hooks/useForm';
import { SignInDataType } from '../../types/types';
import loginvalidatorConfig from '../../utils/validator/validatorConfig/loginvalidatorConfig';
import withPassword from '../element/feilds/HOC/withPassword';
import { useLoginMutation } from '../../app/apiSlice/useApiSlice';

import InputField from '../element/feilds/InputField/InputField';
import { LoginRequest } from '../../app/interface/userinterface';
import { displayToast } from '../../app/slices/ToastSlice';


const initialData: SignInDataType = {
    email: '',
    password: '',
};

const LoginForm = () => {
    const { data, errors, enterError, handleInputChange, validate, handleResetForm } = useForm(initialData,false,loginvalidatorConfig);
    const dispatch=useAppDispatch()
    const [login,{ isLoading, isError, error }]=useLoginMutation()
     
    const handleSubmit=async(e: React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
       try {
        if (validate(data)) {
            const loginData=await login(data as LoginRequest).unwrap()
            console.log(loginData);
            handleResetForm(e); 
        }
       } catch (error:any) {
          dispatch(  
            displayToast({ title: "login Failed",  message: error?.data?.message? error?.data?.message : 'login Failed',type: "error", duration: 4000,
            positionVert: "top", 
            positionHor: "center",
          }))
       }
    }

    const InputFieldWithPassword = useMemo(() => withPassword(InputField), []);
    return (
        <>
             <Form data={data} errors={errors} handleChange={handleInputChange}>
             <InputField name='email' label='Email' autoFocus />
             <InputFieldWithPassword name='password' label='password' type='password' />
             <Button  variant="contained" sx={{marginY:'auto'}} onClick={handleSubmit} fullWidth type='submit'>login</Button>
             </Form>
        </>
    );
};

export default LoginForm;