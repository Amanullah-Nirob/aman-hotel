import { useMediaQuery } from "@mui/material";
import declOfNum from "./declOfNum";


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
