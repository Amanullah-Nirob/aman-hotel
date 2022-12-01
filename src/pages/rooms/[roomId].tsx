import React from 'react';
import { useClientRouter } from "use-client-router";
import {Container,Paper} from '@mui/material'
import Head from 'next/head';
import BreadCrumb from '../../components/element/BreadCrumb';
import {Grid,CircularProgress} from '@mui/material'
import {Box} from '@mui/material'
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import { useAppSelector } from '../../app/hooks';
import SingleRoomInfo from '../../components/rooms/singleRoom/SingleRoomInfo';
import RoomServices from '../../services/RoomServices';
import SingleRoomImage from '../../components/rooms/singleRoom/SingleRoomImage';
import BookingForm from '../../components/booking/BookingForm';
import { dmSansFont } from '../../utils/nextFont';

const RoomSingle = ({data}:any) => {
    const theme=useAppSelector(selectTheme)
    const breadCrumb = [
        {text:'Home',url: '/'},
        {text: 'Rooms',url: '/rooms'},
        {text: 'Room No. '+data?.roomNumber}
    ];

    if(Object.keys(data).length!==0){
        return (
            <>
            <Head>
              <title>{ data?.title? data?.title :'Loading..'} | AmanHotel</title>
            </Head>
            <Box className='roomSingle_main_area' sx={{transform:theme==='light'?{sm:'translate(0px, 8vh)',xs:'translate(0px, 9vh)'}:'translate(0px, 10vh)'}}>
              <Container maxWidth="xl">
                <div className="single_Room_All_Content">
                <BreadCrumb breacrumb={breadCrumb} />
                <SingleRoomImage images={data.images}></SingleRoomImage>
                <Grid container spacing={5}>
                  <Grid item lg={8} md={8} sm={12} xs={12}>
                    <SingleRoomInfo data={data}></SingleRoomInfo>
                  </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                     <Paper elevation={2} className='bookingFormMain' sx={{padding: {lg:'24px 29px 37px',md:'15px',sm:'25px 30px'}}}>
                      <h2 className={dmSansFont.className +" bookMTitle"} >Book with your information</h2>
                     <div className='bookingHeader'>
                      <h3 className={dmSansFont.className}>Start from <span>&#2547; {data.price}</span> /Night </h3>
                    </div>
                      <BookingForm roomId={data?._id} price={data?.price}></BookingForm>
                     </Paper>
                    </Grid>
                </Grid>
                </div>
              </Container>
            </Box>
            </>
        );
    }
    return <CircularProgress />
 
};

export const getServerSideProps = async ({ params }: any) => {
  try {
      const id = params.roomId
      const data=await RoomServices.getRoom(id)
      return { props: {data} }
  } catch (err) {
      console.log(err);
      return { props: {} }
  }
}

export default RoomSingle;