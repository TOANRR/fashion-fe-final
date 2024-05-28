import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CardArticlesComponent from '../CardArticlesComponent/CardArticlesComponent';

const CarouselArticlesComponent = ({ articles }) => {
    console.log(articles)
    const options = {
        items: 5,
        loop: true,
        autoplay: true,
        autoplayTimeout: 7000,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 5,
            },
        },
    };


    return (
        <OwlCarousel className="owl-theme" {...options}>
            {articles?.map(article => (

                <CardArticlesComponent article={article} />

            ))}
        </OwlCarousel>
    );
};

export default CarouselArticlesComponent;
