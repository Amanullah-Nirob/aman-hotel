import { Box, Grid } from '@mui/material';
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
                    <Grid item sm={3} key={roomItem?._id}>
                        <RoomCard {...roomItem}></RoomCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RoomContent;