import React from 'react';
import {Box,MenuItem} from '@mui/material'
import CustomMenuLink from '../../utils/CustomMenuLink';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentUser, setLoggedInUser } from '../../app/slices/auth/authSlice';
import Router from 'next/router';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Sidebar = () => {
    const loggedinUser=useAppSelector(selectCurrentUser)
    const dispatch=useAppDispatch()
    const theme=useAppSelector(selectTheme)

    // logout area
    const logout=()=>{
        dispatch(setLoggedInUser(null))
        Router.push('/')
    }
    return (
      <>
      {loggedinUser && (
         <Box className='sideBar_main' sx={{borderRight:theme==='light'?'1px solid #ddd':'1px solid #443e3e'}}>
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
               <CustomMenuLink  href={`/account/likes/${loggedinUser._id}`} >
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
      )}
      </>
       
    );
};

export default Sidebar;