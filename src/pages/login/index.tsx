import { Box, Button, Container, Grid, Paper } from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import LoginForm from '../../components/login/LoginForm';
import logo from '../../../public/static/images/fav.png'
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import Register from '../../components/login/Register';


const Login = () => {
    const theme=useAppSelector(selectTheme)
    const [registerOpen,setRegisterOpen]=useState(false)
    
    const handleRegisterToggle=()=>{
        setRegisterOpen(!registerOpen)
    }

    return Router.isFallback ? (
        <>
          <Head>
            <title>Loading...</title>
          </Head>
        </>
      ):(
   <>
      <Head>
        <title>Login | AmanHotel</title>
      </Head>
      <Box className='login_Area_main' style={{backgroundColor:theme==='light'?'#f8f8f8':'#000'}}>
           <Container sx={{zIndex:'1'}}>
            <div className="loginAllContent">
                <Grid container spacing={2}>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <div className={!registerOpen?"login_right_area loginOpen":"login_right_area registerOpen"}>
                            <Paper className="LoginBox" elevation={2}>
                               <div className='login_title'>
                               <Image src={logo} alt='company logo' style={{width:'60px',height:'60px'}} placeholder="blur"/>
                               <h2>Aman Hotel</h2>
                               </div>
                              {!registerOpen? <LoginForm />:<Register />}  

                                <div className='auth-form__footer'>
                                    <span>{registerOpen?'Already have an account ?':'Dont have a account?'}</span>
                                    <Button variant='text' onClick={handleRegisterToggle}>{!registerOpen?'Register':'Login'}</Button>
                                </div>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </div>
           </Container>
           <div className="login_shape">
              <svg viewBox="0 0 1540 314" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0 314V134.5C0 134.5 107 332.811 376 296C645 259.189 709.5 161.5 709.5 161.5L1140 160H1540V314H0Z" fill={theme==='light'?'white':'#121212'}></path>
                <path d="M1256 172.039C1444 206.039 1540 296.5 1540 296.5V138C1540 138 1464.5 75.0404 1303 31.0401C1240.5 14.8677 1042 -24.959 902.5 22.5401C825 48.9286 803.5 66.04 728.5 143.54C697.344 175.734 635.5 219.5 635.5 219.5C635.5 219.5 726 256.039 822 240.039C986 220.039 1083 149.539 1256 172.039Z"
                 fill={theme==='light'?'#ECF2FC':'#15253c'}></path>
              </svg>
          </div>
          </Box>
   </>
    );
};

export default Login;