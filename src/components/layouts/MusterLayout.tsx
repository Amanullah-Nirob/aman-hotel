import React from 'react';
import { ThemeProvider ,createTheme} from '@mui/material/styles';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import { CssBaseline,Box,useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Header from '../shared/Header';
import AppToast from '../common/appToast/AppToast';
import { useRouter } from 'next/router';
import Account from '../../pages/account';
import { selectCurrentUser, setLoggedInUser } from '../../app/slices/auth/authSlice';
import jwtDecode from 'jwt-decode'
import MobileNavigation from '../header/mobile/mobileNavigation/MobileNavigation';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import InstallBanner from '../pwa-prompt/InstallBanner';
import { cookies, enablePWAInstallBanner } from '../../utils/pwaConfig';

interface LayoutProps {
    children: React.ReactNode;
}

  
const MusterLayout = ({children}:LayoutProps) => {
    const mode = useAppSelector(selectTheme);
    const router=useRouter()
    const dispatch=useAppDispatch()
    const loggedInUser=useAppSelector(selectCurrentUser)
    const matches = useMediaQuery('(max-width:600px)');

    const theme = React.useMemo(
        () =>
          createTheme({
            palette: {
              mode,
            },
          }),
        [mode],
      );

      if(loggedInUser?.token){
        const { exp }:any = jwtDecode(loggedInUser?.token)
         const expirationTime = (exp * 1000) - 60000
         if (Date.now() >= expirationTime) {
            dispatch(setLoggedInUser(null))
            if(router.pathname !== '/'){
              router.push('/')
            }
        }
      }
      const [showInstallPrompt, installPWA, hideInstallPrompt] = usePWAInstall({
        enable: enablePWAInstallBanner,
        cookieName: cookies.pwaInstallDismissed.name
     })
    
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header></Header>
        {router.pathname.startsWith('/account/')?(
          // @ts-ignore
          <Account>
            {children}
          </Account>
        ):(
          children
        )
        } 
          <AppToast></AppToast> 
          {/* mobile navigation */}
          <Box sx={{display:!matches?'none':'block'}}>
          <MobileNavigation />
          </Box>
          {}
          <InstallBanner
                onCancel={() => hideInstallPrompt(false)}
                onOk={installPWA}
                show={showInstallPrompt}
         />
        </ThemeProvider>
    );
};

export default MusterLayout;