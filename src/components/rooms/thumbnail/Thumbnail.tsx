import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { NextButton, PrevButton } from '../../element/imageSlider/ImageSlider';
import {Grid} from '@mui/material'


const Thumbnail = ({ images, type,vertical = true }:any) => {
    const [gallery, setGallery] = useState(undefined);
    const [variant, setVariant] = useState(undefined);
    const galleryCarousel = useRef<any| null>(null);
    const variantCarousel = useRef<any| null>(null);

      
    useEffect(() => {
        setGallery(galleryCarousel.current);
        setVariant(variantCarousel.current);
    }, []);
     

     const gallerySetting = {
        dots: false,
        infinite: false,
        adaptiveHeight: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextButton />,
        prevArrow: <PrevButton />,
      };
    const variantSetting = {
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    dots: false,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    dots: false,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    dots: false,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
        ],
    };

        //Views
        let variantCarouselView, imagesView, galleryImagesView ;
        if (images?.length > 0) {
            imagesView = images?.map((img:string) => (
                <div className="side_item_image" key={img}>
                 <Image src={img} alt='room image' fill
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  100vw"
                  placeholder="blur" blurDataURL={`/_next/image?url=${img}&w=16&q=1`} />
                </div>
            ));
            galleryImagesView = images?.map((img:string) => (
                <div className="thumbnail_main_image" key={img}>
                <Image src={img} alt='room image' fill
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                100vw"
                placeholder="blur" blurDataURL={`/_next/image?url=${img}&w=16&q=1`} />
                </div>
            ));
        }
       
        if (vertical) {
            variantCarouselView = (
                <Slider
                    asNavFor={gallery}
                    ref={(slider) => (variantCarousel.current = slider)}
                    swipeToSlide={true}
                    arrows={false}
                    slidesToShow={4}
                    vertical={true}
                    infinite={images.length > 3}
                    focusOnSelect={true}
                    {...variantSetting}
                    className="room_slider">
                    {imagesView}
                </Slider>
            );
        } else {
            variantCarouselView = (
                <Slider
                    asNavFor={gallery}
                    ref={(slider) => (variantCarousel.current = slider)}
                    swipeToSlide={true}
                    arrows={false}
                    slidesToShow={6}
                    vertical={false}
                    infinite={false}
                    focusOnSelect={true}
                    className="room_slider">
                    {imagesView}
                </Slider>
            );
        }


    return (
        <div className="thumbnail_image_main">
            <Grid container spacing={2}  sx={{flexDirection:{xs:'column-reverse',lg:'row'}}}>
                <Grid item lg={2} md={12} xs={12}>
                  {variantCarouselView}
                </Grid>
                <Grid item lg={10} md={12} xs={12}>
                <div className="single_room-slider">
                <div className="room-type-badge">
                 <p>{type}</p>
                </div>
                <Slider
                    {...gallerySetting}
                    ref={(slider) => (galleryCarousel.current = slider)}
                    asNavFor={variant}>
                    {galleryImagesView}
                  </Slider>
                </div>
                </Grid>
            </Grid>
    </div>
    );
};

export default Thumbnail;