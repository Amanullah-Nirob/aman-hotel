import React from 'react';
import { ThemeProvider ,createTheme} from '@mui/material/styles';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import { CssBaseline } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import Header from '../shared/Header';

interface LayoutProps {
    children: React.ReactNode;
}

  
const MusterLayout = ({children}:LayoutProps) => {
    const mode = useAppSelector(selectTheme);
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
            {children}
        </ThemeProvider>
    );
};

export default MusterLayout;