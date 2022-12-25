import React,{useState} from 'react';
import {AppBar,Avatar,Container,Box,IconButton,Button,useMediaQuery} from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectTheme } from '../../../app/slices/theme/ThemeSlice';
import Link from 'next/link';
import { dmFont, dmSansFont } from '../../../utils/nextFont';
import { selectCurrentUser } from '../../../app/slices/auth/authSlice';
import { navItems } from '../../shared/Header';
import { useRouter } from 'next/router';
import Search from '../../search/Search';
import SwitchToggle from '../../element/SwitchToggle';
import ProfileMenu from '../../menus/ProfileMenu';
import MobileheadItemShow from './MobileheadItemShow';

const MainHeader = ({handleDrawerToggle}:any) => {
    const theme=useAppSelector(selectTheme)
    const loggedInUser=useAppSelector(selectCurrentUser)
    const mediaTab=useMediaQuery('(max-width:768px)')
    const router=useRouter()
    const isRoomSearchOpen=router.pathname==='/'
    const [profileSettingsMenuAnchor, setProfileSettingsMenuAnchor] = useState<any | null>(null);
 
    return (
        <Box sx={{ display: 'flex' }} className='header'>
        <AppBar component="nav"
          sx={{ 
          backgroundColor:theme==='light'?'transparent':'#000',color:theme==='light'?'#000':'',
          padding:{lg:'27px 0px 8px',sx:'5px 0',xs:!isRoomSearchOpen?'13px 0 11px':'19px 0 18px'},
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
          {/* mobile show desktop none */}
           <MobileheadItemShow handleDrawerToggle={handleDrawerToggle}></MobileheadItemShow>

               {/* navigation list */}
              <Box sx={{ display: { xs: 'none', sm: 'block',lineHeight:'40px' } }}>
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
              <Box sx={{display:!isRoomSearchOpen?{md:'block',xs:'none'}:'none',transform:theme==='light'?'translate(0px, 7px)':'translate(0px, 2px)'}}>
                <Search></Search>
              </Box>
          {/* login btn dark switch*/}
              <Box sx={{display: { xs: 'none', sm: 'flex'},transform:theme==='light'?'':'translate(0px, -4px)'}}>
              <Box sx={{transform: 'translate(-3px, 7px)'}}>
              <SwitchToggle></SwitchToggle>
              </Box>
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
     {/* ProfileMenu */}
        <ProfileMenu
        anchor={profileSettingsMenuAnchor}
        setAnchor={setProfileSettingsMenuAnchor}
      ></ProfileMenu>
        </Box>
    );
};

export default MainHeader;