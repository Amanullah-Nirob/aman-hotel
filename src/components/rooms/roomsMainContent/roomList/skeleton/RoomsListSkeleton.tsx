import { Grid } from '@mui/material';
import React from 'react';
import RoomCardSkeleton from './RoomCardSkeleton';

const RoomsListSkeleton = ({ pageSize }: { pageSize: number }) => {
  const roomsSkeletonArray = Array(pageSize).fill('');
  return (
    <Grid container spacing={2} sx={{padding:'15px'}}>
      {roomsSkeletonArray.map((_, idx) => (
        <Grid item sm={4} key={idx} className='rooms__list-item'>
          <RoomCardSkeleton></RoomCardSkeleton>
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomsListSkeleton;