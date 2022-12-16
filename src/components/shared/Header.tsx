import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import RssFeedOutlinedIcon from '@mui/icons-material/RssFeedOutlined';
import MobileDrawer from '../header/mobile/MobileDrawer';
import MainHeader from '../header/desktop/MainHeader';


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
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{ display: 'flex' }} className='header'>
        <MainHeader handleDrawerToggle={handleDrawerToggle}></MainHeader>
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

    </Box>
    );
};

export default React.memo(Header);