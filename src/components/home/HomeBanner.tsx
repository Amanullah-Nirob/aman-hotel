// external imports
import { Grid,Paper } from '@mui/material';
import Container from '@mui/material/Container';
import Image from 'next/image';
import React from 'react';

// internal imports
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import homeBannerImage from '../../../public/static/images/homebanner1.jpg'
import SearchRoomsForm from '../element/forms/searchRoomsForm/SearchRoomsForm';


const HomeBanner = () => {
    const theme=useAppSelector(selectTheme)
    return (
        <div className='homeBanner' style={{backgroundColor:theme==='light'?'#f8f8f8':'#000'}}>
         <Container sx={{zIndex:'2'}}>
         <div className="homeBannerAllContent">
         <Grid container>
            <Grid item sm={7}>
                <div className="homeBannerLeftArea">
                <div className="hmeBannerContentText">
                <h4 style={{backgroundColor: theme==='light'?'#fff':'#121212'}}>Book With Us!</h4>
                <h1>Find Next Place To <span style={{color:'#5C98F2'}}>Visit</span></h1>
                <p>Discover amzaing places at exclusive deals. <br /> Eat, Shop, Visit interesting places around the world.</p>
                </div>
              <div className='rooms_homeBanner_find'>
              <SearchRoomsForm></SearchRoomsForm>
              </div>
            </div>
            </Grid>
            <Grid item sm={5}>
            <div className="homeRightArea">
            <div className="homeRightImage">
               <Image src={homeBannerImage} layout='fill' alt={'home banner image'}></Image>
            </div>

            </div>
            </Grid>
          </Grid> 
        </div>
         </Container>
      <div className="home_banner_shape">
      <svg viewBox="0 0 1540 314" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 314V134.5C0 134.5 107 332.811 376 296C645 259.189 709.5 161.5 709.5 161.5L1140 160H1540V314H0Z" fill={theme==='light'?'white':'#121212'}></path>
        <path d="M1256 172.039C1444 206.039 1540 296.5 1540 296.5V138C1540 138 1464.5 75.0404 1303 31.0401C1240.5 14.8677 1042 -24.959 902.5 22.5401C825 48.9286 803.5 66.04 728.5 143.54C697.344 175.734 635.5 219.5 635.5 219.5C635.5 219.5 726 256.039 822 240.039C986 220.039 1083 149.539 1256 172.039Z" 
        fill={theme==='light'?'#ECF2FC':'#0a1018'}></path>
        </svg>
      </div>
        </div>
    );
};

export default HomeBanner;