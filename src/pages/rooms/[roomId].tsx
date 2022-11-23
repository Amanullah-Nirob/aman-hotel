import React from 'react';
import { useRoomGetByIdQuery } from '../../app/apiSlice/roomApiSlice';
import { useClientRouter } from "use-client-router";
import {Container} from '@mui/material'
import Head from 'next/head';
import BreadCrumb from '../../components/element/BreadCrumb';
import Thumbnail from '../../components/rooms/thumbnail/Thumbnail';
import {Grid,CircularProgress} from '@mui/material'
import {Box} from '@mui/material'
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import { useAppSelector } from '../../app/hooks';
import SingleRoomInfo from '../../components/rooms/singleRoom/SingleRoomInfo';



const RoomSingle = () => {
    const router=useClientRouter()
    const {roomId}=router.query
    const {data,isLoading,error,isError}:any=useRoomGetByIdQuery(roomId)
    const theme=useAppSelector(selectTheme)
    const breadCrumb = [
        {text:'Home',url: '/'},
        {text: 'Rooms',url: '/rooms'},
        {text: 'Room No. '+data?.roomNumber}
    ];
    if(!isLoading){
        return (
            <>
            <Head>
              <title>{ data?.roomNumber? 'Room No. '+data?.roomNumber :'Loading..'} | AmanHotel</title>
            </Head>
            <Box className='roomSingle_main_area' sx={{transform:theme==='light'?{sm:'translate(0px, 8vh)',xs:'translate(0px, 9vh)'}:'translate(0px, 10vh)'}}>
              <Container maxWidth="xl">
                <div className="single_Room_All_Content">
                <BreadCrumb breacrumb={breadCrumb} />
                <Grid container spacing={3}>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    <div className="singleImageThumbnail">
                    <Thumbnail type={data?.type} images={data?.images}></Thumbnail>
                    </div>
                    </Grid>
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
export default RoomSingle;