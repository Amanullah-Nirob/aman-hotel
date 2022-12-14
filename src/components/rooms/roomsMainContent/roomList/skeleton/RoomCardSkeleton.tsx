import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Divider} from '@mui/material';

const RoomCardSkeleton = () => {
  return (
    <div className='room-card__skeleton'>
      <Skeleton variant='rectangular' animation='wave' height={230} />
      <Skeleton variant='text' animation='wave' height={27} width='31%' />
      <Skeleton variant='text' animation='wave' height={40} width='80%' />
      <Skeleton variant='text' animation='wave' height={27} width='40%' />
    </div>
  );
};

export default RoomCardSkeleton;