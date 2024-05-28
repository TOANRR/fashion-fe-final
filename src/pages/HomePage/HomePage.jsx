import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperTypeFeatured, WrapperTypeFeaturedSec, WrapperTypeProduct, Nav, NavLink, ParentContainer } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'
import CardHomeComponent from '../../components/CardHomeComponent/CardHomeComponent'
import { WrapperProducts } from '../TypeProductPage/style'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import { useDebounce } from '../../hooks/useDebounce'
import { useDebounceArray } from '../../hooks/useDebounceArray'
import { Button, Col, Row } from 'antd'
import CarouselComponent from '../../components/CarouselComponent/CarouselComponent'
import { animateScroll as scroll } from 'react-scroll';

import './action.css'
import { Link } from 'react-router-dom'
import SliderArticlesComponent from '../../components/SliderArtilcesComponent/SliderArticlesComponent'
// import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
// import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  // const isImage = useSelector((state) => state?.product?.isImage)
  const productImgs = useSelector((state) => state?.product?.productImgs)
  const dispatch = useDispatch()

  const searchDebounce = useDebounce(searchProduct, 200)
  // const searchImageDebounce = useDebounceArray(productImgs, 200)

  const refSearch = useRef()
  const [loading, setLoading] = useState(false)
  const [stateProducts, setStateProducts] = useState([])
  const [typeProducts, setTypeProducts] = useState([])
  const [limit, setLimit] = useState(8)



  const fetchProductsType = async (type) => {
    return await ProductService.getProductByType(type);
  };
  const { data: productsWomen, isLoading: womenLoad } = useQuery({
    queryKey: ['products-women'],
    queryFn: () => fetchProductsType('women'),
    retry: 3,
  });

  const { data: productsMen, isLoading: menLoad } = useQuery({
    queryKey: ['products-men'],
    queryFn: () => fetchProductsType('men'),
    retry: 3,
  });

  const { data: productsKids, isLoading: kidLoad } = useQuery({
    queryKey: ['products-kids'],
    queryFn: () => fetchProductsType('kids'),
    retry: 3,
  });

  const fetchProductAll = async (context) => {
    // console.log('context', context)
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const ids = context?.queryKey && context?.queryKey[3]

    const res = await ProductService.getAllProduct(search, limit)

    return res
    // }

  }
  const scrollToSection = (sectionId) => {
    scroll.scrollTo(document.getElementById(sectionId).offsetTop, {
      smooth: true,
      duration: 500,
    });
  };
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if (res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }
  const sumArray = (mang) => {
    let sum = 0;
    mang.forEach(function (value) {
      sum += value.countInStock;
    });
    // console.log(sum)
    return sum;
  }

  const { isLoading, data: products, isPreviousData } = useQuery({ queryKey: ['products', limit, searchDebounce], queryFn: fetchProductAll, retry: 3, retryDelay: 1000, keepPreviousData: true })

  // console.log('data', products?.data[0].sizes[0].countInStock)
  useEffect(() => {
    fetchAllTypeProduct()
  }, [])
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  return (
    <>
      <Loading isLoading={isLoading || loading}>

        <div className='body' style={{ width: '100%', backgroundColor: '#ffff', }}>
          <div id="container" style={{ height: '100%', width: '100%', margin: '0 auto' }}>
            <SliderComponent arrImages={[slider1, slider2, slider3]} />
          </div>
          <Row justify="space-between" style={{ marginTop: "30px", width: "100%", display: "flex", justifyContent: "center" }}>
            <Col span={8} className="banner-col" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className={`image-container ${isHovered ? 'hovered' : ''}`}>
                <img src="https://www.gento.vn/wp-content/uploads/2023/05/xu-huong-thoi-trang-nam-0.jpg" alt="Men's Fashion" />
                {isHovered && (
                  <Button className="explore-button" onClick={() => scrollToSection('nam-gioi-section')}>Khám phá</Button>
                )}
              </div>
            </Col>
            <Col span={8} className="banner-col" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className={`image-container ${isHovered ? 'hovered' : ''}`}>
                <img src="https://cdn.chanhtuoi.com/uploads/2021/09/top-thuong-hieu-thoi-trang-nu-duoc-ua-chuong.jpg" alt="Women's Fashion" />
                {isHovered && (
                  <Button className="explore-button" onClick={() => scrollToSection('nu-gioi-section')}>Khám phá</Button>
                )}
              </div>
            </Col>
            <Col span={8} className="banner-col" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className={`image-container ${isHovered ? 'hovered' : ''}`}>
                <img src="https://cdn.tgdd.vn//News/1475421//10-thuong-hieu-thoi-trang-tre-em-noi-tieng-tai-7-845x500.jpg" alt="Kids' Fashion" />
                {isHovered && (
                  <Button className="explore-button" onClick={() => scrollToSection('be-section')}>Khám phá</Button>
                )}
              </div>
            </Col>
          </Row>
          <div style={{ width: '100%', height: "70px", margin: '0 auto', backgroundColor: '#000000', marginBottom: "30px", marginTop: "40px" }}>
            <WrapperTypeFeatured>FEATURED PRODUCTS</WrapperTypeFeatured>
          </div>
          <div id="container" style={{ height: '100%', width: '80%', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <WrapperProducts>
                {products?.data?.map((product) => (
                  <CardHomeComponent
                    key={product._id}
                    countInStock={sumArray(product.sizes)}
                    description={product.description}
                    images={product.images}
                    name={product.name}
                    rating={product.rating}
                    price={product.price}
                    type={product.type}
                    selled={product.selled}
                    discount={product.discount}
                    id={product._id}
                  />
                ))}
              </WrapperProducts>

              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                {!(
                  products?.total === products?.data?.length || products?.totalPage === 1
                ) && (
                    <ParentContainer>
                      <WrapperButtonMore
                        textbutton={isPreviousData ? 'Load more' : 'Xem thêm'}
                        type="outline"
                        styleButton={{
                          border: '1px solid #000000',
                          color: `${products?.total === products?.data?.length ? '#ccc' : '#000000'
                            }`,
                          width: '240px',
                          height: '38px',
                          borderRadius: '4px',
                        }}
                        styleTextButton={{
                          fontWeight: 500,
                          color: products?.total === products?.data?.length && '#fff',
                        }}
                        onClick={() => setLimit((prev) => prev + 4)}
                      />
                    </ParentContainer>

                  )}
              </div>
            </div>
          </div>;

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            padding: '20px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
            marginTop: "40px",
            marginBottom: "20px"
          }}>
            <div id="nam-gioi-section" style={{ width: '100%', height: "70px", margin: '0 auto', backgroundColor: '#ffff' }}>
              <WrapperTypeFeaturedSec>THỜI TRANG CHO NAM</WrapperTypeFeaturedSec>
            </div>
            <Loading isLoading={menLoad}>
              <CarouselComponent products={productsMen} />
            </Loading>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            padding: '20px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
            marginBottom: "20px"
          }}>
            <div id="nu-gioi-section" style={{ width: '100%', height: "70px", margin: '0 auto', backgroundColor: '#ffff' }}>
              <WrapperTypeFeaturedSec>THỜI TRANG CHO NỮ </WrapperTypeFeaturedSec>
            </div>
            <Loading isLoading={womenLoad}>
              <CarouselComponent products={productsWomen} />
            </Loading>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            padding: '20px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
            marginBottom: "20px"
          }}>
            <div id="be-section" style={{ width: '100%', height: "70px", margin: '0 auto', backgroundColor: '#ffff' }}>
              <WrapperTypeFeaturedSec>THỜI TRANG CHO BÉ</WrapperTypeFeaturedSec>
            </div>
            <Loading isLoading={kidLoad}>
              <CarouselComponent products={productsKids} />
            </Loading>
            <SliderArticlesComponent />
          </div>


        </div>
      </Loading>

    </>

  )
}

export default HomePage