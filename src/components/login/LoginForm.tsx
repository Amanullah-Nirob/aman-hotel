import { Button } from '@mui/material';
import React, { useMemo } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Form, useForm } from '../../hooks/useForm';
import { SignInDataType } from '../../types/types';
import loginvalidatorConfig from '../../utils/validator/validatorConfig/loginvalidatorConfig';
import withPassword from '../element/feilds/HOC/withPassword';
import { useLoginMutation } from '../../app/apiSlice/useApiSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import InputField from '../element/feilds/InputField/InputField';
import { LoginRequest } from '../../app/interface/userinterface';
import { displayToast } from '../../app/slices/ToastSlice';
import { setLoggedInUser } from '../../app/slices/auth/authSlice';
import {useRouter} from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';


const initialData: SignInDataType = {
    email: '',
    password: '',
};

const LoginForm = () => {
    const { data, errors, enterError, handleInputChange, validate, handleResetForm } = useForm(initialData,false,loginvalidatorConfig);
    const dispatch=useAppDispatch()
    const [login,{ isLoading, isError, error }]=useLoginMutation()
    const router=useRouter()
    const mobileMatches = useMediaQuery('(max-width:600px)');
    const handleSubmit=async(e: React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
       try {
        if (validate(data)) {
            const loginData=await login(data as LoginRequest).unwrap()
            handleResetForm(e); 
            dispatch(setLoggedInUser(loginData))
            dispatch(  
                displayToast({ title: "Successful loggedIn", message:'Thank you for logging in to Aman-Hotel', type: "success", duration: 3000, positionVert: "top",
                  positionHor: "center",
            }))
           if(!router.pathname.startsWith('/account/')) {
             router.push('/')
           }
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
             <InputField name='email' label='Email' autoFocus size={!mobileMatches?'medium':'small'} />
             <InputFieldWithPassword name='password' label='password' type='password' size={!mobileMatches?'medium':'small'}/>

             <LoadingButton variant="contained" sx={{marginY:'auto'}} onClick={handleSubmit} fullWidth type='submit' 
              disabled={Object.keys(errors).length !== 0}
              loading={isLoading?true:false}
             >login</LoadingButton>
             </Form>
        </>
    );
};

export default LoginForm;