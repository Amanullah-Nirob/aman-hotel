import React,{useState,useEffect} from 'react';
import {BottomNavigation,Box} from '@mui/material';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useAppSelector } from '../../../../app/hooks';
import { selectTheme } from '../../../../app/slices/theme/ThemeSlice';
import HomeIcon from '@mui/icons-material/Home';
import BedIcon from '@mui/icons-material/Bed';
import Link from 'next/link';
import Router  from 'next/router';
import PersonIcon from '@mui/icons-material/Person';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

const MobileNavigation = () => {
    const pathname=Router.pathname
    const [value, setValue] = useState(pathname);
    const theme=useAppSelector(selectTheme)

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

    useEffect(()=>{
        setValue(pathname)
    },[pathname])
    return (
        <Box className='mobileNavigation'>
        <BottomNavigation sx={{ 
            width: '100%',position:'fixed',bottom:'0',zIndex:'1000',
            borderTop:theme==='light'?'1px solid #d3d3d3':'1px solid #2e2e2e',
            backgroundColor:theme==='light'?'#fff':'#000',
            height:'58px'
            }} value={value} onChange={handleChange}>

            <BottomNavigationAction
                label="Home"
                value="/"
                icon={<Link style={{color:'inherit'}} href='/'><HomeIcon /></Link>}
            />
            <BottomNavigationAction 
                label="Rooms"
                value={'/rooms'}
                icon={<Link style={{color:'inherit'}} href='/rooms'><BedIcon /></Link>}
            />
            <BottomNavigationAction
                label="Booking"
                value="/account/booking"
                icon={<Link style={{color:'inherit'}} href='/account/booking'><ContentPasteIcon /></Link>}
            />
            <BottomNavigationAction 
                label="Profile" 
                value="/account/profile" 
                icon={<Link style={{color:'inherit'}} href='/account/profile'><PersonIcon /></Link>}
            />
            </BottomNavigation>
        </Box>
    );
};

export default MobileNavigation;