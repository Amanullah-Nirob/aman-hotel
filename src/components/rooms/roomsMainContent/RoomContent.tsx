import { Box, Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { RoomType } from '../../../types/types';
import RoomCard from './roomList/roomCard/RoomCard';

type RoomListProps = {
    rooms: RoomType[];
  };
  
const RoomContent: React.FC<RoomListProps> = ({ rooms }) => {
    return (
        <Box>
            <Grid container >
                {rooms.map((roomItem)=>(
                    <Grid item key={roomItem?._id} xl={4} lg={4} md={6} sm={6} xs={12}>
                       <RoomCard {...roomItem}></RoomCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RoomContent;