// external imports
import React from 'react';
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
// intenal imports


interface Props {
  window?: () => Window;
}
const drawerWidth = 240;
const navItems = [
  {name:'Home',url:'/'},
  {name:'Rooms',url:'/rooms'},
  {name:'About',url:'/about'},
  {name:'Contact',url:'/contact'}
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

    return (
      <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{backgroundColor:theme==='light'?'transparent':'#000',color:theme==='light'?'#000':'',padding:'15px 25px',position:'absolute',boxShadow:'none',backgroundImage:'none'}}>
        <Toolbar sx={{justifyContent:'space-between',padding:'0 50px 0 50px',alignItems:'end'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: 'none', sm: 'block',fontFamily:'dm',fontWeight:'bold',letterSpacing:'2px',fontSize:'25px' } }}
          > 
          Aman <span style={{color:'#5C98F2'}}>Hotel</span>
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.name} sx={{ color: '#fff',marginRight:'25px',textTransform:'capitalize',fontSize:'15px',fontFamily:'dms' }}>
               <Link href={item.url} style={{textDecoration:'none',color:theme==='light'?'#000':'#fff'}}>{item.name}</Link>
              </Button>
            ))}
          </Box>

         <Box sx={{display:'flex'}}>
        <Button variant="contained"
         sx={{padding:'9px 26px',textTransform:'capitalize',backgroundColor:'#5c98f2',borderRadius:'10px',fontSize:'14px',color:'#fff'}}
        >Login</Button>
        <SwitchToggle></SwitchToggle>
         </Box>

        </Toolbar>
      </AppBar>
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

export default Header;