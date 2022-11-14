// external imports
import React, { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import SwitchToggle from '../element/SwitchToggle';
import { useMediaQuery } from '@mui/material';
import { dmFont, dmSansFont } from '../../utils/nextFont';


// intenal imports


interface Props {
  window?: () => Window;
}
const drawerWidth = 240;
const navItems = [
  {name:'Home',url:'/'},
  {name:'Rooms',url:'/rooms'},
  {name:'About',url:'/about'},
  {name:'login',url:'/login'}
];



const Header = (props: Props) => {
  const theme=useAppSelector(selectTheme)
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  
  // mobile drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
               <Link href={item.url} style={{textDecoration:'none',color:'red'}}>
               <ListItemText primary={item.name} />
               </Link>
            </ListItemButton>

          </ListItem>
        ))}
      </List>
    </Box>
  );
  
  const container = window !== undefined ? () => window().document.body : undefined;
  const mediaTab=useMediaQuery('(max-width:768px)')
    return (
      <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" 
          sx={{
          backgroundColor:theme==='light'?'transparent':'#000',
          color:theme==='light'?'#000':'',
          padding:{lg:'15px 25px',sx:'5px 0',xs:'0px 0 25px'},
          position:'absolute',
          boxShadow:'none',
          backgroundImage:'none'
          }}
      >
        <Toolbar 
            sx={{ justifyContent:'space-between',alignItems:'end',}}
          >
            {/* app logo */}
            <Link href='/' style={{textDecoration:'none',color:theme==='light'?'#000':'#fff'}}>
            <h6
                    className={dmFont.className}
                    style={{ 
                      margin:'0',
                      cursor:'pointer',
                      fontWeight:'bold', 
                      letterSpacing:'2px',fontSize:'25px' 
                    }}
                  > 
                  Aman <span style={{color:'#5C98F2'}}>Hotel</span> 
              </h6>
            </Link>
            
          {/* mobile menu icon */}
          <Box sx={{display: { sm: 'none',xs:'flex' }, }}>
           <SwitchToggle></SwitchToggle>
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
            {/* login btn dark switch*/}
                <Box sx={{display: { xs: 'none', sm: 'flex'}}}>
                <SwitchToggle></SwitchToggle>
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
                
                </Box>
        </Toolbar>
      </AppBar>
        {/* mobile drawer */}
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
     
    </Box>
    );
};

export default React.memo(Header);