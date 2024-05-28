import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CardComponent from '../CardComponent/CardComponent'; // Đảm bảo đã import CardComponent hoặc tương tự

const ProductSlide = ({ products }) => {
    console.log(products)
    const options = {
        items: 5,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
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
    const sumArray = (mang) => {
        let sum = 0;
        mang.forEach(function (value) {
            sum += value.countInStock;
        });
        // console.log(sum)
        return sum;
    }

    return (
        <OwlCarousel className="owl-theme" {...options}>
            {products?.map(product => (

                <CardComponent key={product._id}
                    countInStock={sumArray(product.sizes)}
                    description={product.description}
                    images={product.images}
                    name={product.name}
                    rating={product.rating}
                    price={product.price}
                    type={product.type}
                    selled={product.selled}
                    discount={product.discount}
                    id={product._id} />

            ))}
        </OwlCarousel>
    );
};

export default ProductSlide;
