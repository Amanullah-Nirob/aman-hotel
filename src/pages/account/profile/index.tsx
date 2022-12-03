import Head from 'next/head';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCurrentUser, setLoggedInUser } from '../../../app/slices/auth/authSlice';
import {Avatar,Button} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { isImageFile, TWO_MB } from '../../../utils/appUtils';
import { displayToast } from '../../../app/slices/ToastSlice';
import { useProfilePhotoUpdateMutation } from '../../../app/apiSlice/useApiSlice';
import LoadingButton from '@mui/lab/LoadingButton';

const Profile = () => {
    const loggedInUser=useAppSelector(selectCurrentUser)
    const dispatch=useAppDispatch()
    const [profilePhotoUpdate,{isLoading,error,isError}]=useProfilePhotoUpdateMutation()

    // warning display
    const displayWarning = (message = "Warning", duration = 3000,title='invalid warning') => {
        dispatch(
          displayToast({
            message,
            title,
            type: "warning",
            duration,
            positionVert: "top",
            positionHor:'center'
          })
        );
    };
    // photo update 
    const handleChange = async (e:any) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!isImageFile(file.name)) {
           return displayWarning("Please Select an Image File (png/jpg/jpeg/svg/webp)", 4000,'Invalid Image File');
        }

        if (file.size >= TWO_MB) {
           return displayWarning("Please Select an Image Smaller than 2 MB", 4000,'large file');
        }

        if (file) {
           try {
            const formData = new FormData();
            formData.append("profilePic", file);
            formData.append("currentProfilePic", loggedInUser?.profilePic);
            formData.append("cloudinary_id", loggedInUser?.cloudinary_id);
            const data=await profilePhotoUpdate(formData).unwrap()
            const updateUser={
                ...data,
                token: loggedInUser.token,
                expiryTime: loggedInUser.expiryTime,
            }
            dispatch(setLoggedInUser(updateUser));

           } catch (error) {
              console.log(error);
              
           }
        }
    };
    return (
        <>
        <Head>
            <title>Profile - Account | Aman-Hotel</title>
        </Head>
         <div className='profile_main'>
          <div className="profile_title">
            <h1>Profile</h1>
            <p>This information will be displayed publicly so be careful what you share.</p>
         </div>  
         <div className="profile_image">
            <Avatar src={loggedInUser?.profilePic} sx={{width:'150px',height:'150px'}} />
            <div className="profile_icon">


            <LoadingButton loading={isLoading?true:false} variant="outlined" component="label"> 
             Upload File
            <input type="file" hidden onChange={handleChange}/>
            </LoadingButton>
            </div>
         </div>

         </div>
        </>
    );
};

export default Profile;