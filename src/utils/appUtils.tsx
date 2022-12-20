import { useMediaQuery } from "@mui/material";
import declOfNum from "./declOfNum";
import { useEffect, useState } from 'react';

// guestsLabelGet
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
// useDebounce hook
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
// memoize
export const memoize = (func:Function) => {
    const cachedResults:any = {};
    return (...args:any) => {
      const argsKey = JSON.stringify(args);
      // Retrieve result from cache if present, else calculate
      const result = cachedResults[argsKey] || func(...args);
      // If result isn't saved in cache, save it for later use
      if (!cachedResults[argsKey]) cachedResults[argsKey] = result;
      return result;
    };
  };
  
  
// Truncate a sentence/string
export const truncateString = memoize((str:string, limit:number, index:number) => {
    if (!str || !limit || !index) return "";
    return str.length > limit ? `${str.substring(0, index)}...` : str;
});
  


// initialState url
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

// isImageFile validation
export const isImageFile = memoize((filename:any) =>
  /(\.png|\.jpg|\.jpeg|\.svg|\.webp)$/.test(filename)
);

// In bytes
export const ONE_KB = 1024;
export const ONE_MB = 1048576;
export const TWO_MB = 2097152;
export const FIVE_MB = 5242880;


export function toBoolean(env: string | undefined, initial: boolean) {
  if (typeof env !== 'undefined') {
    return env === 'true'
  }
  return initial
}