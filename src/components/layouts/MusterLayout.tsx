import React from 'react';
import { ThemeProvider ,createTheme} from '@mui/material/styles';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import { CssBaseline } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Header from '../shared/Header';
import AppToast from '../common/appToast/AppToast';
import { useRouter } from 'next/router';
import Account from '../../pages/account';
import { selectCurrentUser, setLoggedInUser } from '../../app/slices/auth/authSlice';
import jwtDecode from 'jwt-decode'

interface LayoutProps {
    children: React.ReactNode;
}

  
const MusterLayout = ({children}:LayoutProps) => {
    const mode = useAppSelector(selectTheme);
    const router=useRouter()
    const dispatch=useAppDispatch()
    const loggedInUser=useAppSelector(selectCurrentUser)
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
        </ThemeProvider>
    );
};

export default MusterLayout;