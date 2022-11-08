// external imports
import { Grid,Paper } from '@mui/material';
import Container from '@mui/material/Container';
import Image from 'next/image';
import React from 'react';

// internal imports
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import homeBannerImage from '../../../public/static/images/homebanner1.jpg'
import SearchRoomsForm from '../common/forms/searchRoomsForm/SearchRoomsForm';


const HomeBanner = () => {
    const theme=useAppSelector(selectTheme)
    return (
        <div className='homeBanner' style={{backgroundColor:theme==='light'?'#f8f8f8':''}}>
         <Container>
         <div className="homeBannerAllContent">
         <Grid container>
            <Grid item sm={7}>
                <div className="homeBannerLeftArea">
                <div className="hmeBannerContentText">
                <h4>Book With Us!</h4>
                <h1>Find Next Place To <span style={{color:'#5C98F2'}}>Visit</span></h1>
                <p>Discover amzaing places at exclusive deals. <br /> Eat, Shop, Visit interesting places around the world.</p>
                </div>
              
            </div>
            </Grid>
            <Grid item sm={5}>
            <div className="homeRightArea">

            <Paper elevation={3} className='form-card searchRooms-form'>
            <h2>find rooms</h2>
            <SearchRoomsForm></SearchRoomsForm>
            </Paper>

            {/* <div className="homeRightImage">
               <Image src={homeBannerImage} layout='fill' alt={'home banner image'}></Image>
            </div> */}

            </div>
            </Grid>
          </Grid> 
        </div>
         </Container>
        </div>
    );
};

export default HomeBanner;