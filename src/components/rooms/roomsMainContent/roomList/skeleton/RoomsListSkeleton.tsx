import { Grid } from '@mui/material';
import React from 'react';
import RoomCardSkeleton from './RoomCardSkeleton';

const RoomsListSkeleton = ({ pageSize }: { pageSize: number }) => {
  const roomsSkeletonArray = Array(pageSize).fill('');
  return (
    <Grid container spacing={2} >
      {roomsSkeletonArray.map((_, idx) => (
        <Grid item xl={3} lg={4} md={6} sm={6} xs={6} key={idx} className='rooms__list-item'>
          <RoomCardSkeleton></RoomCardSkeleton>
        </Grid>
      ))}
    </Grid>
  );
}; 

export default RoomsListSkeleton;