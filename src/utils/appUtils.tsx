import { useMediaQuery } from "@mui/material";
import declOfNum from "./declOfNum";
import { useEffect, useState } from 'react';

export const guestsLabelGet = (adults: number, children: number, babies: number) => {
    const guests = [Number(adults), Number(children), Number(babies)];
    const countGuests = guests.reduce((acc, cur) => acc + cur, 0);
    const countAdults = Number(adults);
    const countChildren = Number(children);
    const countBabies = Number(babies);
  
    const guestsStr = `${countGuests} ${declOfNum(countGuests, ['guest', 'guest', 'guests'])}`;
    const adultStr = `${countAdults} ${declOfNum(countAdults, ['adult', 'adults', 'adults'])}`;
    const childrenStr = `${countChildren} ${declOfNum(countChildren, ['child', 'children', 'children'])}`;
    const babiesStr = `${countBabies} ${declOfNum(countBabies, ['baby', 'baby', 'babies'])}`;
  
    return (
        <>
        <span>
        {adultStr} 
        <small>•</small>
        </span> 
        <span>
        {childrenStr}
        <small>•</small>
        </span>
        <span>
         {babiesStr}
        </span>

        </>
    )
};

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay || 500);
      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);
    return debouncedValue; 
  }
  
export  const setPageSizeOptions = [
    { name: '6', value: 6 },
    { name: '12', value: 12 },
    { name: '18', value: 18 }, 
    { name: '24', value: 24 },
  ];