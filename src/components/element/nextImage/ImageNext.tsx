import { useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const ImageNext = ({imageSrc}:any) => {
    const mediaTab=useMediaQuery('(max-width:600px)')
    return (
        <Image src={imageSrc} alt='room image' fill
         style={{borderRadius:mediaTab?'5px':'10px',objectFit:'cover'}}
        sizes="
        100vw"
          placeholder="blur" blurDataURL={`/_next/image?url=${imageSrc}&w=16&q=1`} />
    );
};

export default ImageNext;