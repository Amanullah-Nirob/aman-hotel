import React from 'react';
import {Box,Avatar} from '@mui/material';
import {Drawer,CssBaseline} from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import { dmSansFont } from '../../utils/nextFont';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../app/slices/auth/authSlice';
import Sidebar from '../account/Sidebar';

const drawerWidth = '100%';

const ProfileDrawer = ({open,setOpen}:any) => {
    const loggedInUser=useAppSelector(selectCurrentUser)
    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline /> 
        <Drawer
          sx={{ width: drawerWidth,flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth,border:0,height: '92.5%'}, }}
          variant="persistent"
          anchor="right"
          open={open}
        >
        <div className='profile_Drawer_main'>
            <div className="profile_drawer_all_content">
                <div className="profile_drawer_title">
                <WestIcon sx={{marginRight:'17px'}} onClick={()=>setOpen(false)}/>
                <h3 className={dmSansFont.className}>Me</h3>
                </div>
             <div className='profile_drawer_photo'>
             <Avatar src={loggedInUser?.profilePic} sx={{width:'80px',height:'80px',margin:'auto'}} />
             <h3>{loggedInUser?.name}</h3>
             </div>
             <div className="profile_drawer_menu" onClick={()=>setOpen(false)}>
                <Sidebar></Sidebar>
             </div>
            </div>
        </div>
        </Drawer>
      </Box>
    );
};

export default ProfileDrawer;