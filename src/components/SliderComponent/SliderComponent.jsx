import React from 'react'
import { Image } from 'antd';
import { WrapperSliderStyle } from './style'

const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000
    };
    return (
        <WrapperSliderStyle {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image key={image} src={image} alt="slider" preview={false} width="100%" height="auto" />
                )
            })}

        </WrapperSliderStyle>
    )
}

export default SliderComponent