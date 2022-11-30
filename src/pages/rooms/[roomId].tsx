import React from 'react';
import { useClientRouter } from "use-client-router";
import {Container} from '@mui/material'
import Head from 'next/head';
import BreadCrumb from '../../components/element/BreadCrumb';
import {Grid,CircularProgress} from '@mui/material'
import {Box} from '@mui/material'
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import { useAppSelector } from '../../app/hooks';
import SingleRoomInfo from '../../components/rooms/singleRoom/SingleRoomInfo';
import RoomServices from '../../services/RoomServices';
import SingleRoomImage from '../../components/rooms/singleRoom/SingleRoomImage';

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
                <Grid container spacing={3}>
                    <Grid item lg={6} md={6}>
                   <SingleRoomInfo data={data}></SingleRoomInfo>
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