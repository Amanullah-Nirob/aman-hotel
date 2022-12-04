import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCurrentUser, setLoggedInUser } from '../../../app/slices/auth/authSlice';
import { useForm,Form } from '../../../hooks/useForm';
import DatePickerField from '../../element/feilds/datePickerField/DatePickerField';
import InputField from '../../element/feilds/InputField/InputField';
import RadioGroupField from '../../element/feilds/InputField/RadioGroupField';
import {TextField,Box} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { useProfileInfoUpdateMutation } from '../../../app/apiSlice/useApiSlice';
import updateInfoValidateConfig from '../../../utils/validator/validatorConfig/updateInfoValidateConfig';
import { displayToast } from '../../../app/slices/ToastSlice';

const genderItems = [
    { id: 'male', title: 'male' },
    { id: 'female', title: 'female' },
];

const ProfileEditForm = () => {
    const loggedInUser=useAppSelector(selectCurrentUser)
    const [profileInfoUpdate,{isLoading,isError}]=useProfileInfoUpdateMutation()
    const dispatch=useAppDispatch()

    // success display
    const displaySuccess = (message:string) => {
        dispatch(
          displayToast({
            message,
            type: "success",
            duration: 3000,
            positionVert: "top",
            positionHor:'center'
          })
        );
    };
    const initialData = {
        name: loggedInUser?.name || '',
        email: loggedInUser?.email || '',
        gender: loggedInUser?.gender || 'male',
        birthYear: loggedInUser?.birthYear || Date.now(),
        role: loggedInUser?.role || 'user',
    };

   const { data, errors, handleInputChange, handleKeyDown, validate } = useForm(initialData, true, updateInfoValidateConfig);
    
    const handleSubmit = async(e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validate(data)) {
           const newData:any=await profileInfoUpdate(data)      
           const updateUser={
            ...newData?.data,
            token: loggedInUser.token,
            expiryTime: loggedInUser.expiryTime,
         }
         dispatch(setLoggedInUser(updateUser));
         displaySuccess("ProfileInfo Updated Successfully");
        }
    };

    return (
        <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown as any}>
            <InputField name='name' label='FullName' size="small" />
            <InputField name='email' label='Email' inputProps={{ readOnly: true, }} size="small" />
            <RadioGroupField name='gender' items={genderItems} />
            <DatePickerField 
                value={data.birthYear}
                onChange={handleInputChange}
                openTo='year'
                label='Date of Birth'
                name='birthYear'
                minDate={new Date('1950-01-01')}
                btnvariant='outlined'
                error={errors?.birthYear && errors?.birthYear}
                renderInput={(params: JSX.IntrinsicAttributes) => (
                    <TextField {...params} {...(errors?.birthYear && { error: true, helperText: errors?.birthYear })} />
                )}
            />
           <Box sx={{textAlign:'end',marginTop:'10px',marginRight:'10px'}}>
           <LoadingButton variant="outlined" type='submit' 
              onClick={handleSubmit}  
              disabled={Object.keys(errors).length !== 0} loading={isLoading?true:false} > Update
            </LoadingButton>
           </Box>
        </Form>
    );
};

export default ProfileEditForm;