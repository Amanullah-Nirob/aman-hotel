import { Container, Grid } from '@mui/material';
import React from 'react';
import PageContainer from '../../components/layouts/PageContainer';

const login = () => {
    return (
        <PageContainer title='Login'>
          <div className='login_Area_main'>
           <Container>
            <div className="loginAllContent">
                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <div className="login_Left_area">
                            login left
                        </div>
                    </Grid>
                    <Grid item sm={6}>
                        <div className="login_right_area">
                            login right
                        </div>
                    </Grid>
                </Grid>
            </div>
           </Container>

          </div>
        </PageContainer>
    );
};

export default login;