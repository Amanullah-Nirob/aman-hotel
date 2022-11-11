import React from 'react';
import Counter from './Counter';
import declOfNum from '../../../utils/declOfNum';
import { Box } from '@mui/material';

export const getGuestsLabel = (adults: number, children: number, babies: number) => {
  const guests = [Number(adults), Number(children), Number(babies)];
  const countGuests = guests.reduce((acc, cur) => acc + cur, 0);
  const countBabies = Number(babies);

  const guestsStr = `${countGuests} ${declOfNum(countGuests, ['guest', 'guest', 'guests'])}`;
  const babiesStr = `${countBabies} ${declOfNum(countBabies, ['baby', 'baby', 'babies'])}`;

  if (countGuests > 0 && countBabies > 0) {
    return `${guestsStr} with ${babiesStr}`;
  }

  return countGuests > 0 ? guestsStr : 'How many guests';
};

type GuestsCounterProps = {
  data: { adults: number; children: number; babies: number };
  onChange: ({ target }: any) => void;
};

const GuestsCounter: React.FC<GuestsCounterProps> = ({ data, onChange }) => {
  const { adults, children, babies } = data;

  return (
    <Box sx={{padding:'20px'}}>
      <p className='guests-label'>{getGuestsLabel(adults, children, babies)}</p>
      <Counter name='adults' label='adults' min={1} max={10} onChange={onChange} value={+adults} />
      <Counter name='children' label='Children' min={0} max={10} onChange={onChange} value={children} />
      <Counter name='babies' label='babies' min={0} max={10} onChange={onChange} value={+babies} />
    </Box>
  );
};

export default React.memo(GuestsCounter);