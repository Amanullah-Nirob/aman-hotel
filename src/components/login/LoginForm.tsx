import { Button } from '@mui/material';
import React, { useMemo } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Form, useForm } from '../../hooks/useForm';
import { SignInDataType } from '../../types/types';
import loginvalidatorConfig from '../../utils/validator/validatorConfig/loginvalidatorConfig';
import withPassword from '../element/feilds/HOC/withPassword';


import InputField from '../element/feilds/InputField/InputField';


const initialData: SignInDataType = {
    email: '',
    password: '',
};

const LoginForm = () => {
    const { data, errors, enterError, handleInputChange, validate, handleResetForm } = useForm(initialData,false,loginvalidatorConfig);
    const dispatch=useAppDispatch()
    console.log(`login`);
    

  
    const handleSubmit=(e: React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if (validate(data)) {
            console.log(data);
            handleResetForm(e); 
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