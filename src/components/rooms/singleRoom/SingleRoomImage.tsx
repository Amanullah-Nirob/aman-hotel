import { Box, Grid } from '@mui/material';
import React from 'react';
import ImageNext from '../../element/nextImage/ImageNext';

const SingleRoomImage = ({images}:any) => {

    return (
        <div className='singleRoomImage'>
          <Grid container spacing={1}>
            <Grid item sm={6} xs={8}>
             <Box sx={{position:'relative',width:'100%',height:{lg:'470px',md:'430px',sm:'310px',xs:'270px'}}}>
              <ImageNext imageSrc={images[0]}></ImageNext>
            </Box>   
            </Grid>

            <Grid item sm={6} xs={4}>
            <Grid container spacing={1}>
                
            <Grid item sm={6} xs={12}>
            <Box sx={{position:'relative',width:'100%',height:{lg:'231px',md:'212px',sm:'152px',xs:'85px'}}}>
            <ImageNext imageSrc={images[1]}></ImageNext>
            </Box> 
            </Grid>

            <Grid item sm={6} xs={12}>
            <Box sx={{position:'relative',width:'100%',height:{lg:'231px',md:'212px',sm:'152px',xs:'85px'}}}>
            <ImageNext imageSrc={images[2]}></ImageNext>
            </Box> 
            </Grid>

            <Grid item sm={6} xs={12}>
            <Box sx={{position:'relative',width:'100%',height:{lg:'231px',md:'212px',sm:'152px',xs:'85px'}}}>
            <ImageNext imageSrc={images[0]}></ImageNext>
            </Box> 
            </Grid>

            <Grid item sm={6}>
            <Box sx={{position:'relative',width:'100%',height:{lg:'231px',md:'212px',sm:'152px'},display:{sm:'block',xs:'none'}}}>
            <ImageNext imageSrc={images[1]}></ImageNext>
            </Box> 
            </Grid>
         </Grid>
            </Grid>
        </Grid>  
        </div>
    );
};

  

export default SingleRoomImage;