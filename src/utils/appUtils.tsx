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

export function useDebounce(value:string, delay:number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
          setDebouncedValue(value);
      }, delay);

      return () => {
          clearTimeout(handler);
      };
  }, [value, delay]);

  return debouncedValue;
}

  


const oneDayMs = 86000000;

export const initialState = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 1,
  children: 0,
  babies: 0,
  price: [0, 15000],
  hasConditioner: false,
  hasWifi: false,
  hasWashingMachine: false,
  hasKitchen: false,
  hasWorkSpace: false,
  guestAllow: false,
  smokingAllow: false,
  animalAllow: false,
  standard: false,
  moderate: false,
  deluxe: false,
  suite: false,
};
