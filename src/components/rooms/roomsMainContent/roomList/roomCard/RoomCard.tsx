import React from 'react';
import { RoomType } from '../../../../../types/types';
import ImageSlider from '../../../../element/imageSlider/ImageSlider';
import Image from 'next/image';


const RoomCard: React.FC<RoomType> = ({ _id, roomNumber, price, type, images, comforts }) => {
    return (
        <div className='roomCard'>
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
        </div>
    );
};

export default RoomCard;