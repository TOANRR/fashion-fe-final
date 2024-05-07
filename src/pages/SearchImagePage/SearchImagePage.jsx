import React, { useEffect, useState } from 'react';
import { Menu, Button, Select, Slider, Tree, theme } from 'antd';
import axios from 'axios';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import { WrapperNavbar, WrapperProducts } from './style'
import { Col, Pagination, Row } from 'antd'
import './SearchPage2.css'; // Import CSS file
import { limit } from 'firebase/firestore';
import CardComponent from '../../components/CardComponent/CardComponent';
import { storage } from '../../components/FirebaseImage/config';
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from "firebase/storage";

const SearchImagePage = () => {
    const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [searchResult, setSearchResult] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageFind, setImageFind] = useState('');
    const [urlUpload, setUrlUpload] = useState('')
    // const [data, setData] = useState(Array.from({ length: 50 }, (_, i) => i + 1));
    // Số mục trên mỗi trang
    const pageSize = 9;
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
        const res = await ProductService.getAllProduct();
        console.log(res.data)
        // setPanigate({ ...panigate, total: res?.totalPages })
        setSearchResult(res?.data)


    }
    useEffect(() => {

        setLoading(true);

        fetchProductFilter()
        setLoading(false);
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (urlUpload) {
                    setLoading(true);

                    const res = await ProductService.getSearchImage({ query_img: urlUpload });
                    console.log(res);
                    setSearchResult(res.products)
                    setLoading(false);

                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData(); // Call the function to fetch data
    }, [urlUpload]);
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


    const [selectedFile, setSelectedFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFind(file)
            console.log(file)
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);

        }

    };



    const handleUpload = async () => {
        // Kiểm tra xem ảnh có được chọn không
        if (!selectedFile) {
            return;
        }

        const storageRef = ref(storage, `findImage/${imageFind.name}`);
        await uploadBytes(storageRef, imageFind);
        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);
        setUrlUpload(downloadURL)
    };
    return (

        <div className="warrap">
            <div className="leftSidebar">
                <h2 style={{ justifyContent: "center", marginBottom: "20px" }}>Đăng ảnh bạn muốn tìm kiếm ở đây</h2>
                <div >
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            Chọn ảnh
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    {imageSrc && (
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "30px" }}>
                                <img
                                    src={imageSrc}
                                    alt="Uploaded"
                                    style={{ maxWidth: '224px', height: 'auto' }}
                                />

                            </div>
                            <button className="custom-file-search" onClick={handleUpload} style={{ marginTop: "30px" }}>Tìm kiếm</button>
                        </div>

                    )}
                </div>

            </div>

            <div className="rightContent">

                <h2 style={{ marginBottom: "30px" }}> Kết quả tìm kiếm</h2>

                <Loading isLoading={loading} >


                    <WrapperProducts >
                        {getCurrentPageData().map((product) => {
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
                        })}
                    </WrapperProducts>
                    <Pagination
                        current={currentPage}
                        total={searchResult.length}
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

export default SearchImagePage;