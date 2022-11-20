import { CircularProgress, Slider, SliderProps } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import InputField from '../InputField/InputField';

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
  data?: {
    [key: string]: any;
  };
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
  data,
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
      onChange({ target: { name, value: [sliderValue[0], +event.target.value] } });
    }
    if (event.target.name === 'min') {
      onChange({ target: { name, value: [+event.target.value, sliderValue[1]] } });
    }
   };

  useEffect(() => {
    setSliderValue(data?.price);
  }, [data]);

    return (
      <div>
        <div className='priceRangeHeader'>
          <p>{label}</p>
          {
            value?.length === 0 ?  <p>{min}&#2547; - {max}&#2547;</p> : <p>{value[0]}&#2547; - {value[1]}&#2547;</p> 
          }
        </div>
        <div className="priceRangeMainSlider">
        <Slider
          name={name}
          value={sliderValue ? sliderValue.map((i)=>Number(i)): [min,max]}
          valueLabelFormat={valuetext}
          onChange={handleChange}
          valueLabelDisplay='auto'
          min={min}
          max={max}
          step={100}
          onChangeCommitted={() => onChange({ target: { name: name || '', value: sliderValue } })}
        />
        </div>

       
      </div>
    );

  // return <CircularProgress />;
};

export default React.memo(PriceRange);
