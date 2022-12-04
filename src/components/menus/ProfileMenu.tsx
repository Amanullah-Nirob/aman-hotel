import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentUser, setLoggedInUser } from '../../app/slices/auth/authSlice';
import Router from 'next/router';
import Menu from '../../utils/Menu';
import {MenuItem} from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const ProfileMenu = ({anchor,setAnchor}:any) => {
    const loggedinUser=useAppSelector(selectCurrentUser)
    const dispatch=useAppDispatch()
    const theme=useAppSelector(selectTheme)

    
    const handleClickSettingsMenu = (path: string) => {
        Router.push(path);
        setAnchor(null)
    };

    // logout area
    const logout=()=>{
        dispatch(setLoggedInUser(null))
        Router.push('/')
        console.log(`log out successfully`);
        setAnchor(false)
    }
    //   stroke: theme==='light'?"#f5f5f5":'#484848'
      return (
          <Menu 
            menuAnchor={anchor}
            setMenuAnchor={setAnchor}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
          <MenuItem onClick={() => handleClickSettingsMenu(`/account/dashboard`)} className='profile_menu__item'>
            <ArticleOutlinedIcon/>
             Dashboard
          </MenuItem> 

          <MenuItem onClick={() => handleClickSettingsMenu(`/account/profile`)} className='profile_menu__item'>
            <PersonOutlineIcon/>
             Profile
          </MenuItem> 

          {loggedinUser?.role === 'admin' && (
            <MenuItem
              className='profile_menu__item'
              onClick={() => handleClickSettingsMenu(`/account/admin`)}
            >
              <AdminPanelSettingsIcon/>
              Admin Panel
            </MenuItem>
          )}

          <MenuItem
            className='profile_menu__item'
            onClick={() => handleClickSettingsMenu(`/account/booking`)}
          >
            <EventNoteOutlinedIcon/>
            Bookings
          </MenuItem>
          <MenuItem
            className='profile_menu__item'
            onClick={() => handleClickSettingsMenu(`/account/review`)}
          >
            <StarBorderIcon />
            Reviews
          </MenuItem>
          <MenuItem
            className='profile_menu__item'
            onClick={() => handleClickSettingsMenu(`/account/like`)}
          >
            <ThumbUpOutlinedIcon />
            Liked
          </MenuItem>
          <MenuItem onClick={() => handleClickSettingsMenu(`/account/favorites`)} className='profile_menu__item'>
            <BookmarkBorderIcon />
            Favorites
          </MenuItem>
          <MenuItem onClick={logout} className='profile_menu__item'>
            <ExitToAppIcon />
           LogOut
          </MenuItem>
  
          </Menu>
      );
};

export default ProfileMenu;