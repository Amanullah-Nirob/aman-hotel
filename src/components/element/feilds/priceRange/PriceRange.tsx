import { CircularProgress, Slider, SliderProps } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import InputField from '../InputField/InputField';

const valuetext = (value: number) => {
  return `${value}tk`;
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
  // console.log(sliderValue);
  
  const handleChange = useCallback(
    (event: Event, newValue: number | number[], activeThumb: number) => {
      if (!Array.isArray(newValue)) {
        return;
      }
      console.log(newValue);
      
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
      onChange({ target: { name, value: [sliderValue[0], +event.target.value] } });
    }
    if (event.target.name === 'min') {
      onChange({ target: { name, value: [+event.target.value, sliderValue[1]] } });
    }
  };

  useEffect(() => {
    if(value.length === 0){
      setSliderValue([min,max]);
    }else{
      setSliderValue(value);
    }
  }, [value[0],value[1]]);

  if (value) {
    return (
      <div>
        <div className='rangeSlier-header'>
          <p className='rangeSlider-header__label'>{label || 'Range Slider'}</p>
          <p className='rangeSlider-header__value'>
            {value[0]}&#2547; - {value[1]}&#2547;
          </p>
        </div>
        <Slider
          name={name}
          value={sliderValue.map(i=>Number(i))}
          valueLabelFormat={valuetext}
          onChange={handleChange}
          valueLabelDisplay='auto'
          min={min}
          max={max}
          step={100}
          onChangeCommitted={() => onChange({ target: { name: name || '', value: sliderValue } })}
        />
      
      </div>
    );
  }
  return <CircularProgress />;
};

export default React.memo(PriceRange);
