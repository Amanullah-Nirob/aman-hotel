import React from 'react';
import { useAppSelector } from '../../app/hooks';
import {Box,Container,Grid} from '@mui/material'
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import Router from 'next/router';
import BreadCrumb from '../../components/element/BreadCrumb';
import withAuth from '../../hooks/withAuth';
import Sidebar from '../../components/account/Sidebar';


const Account = ({children}:any) => {
    const theme=useAppSelector(selectTheme)
    const breadCrumb = [
      {text:'Home',url: '/'},
      {text: 'Account > '+ Router.pathname.split('/')[2]}
    ];


    return (
    <>
    <Box className='account_main'>
        <Container maxWidth="xl">
          <div className="account_all_content" style={{transform: theme==='light'?'translate(0px, 77px)':'translate(0px, 95px)'}}>
          <div className='account_breadCrumb'><BreadCrumb breacrumb={breadCrumb} /></div>
          <Grid container spacing={3}>
            <Grid item md={2.5} sm={3} xs={12} sx={{display:{sm:'block',xs:'none'}}}>
            <Sidebar></Sidebar>
            </Grid>
            <Grid item  md={9.5} sm={9}  xs={12}>
              {children}
            </Grid>
          </Grid>
          </div>
        </Container>
         
      </Box>
      </>

    );
};

export default withAuth(Account);