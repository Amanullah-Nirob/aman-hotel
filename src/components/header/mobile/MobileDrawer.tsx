import { Box,Divider,List,ListItem,ListItemButton } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import { navItems } from '../../shared/Header';
import HeaderMobileMenu from './element/HeaderMobileMenu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link';


const MobileDrawer = ({handleDrawerToggle}:any) => {
  const loggedInUser=useAppSelector(selectCurrentUser)


    return (
    <>
     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
       {!loggedInUser?(
            <Box sx={{display:'flex',justifyContent:'space-between',padding:'11px 40px',marginBottom:'3px'}}>
              <div className='singInBtnHeader'>
                <AccountBoxIcon sx={{fontSize:'30px'}} />
                <p>Sing up</p>
              </div>
              <Divider orientation="vertical"  flexItem />
              <div className='singInBtnHeader'>
              <LoginIcon />
                <p>Login</p>
              </div>
            </Box>
       ):(
        ''
       )}
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{padding:'6px 13px','>.MuiSvgIcon-root':{marginRight:'10px'}}} component={Link} href={item.url}>
               {item.icon}
               <span style={{fontSize:'15px'}}>{item.name}</span>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton 
        sx={{padding:'6px 13px',
        '>.MuiSvgIcon-root':{marginRight:'10px'
        }}}>
            <ExitToAppIcon sx={{marginRight:'10px'}} />
            <span style={{fontSize:'16px'}}>Logout</span>
        </ListItemButton>
      </List>
      <Divider />
    </Box>
    <List>
       <HeaderMobileMenu />
      </List>
    </>
   
    );
};

export default MobileDrawer;