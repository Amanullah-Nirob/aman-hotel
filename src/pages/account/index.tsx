import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentUser, setLoggedInUser } from '../../app/slices/auth/authSlice';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { MenuItem,MenuList,Paper } from '@mui/material';
import Link from 'next/link';
import {Box,Container,Grid} from '@mui/material'
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import Router from 'next/router';
import BreadCrumb from '../../components/element/BreadCrumb';
import CustomMenuLink from '../../utils/CustomMenuLink';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

interface LayoutProps {
  children: React.ReactNode;
}

const Account = ({children}:LayoutProps) => {
    const loggedinUser=useAppSelector(selectCurrentUser)
    const theme=useAppSelector(selectTheme)
    const dispatch=useAppDispatch()

    const breadCrumb = [
      {text:'Home',url: '/'},
      {text: 'Dashboard > '+Router.pathname.slice(11)}
    ];

    // logout area
    const logout=()=>{
        dispatch(setLoggedInUser(null))
        Router.push('/')
    }
 
    return (
    <>
    <Box className='account_main'>
        <Container maxWidth="xl">
          <div className="account_all_content" style={{transform: theme==='light'?'translate(0px, 77px)':'translate(0px, 95px)'}}>
          <BreadCrumb breacrumb={breadCrumb} />

          <Grid container spacing={5}>
            <Grid item sm={2.5}>
         <Box className='sideBar_main'>
     
            <div className="sidebar_all_menu">
                <CustomMenuLink href={`/`}>
                    <HomeOutlinedIcon 
                    sx={{marginRight:'6px',fontSize:'26px',
                    stroke: theme==='light'?"#f5f5f5":'#000000'}} />
                     <p>Home</p>
                </CustomMenuLink>

                  <CustomMenuLink href={`/account/dashboard`}>
                    <ArticleOutlinedIcon 
                    sx={{marginRight:'5px',fontSize:'26px',
                    stroke: theme==='light'?"#f5f5f5":'#000000'}} />
                    <p>Dashboard</p>
                  </CustomMenuLink>


                  <CustomMenuLink href={`/account/profile`}>
                    <Person2OutlinedIcon 
                    sx={{marginRight:'6px',fontSize:'26px',
                    stroke: theme==='light'?"#f5f5f5":'#000000'}} />
                    profile
                  </CustomMenuLink>

                  {/* only admin */}
                  {loggedinUser?.role === 'admin' && (
                    <CustomMenuLink href={`/account/admin`}>
                    <AdminPanelSettingsIcon 
                    sx={{marginRight:'6px',fontSize:'26px',
                    stroke: theme==='light'?"#f5f5f5":'#000000'}} />
                      Admin Panel
                    </CustomMenuLink>
                  )}

                  <CustomMenuLink  href={`/account/booking`} >
                    <EventNoteOutlinedIcon 
                    sx={{marginRight:'6px',fontSize:'26px',
                    stroke: theme==='light'?"#f5f5f5":'#000000'}} />
                     Bookings
                  </CustomMenuLink>

                  <CustomMenuLink  href={`/account/review/${loggedinUser._id}`} >
                    <StarBorderIcon 
                    sx={{marginRight:'6px',fontSize:'26px',
                    stroke: theme==='light'?"#f5f5f5":'#000000'}} />
                    Reviews
                  </CustomMenuLink>
                  <CustomMenuLink  href={`/account/likes`} >
                    <ThumbUpOutlinedIcon 
                    sx={{marginRight:'6px',fontSize:'26px',
                    stroke: theme==='light'?"#f5f5f5":'#000000'}} />
                    Liked
                  </CustomMenuLink>
                  <CustomMenuLink  href={`/account/favorites`}>
                    <FavoriteBorderIcon 
                    sx={{marginRight:'6px',fontSize:'26px',
                    stroke: theme==='light'?"#f5f5f5":'#000000'}} />
                    Favorites
                  </CustomMenuLink>
                  <MenuItem className='sidebar_menu_item' onClick={logout}>
                    <StarBorderIcon 
                    sx={{marginRight:'6px',fontSize:'26px',
                    stroke: theme==='light'?"#f5f5f5":'#000000'}} />
                    Sign out
                  </MenuItem>
                    </div>

                </Box>
            </Grid>
            <Grid item sm={9.5}>
              {children}
            </Grid>
          </Grid>
          </div>
        </Container>
         
      </Box>
      </>

    );
};

export default  Account;