import Head from 'next/head';
import React from 'react';
import {useAppSelector } from '../../../app/hooks';
import {Grid} from '@mui/material'
import ProfileEditForm from '../../../components/account/profile/ProfileEditForm';
import { dmSansFont } from '../../../utils/nextFont';
import { selectTheme } from '../../../app/slices/theme/ThemeSlice';
import ProfilePhoto from '../../../components/account/profile/ProfilePhoto';

const Profile = () => {
    const theme=useAppSelector(selectTheme)
    return (
        <>
        <Head>
            <title>Profile - Account | Aman-Hotel</title>
        </Head>
         <div className='profile_main'>
          <div className="profile_title">
            <h2 className={dmSansFont.className}>Profile</h2>
            <p style={{color:theme==='light'?'#707070':'#b1b1b1'}}>This information will be private and secure so don&apos;t worry about it.</p>
         </div>  
         <Grid container>
            <Grid item xs={12}>
             <ProfilePhoto></ProfilePhoto>
           </Grid>
            <Grid item xs={12}>
                <div className="profile_edit_form">
                    <h3 className={dmSansFont.className}>Profile Info</h3>
                    <div className="editFormContent">
                    <ProfileEditForm></ProfileEditForm>
                    </div>
                </div>
            </Grid>
         </Grid>
         </div>
        </>
    );
};

export default Profile;