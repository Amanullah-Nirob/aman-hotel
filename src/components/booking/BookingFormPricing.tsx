import React, { useEffect } from 'react';
import { dmSansFont } from '../../utils/nextFont';

type Props = {
    price: number;
    countDays: number;
    setTotalPrice: (value: number) => void;
    totalPrice: number;
};
  
const BookingFormPricing : React.FC<Props> = ({ price, countDays, setTotalPrice, totalPrice }) => {
    const DISCOUNT_PERCENT = 10;
    const PRICE_SERVICE = 300;
    const PRICE_RENT = price * countDays;
    const PRICE_RENT_WITH_DISCOUNT = (price * countDays * DISCOUNT_PERCENT) / 100;

    const getTotalPrice = () => {
        return PRICE_RENT - PRICE_RENT_WITH_DISCOUNT + PRICE_SERVICE;
    };

    useEffect(() => {
        const totalPrice = getTotalPrice();
        setTotalPrice(totalPrice);
    }, [countDays]);
    
    return (
        <div className='bookingPrice'>
           <div className='priceBox'>
             <p>{price} x {countDays} day</p>
             <p>&#2547; {PRICE_RENT}</p>
           </div>
           <div className='priceBox'>
            <p>Discount: {DISCOUNT_PERCENT}% </p>
            <p>&#2547; {PRICE_RENT_WITH_DISCOUNT}</p>
           </div>
           <div className='priceBox'>
           <p>extra services</p>
           <p>&#2547; {PRICE_SERVICE}</p>
           </div>
           <div className={"totalPrice"}>
             <h3 className={dmSansFont.className}>Total:</h3>
             <h4 className={dmSansFont.className}>&#2547; {totalPrice}</h4>
           </div>
        </div>
    );
};

export default BookingFormPricing;