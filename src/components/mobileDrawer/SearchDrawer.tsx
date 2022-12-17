import React from 'react';
import { styled } from '@mui/material/styles';
import {Box,ListItemButton} from '@mui/material';
import {Drawer,CssBaseline,IconButton} from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import Search from '../search/Search';

const drawerWidth = '100%';

const SearchDrawer = ({open,setOpen}:any) => {
    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline /> 
        <Drawer
          sx={{ width: drawerWidth,flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth,border:0,height: '92%'}, }}
          variant="persistent"
          anchor="right"
          open={open}
        >
        <div className='search_drawer_main'>
        <div className='search_drawer_header'>
           <WestIcon sx={{marginRight:'15px'}} onClick={()=>setOpen(false)}/>
           <div className='search_drawer_main_search'>
            <Search setOpen={setOpen} open={open}></Search>
           </div>
        </div>
        </div>
        </Drawer>
      </Box>
    );
};

export default SearchDrawer;