import React from 'react';
import {Box, Button} from '@mui/material';
import {Drawer,CssBaseline} from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import RoomFilters from '../rooms/RoomFilters';
import { dmSansFont } from '../../utils/nextFont';
import Router  from 'next/router';

const drawerWidth = '100%';
const FilterRooms = ({open,setOpen,data}:any) => {

  const handleReset=()=>{
    setOpen(false)
    Router.push('/rooms')
  }
    return (
        <Box sx={{ display: 'flex',}}>
        <CssBaseline /> 
        <Drawer
          sx={{ width: drawerWidth,flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth,border:0,height: '100%'}, }}
          variant="persistent"
          anchor="right"
          open={open}
        >
        <div className='filter_rooms_main'>
        <div className='filter_rooms_main_header'>
           <WestIcon onClick={()=>setOpen(false)}/>
           <div className='filter_reset' onClick={handleReset}>
             <p>Reset</p>
           </div>
        </div>
        <div className='filterRoomMobileContent'>
        <RoomFilters filteredData={data}></RoomFilters>
        </div>
        </div>
        <div className='filterAction'>
         <p className={dmSansFont.className}>Filter ({data?.length})</p>
          <Button variant='contained' onClick={()=>setOpen(false)}>Show Result</Button>
        </div>
        </Drawer>
      </Box>
    );
};

export default FilterRooms;