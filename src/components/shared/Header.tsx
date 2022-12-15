// external imports
import React, { useState } from 'react';
import {AppBar,Avatar} from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { Container, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import RssFeedOutlinedIcon from '@mui/icons-material/RssFeedOutlined';
import MobileDrawer from '../header/MobileDrawer';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// intenal imports
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import SwitchToggle from '../element/SwitchToggle';
import { dmFont, dmSansFont } from '../../utils/nextFont';
import Search from '../search/Search';
import SearchIcon from '@mui/icons-material/Search';
import { selectCurrentUser } from '../../app/slices/auth/authSlice';
import ProfileMenu from '../menus/ProfileMenu';


interface Props {
  window?: () => Window;
}
const drawerWidth = 240;
export const navItems = [
  {name:'Home',url:'/',icon:<><HomeOutlinedIcon /></>},
  {name:'Rooms',url:'/rooms',icon:<><BedOutlinedIcon /></>},
  {name:'About',url:'/about',icon:<><InfoOutlinedIcon /></>},
  {name:'Blogs',url:'/blog',icon:<><RssFeedOutlinedIcon /></>},
];

const Header = (props: Props) => {
  const theme=useAppSelector(selectTheme)
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router=useRouter()
  const isRoomSearchOpen=router.pathname==='/'
  const loggedInUser=useAppSelector(selectCurrentUser)
  const [profileSettingsMenuAnchor, setProfileSettingsMenuAnchor] = useState<any | null>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  const mediaTab=useMediaQuery('(max-width:768px)')
    return (
        <Box sx={{ display: 'flex' }} className='header'>
          <AppBar component="nav"
              sx={{ 
              backgroundColor:theme==='light'?'transparent':'#000',color:theme==='light'?'#000':'',
              padding:{lg:'27px 0px 8px',sx:'5px 0',xs:'19px 0 18px'},
              position:'absolute',
              boxShadow:'none',
              backgroundImage:'none'
              }}
          >
            <Container maxWidth="xl" sx={{display:'flex', justifyContent:'space-between'}}>
                {/* app logo */}
                <Link href='/' style={{textDecoration:'none',color:theme==='light'?'#000':'#fff'}}>
                <h6 className={dmFont.className} 
                style={{ margin:'0',cursor:'pointer',fontWeight:'bold',letterSpacing:'2px',fontSize:'25px'}}
                > Aman <span style={{color:'#5C98F2'}}>Hotel</span> 
                </h6>
                </Link>
                
                    {/* mobile menu icon */}
                    <Box sx={{display: { sm: 'none',xs:'flex' }, }}>
                    <IconButton color="inherit" edge="start" sx={{ ml: 1, display: { sm: 'none' } }}>
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

                     {/* navigation list */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      {navItems.map((item) => (
                        <Button key={item.name} 
                          sx={{ 
                            color: '#fff',
                            marginRight:mediaTab?'5px':'25px',
                            textTransform:'capitalize',
                            fontSize:'15px',
                          }}
                        >
                        <Link href={item.url} 
                        className={dmSansFont.className}
                        style={{
                          textDecoration:'none',
                          fontWeight:'100',
                          color:theme==='light'?'#000':'#fff'
                          }}>{item.name}</Link>
                        </Button>
                      ))}
                    </Box>
                    <Box sx={{display:!isRoomSearchOpen?{md:'block',xs:'none'}:'none'}}>
                      <Search></Search>
                    </Box>
                {/* login btn dark switch*/}
                    <Box sx={{display: { xs: 'none', sm: 'flex'}}}>
                    <SwitchToggle></SwitchToggle>
                    {loggedInUser? (
                      <IconButton sx={{ color: "#999999",marginRight:'15px'}} onClick={(e) => setProfileSettingsMenuAnchor(e.target)}>
                          <Avatar src={loggedInUser?.profilePic} alt="User Profile Photo" />
                    </IconButton>
                    ):(
                      <Link href='/login' style={{color:'#fff',textDecoration:'none'}}>
                      <Button variant="contained"
                      sx={{padding:'9px 26px',
                      textTransform:'capitalize',
                      backgroundColor:'#5c98f2',
                      borderRadius:'10px',
                      fontSize:'14px',
                      marginLeft: '12px'
                      }}
                    >
                      Login
                      </Button>
                      </Link>
                    )}

                    
                    </Box>
            </Container>
      </AppBar>
      
        {/* mobile drawer */}
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            anchor="right"
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth ,},
            }}
          >
           <MobileDrawer setMobileOpen={setMobileOpen} mobileOpen={mobileOpen}></MobileDrawer>
          </Drawer>
        </Box>

    {/* ProfileMenu */}
       <ProfileMenu
         anchor={profileSettingsMenuAnchor}
         setAnchor={setProfileSettingsMenuAnchor}
     ></ProfileMenu>
    </Box>
    );
};

export default React.memo(Header);