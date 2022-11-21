import { Box, CircularProgress, Slider, SliderProps,styled } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import InputField from '../InputField/InputField';
import {dmSansFont} from '../../../../utils/nextFont'

const valuetext = (value: number) => {
  return `${value}৳`;
};

type onChange = {
  target: {
    name?: string;
    value: number[];
  };
};

type RangeSliderFieldProps = SliderProps & {
  label: string;
  minDistance?: number;
  value?: number[];
  onChange: (props: onChange) => void;
};


const MuiBox = styled(Box)(({ theme }) => ({
  display:'flex',
  '.MuiFormControl-root': {
    '&:first-of-type':{
      marginRight:'15px'
    },
    '.MuiInputBase-root':{
      '.MuiInputBase-input':{
        padding: '9px 14px'
      }
    }
  },
}));

const MuiSlider = styled(Slider)(({ theme }) => ({
  '.MuiSlider-thumb':{width:'12px',height:'12px'},
  '.MuiSlider-track':{border:'none'}
}));


const PriceRange: React.FC<RangeSliderFieldProps> = ({
  label,
  name,
  onChange,
  value = [],
  min = 0,
  max = 1000,
  minDistance = 1500,
}) => { 

  const [sliderValue, setSliderValue] = useState<number[]>(value.map(Number));
  
  const handleChange = useCallback(
    (event: Event, newValue: number | number[], activeThumb: number) => {
      if (!Array.isArray(newValue)) {
        return;
      }    
      if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], max - minDistance);
          setSliderValue([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minDistance);
          setSliderValue([clamped - minDistance, clamped]);
        }
      } else {
        setSliderValue(newValue);
      }
    },
    [max, minDistance]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'max') {
      onChange({ target: { name, value:[sliderValue[0], +event.target.value] } });
    }
    if (event.target.name === 'min') {
      onChange({ target: { name, value: [+event.target.value, sliderValue[1]] } });
    }
   };

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  if(value.length >0 ){
    return (
      <div className='priceRangeMainArea'>
        <div className='priceRangeHeader'>
          <h3 className={dmSansFont.className}>{label}</h3>
          <span>({value[0]}&#2547; - {value[1]}&#2547;)</span> 
        </div>
        <div className="priceRangeMainSlider">
        <MuiSlider
          name={name}
          value={sliderValue}
          valueLabelFormat={valuetext}
          onChange={handleChange}
          valueLabelDisplay='auto'
          min={min}
          max={max}
          step={100}
          onChangeCommitted={() => onChange({ target: { name: name || '', value: sliderValue } })}
        />
        </div>
        <MuiBox className='priceRangeInput'>
        <InputField
            label='min'
            btnvariant='outlined'
            inputProps={{ min: min }}
            name='min'
            type='number'
            value={String(value[0])}
            onChange={handleInputChange}
          />
          <InputField
            label='max'
            btnvariant='outlined'
            name='max'
            type='number'
            inputProps={{ max: max }}
            value={String(value[1])}
            onChange={handleInputChange}
          />
        </MuiBox>
      </div>
    );
  }

  return <CircularProgress />;
};

export default React.memo(PriceRange);
