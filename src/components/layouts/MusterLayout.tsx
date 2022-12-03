import React from 'react';
import { ThemeProvider ,createTheme} from '@mui/material/styles';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import { CssBaseline } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import Header from '../shared/Header';
import AppToast from '../common/appToast/AppToast';
import { useRouter } from 'next/router';
import Account from '../../pages/account';


interface LayoutProps {
    children: React.ReactNode;
}

  
const MusterLayout = ({children}:LayoutProps) => {
    const mode = useAppSelector(selectTheme);
    const router=useRouter()
    const theme = React.useMemo(
        () =>
          createTheme({
            palette: {
              mode,
            },
          }),
        [mode],
      );



    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header></Header>
        {router.pathname.startsWith('/account/')?(
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