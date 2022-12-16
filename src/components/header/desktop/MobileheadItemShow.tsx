import {Box,IconButton,Avatar} from '@mui/material';
import React,{useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
import SearchDrawer from '../../mobileDrawer/SearchDrawer';

const MobileheadItemShow = ({handleDrawerToggle}:any) => {
    const loggedInUser=useAppSelector(selectCurrentUser)
     // Search drawer state
      const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
    return (
       <Box sx={{display: { sm: 'none',xs:'block' }, }}>
        <Box sx={{display: { sm: 'none',xs:'flex' }, }}>
        <IconButton color="inherit" edge="start" sx={{ ml: 1, display: { sm: 'none' } }} onClick={()=>setOpenSearchDrawer(true)}>
        <SearchIcon/>
        </IconButton>
        {loggedInUser?(
        <Avatar src={loggedInUser.profilePic} sx={{ width: 32, height: 32,margin:'5px 10px' }} />
        ):(
        <Avatar sx={{ width: 32, height: 32,margin:'5px 10px'}}><PersonOutlineIcon /></Avatar>
        )}
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 1, display: { sm: 'none' } }}
            >
            <MenuIcon />
            </IconButton>
        </Box>
        <SearchDrawer open={openSearchDrawer} setOpen={setOpenSearchDrawer}></SearchDrawer>
       </Box>
    );
};

export default MobileheadItemShow;