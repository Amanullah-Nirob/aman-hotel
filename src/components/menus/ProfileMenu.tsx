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
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

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
          <MenuItem onClick={() => handleClickSettingsMenu(`/dashboard`)} className='profile_menu__item'>
            <AccountCircleOutlinedIcon/>
            Profile
          </MenuItem>
          {loggedinUser?.role === 'admin' && (
            <MenuItem
              className='profile_menu__item'
              onClick={() => handleClickSettingsMenu(`/profile/dashboard`)}
            >
              <AdminPanelSettingsIcon/>
              Admin Panel
            </MenuItem>
          )}
          <MenuItem
            className='profile_menu__item'
            onClick={() => handleClickSettingsMenu(`/profile/booking`)}
          >
            <StarBorderOutlinedIcon/>
            My Bookings
          </MenuItem>
          <MenuItem
            className='profile_menu__item'
            onClick={() => handleClickSettingsMenu(`/profile/likes`)}
          >
            <FavoriteBorderIcon />
            Liked
          </MenuItem>
          <MenuItem onClick={() => handleClickSettingsMenu(`/profile/favorites`)} className='profile_menu__item'>
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