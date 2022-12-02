import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../app/slices/auth/authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { MenuItem, MenuList } from '@mui/material';
import Link from 'next/link';


const dashboard = () => {
    const loggedinUser=useAppSelector(selectCurrentUser)
    return (
        <MenuList className='sidebar' sx={{transform:'translate(0,114px)'}}>
        <MenuItem component={Link} className='sidebar-menu__item' href={`/dashboard`} >
          <AccountCircleIcon />
          My profile
        </MenuItem>
        {loggedinUser?.role !== 'admin' && (
          <MenuItem
            component={Link}
            className='sidebar-menu__item' 
            href={`/dashboard/admin`}
          >
            <AdminPanelSettingsIcon />
            Admin Panel
          </MenuItem>
        )}
        <MenuItem component={Link} className='sidebar-menu__item' href={`/dashboard/booking`} >
          <StarBorderIcon />
          My Bookings
        </MenuItem>
        <MenuItem component={Link} className='sidebar-menu__item' href={`/dashboard/likes`} >
          <FavoriteBorderIcon />
          Liked
        </MenuItem>
        <MenuItem component={Link} className='sidebar-menu__item' href={`/dashboard/favorites`}>
          <BookmarkBorderIcon />
          Favorites
        </MenuItem>
  
        <MenuItem className='sidebar-menu__item' component={Link} href={`/dashboard/edit`}>
          <SettingsIcon />
          Edit profile
        </MenuItem>
      </MenuList>
    );
};

export default dashboard;