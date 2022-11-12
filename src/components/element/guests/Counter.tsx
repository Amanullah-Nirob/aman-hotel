import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';
import React from 'react';


type OnChangeProps = {
  target: {
    name: string;
    value: number;
  };
};

type CounterProps = {
  name: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (props: OnChangeProps) => void;
};

const Counter: React.FC<CounterProps> = ({ name, label, value, min, max, onChange }) => {
  
  const handleIncrease = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (+value >= max) return;
    onChange({ target: { name: name, value: Number(value) + 1 } });
  };
  const handleDecrease = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (+value <= min) return;
    onChange({ target: { name: name, value: +value - 1 } });
  };

  return (
    <div className='counter-wrapper'>
      {label && <p className='counter-label'>{label}</p>}
      <div className='counter-buttons__wrapper'>
        <Button variant='outlined' size='small' aria-label='reduce' onClick={handleDecrease} >
          <RemoveIcon fontSize='small' />
        </Button>
        <input className='counter-input' type='text' value={value} readOnly />
        <Button variant='outlined' size='small' aria-label='increase' onClick={handleIncrease}>
          <AddIcon fontSize='small' />
        </Button>
      </div>
    </div>
  );
};

export default Counter;
