import React from 'react';
import { RoomType } from '../../../../../types/types';
import ImageSlider from '../../../../element/imageSlider/ImageSlider';
import Image from 'next/image';
import { roboto,dmSansFont,dmFont } from '../../../../../utils/nextFont';
import { Card, Divider } from '@mui/material';
import Link from 'next/link';
import { truncateString } from '../../../../../utils/appUtils';




const RoomCard: React.FC<RoomType> = ({ _id, roomNumber, price, type, images, comforts,title,description }) => {
    return (
    <Link href={`/rooms/${_id}`} style={{textDecoration:'none',color:''}}>
     <Card 
        sx={{cursor:'pointer'}}
        className='roomCard'>
        <div className="imageSlider">
            <ImageSlider>
            {images &&
              images.map(img => (
                <div className='room_card_gallery_image' key={img}>
                <Image src={img} alt='home banner image' fill
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  100vw"
                  placeholder="blur" blurDataURL={`/_next/image?url=${img}&w=16&q=1`} />
                </div>
              ))}
            </ImageSlider>
            <div className='roomType'>
              <p className={roboto.className}>{type}</p>
            </div>
        </div>  
        <div className={"roomDetails_area"} >
          <div className={"roomDetailsTop" }>
            <p className={dmSansFont.className}>Room No. {roomNumber}</p>
          </div>
          {/* <Divider /> */}
          <div className={dmSansFont.className+" roomDetailsInfo"}>
            <h3>{truncateString(title,23,23)}</h3>
            <p> <span style={{color:''}}>From:</span> &#2547; {price}</p>
          </div>
        </div>

        </Card>
      </Link>
   
    );
};

export default RoomCard;