import React, { useEffect, useState } from 'react';
import { Menu, Button, Select, Slider, Tree, theme } from 'antd';
import axios from 'axios';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import { WrapperNavbar, WrapperProducts } from './style'
import { Col, Pagination, Row } from 'antd'
// import './SearchPage2.css'; // Import CSS file
import { limit } from 'firebase/firestore';
import CardComponent from '../../components/CardComponent/CardComponent';
import { storage } from '../../components/FirebaseImage/config';
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from "firebase/storage";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useParams } from 'react-router-dom';

const SearchProductPage = () => {
    const [searchResult, setSearchResult] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const searchParams = new URLSearchParams(window.location.search);
    const key = searchParams.get('key');

    // const [data, setData] = useState(Array.from({ length: 50 }, (_, i) => i + 1));
    // Số mục trên mỗi trang
    const pageSize = 8;
    // Trang hiện tại
    const [currentPage, setCurrentPage] = useState(1);

    // Hàm xử lý sự kiện khi thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Lấy dữ liệu cho trang hiện tại
    const getCurrentPageData = () => {

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return searchResult.slice(startIndex, endIndex);


    };


    const fetchProductFilter = async () => {
        const res = await ProductService.getSearchResult(key);
        // console.log(res.data)
        // setPanigate({ ...panigate, total: res?.totalPages })
        console.log(res.data)
        setSearchResult(res.data)


    }
    useEffect(() => {

        setLoading(true);

        fetchProductFilter()
        setLoading(false);
    }, [])

    const sumArray = (mang) => {
        let sum = 0;
        mang.forEach(function (value) {
            sum += value.countInStock;
        });
        return sum;
    }
    // const onChange = (current, pageSize) => {
    //     setPanigate({ ...panigate, page: current })
    // }


    return (
        <div className="warrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingBottom: "50px" }}>

            <div style={{ width: "80%", textAlign: 'center' }}>

                <h2 style={{ marginBottom: "50px" }}>Đã tìm thấy {searchResult.length} kết quả tìm kiếm cho "{key}"</h2>


                <Loading isLoading={loading} >

                    <WrapperProducts>
                        {getCurrentPageData && (
                            getCurrentPageData().map((product) => {
                                return (
                                    <CardComponent
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
                                )
                            }))}
                    </WrapperProducts>
                    <Pagination
                        current={currentPage}
                        total={searchResult?.length}
                        pageSize={9}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        style={{ textAlign: 'center', marginTop: '10px' }}
                    />

                </Loading>

            </div>
        </div>

    );
};

export default SearchProductPage;
