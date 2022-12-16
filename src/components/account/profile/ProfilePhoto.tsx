import React from 'react';
import {Avatar} from '@mui/material'
import { dmSansFont } from '../../../utils/nextFont';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCurrentUser, setLoggedInUser } from '../../../app/slices/auth/authSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import { useProfilePhotoUpdateMutation } from '../../../app/apiSlice/useApiSlice';
import { isImageFile, TWO_MB } from '../../../utils/appUtils';
import { displayToast } from '../../../app/slices/ToastSlice';

const ProfilePhoto = () => {
    const loggedInUser=useAppSelector(selectCurrentUser)
    const [profilePhotoUpdate,{isLoading,error,isError}]=useProfilePhotoUpdateMutation()
    const dispatch=useAppDispatch()

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
            displaySuccess("ProfilePhoto Updated Successfully");
           } catch (error:any) {
            dispatch(  
                displayToast({ 
                     title:"profile photo uploaded Failed", 
                     message: error?.data.message? error?.data.message : 'profile photo uploaded Failed', 
                     type: "error", duration: 3000, positionVert: "top",
                     positionHor: "center",
            }))
              
           }
        }
      };

    return (
        <div className="profile_image">
        <h3 className={dmSansFont.className}>Photo</h3>
        <div className="profile_image_content">
        <Avatar src={loggedInUser?.profilePic} sx={{width:'150px',height:'150px',margin:'auto'}} />
        <div className="profile_icon">
        <LoadingButton loading={isLoading?true:false} variant="outlined" component="label"> 
        Upload File
        <input type="file" hidden onChange={handleChange}/>
        </LoadingButton>
        </div>
        </div>
    </div>
    );
};

export default ProfilePhoto;