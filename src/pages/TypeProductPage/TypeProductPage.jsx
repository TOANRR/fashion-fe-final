import React, { useEffect, useState } from 'react';
import { Menu, Button, Select, Slider, Tree, theme } from 'antd';
import axios from 'axios';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import { WrapperNavbar, WrapperProducts } from './style'
import { Col, Pagination, Row } from 'antd'
import './SearchPage.css'; // Import CSS file
import { limit } from 'firebase/firestore';
import CardComponent from '../../components/CardComponent/CardComponent';
const { Option } = Select;
const { TreeNode } = Tree;

const SearchPage = () => {
    const { data: typeCategories, isLoading, isError } = useQuery({ queryKey: ['type-categories'], queryFn: ProductService.getAllTypeCategories })
    const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [searchResult, setSearchResult] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [sortBy, setSortBy] = React.useState('');
    const [price, setPrice] = React.useState([0, 4000000]);
    const [panigate, setPanigate] = useState({
        page: 1,
        limit: 9,
        total: 1,
    })
    const [search, SetSearch] = useState(false)


    const fetchProductFilter = async () => {
        const res = await ProductService.getFilterProduct({
            priceRange: price,
            sortBy: sortBy,
            limit: panigate.limit,
            page: panigate.page,
            typeCategory: selectedCategories

        });
        setPanigate({ ...panigate, total: res?.totalPages })
        setSearchResult(res?.products)


    }
    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const res = await ProductService.getFilterProduct();
        //         // Xử lý dữ liệu trả về ở đây
        //     } catch (error) {
        //         console.error('Error fetching filter product:', error);
        //     }
        // };
        setLoading(true);

        fetchProductFilter()
        setLoading(false);
    }, [panigate.page, sortBy])
    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const res = await ProductService.getFilterProduct();
        //         // Xử lý dữ liệu trả về ở đây
        //     } catch (error) {
        //         console.error('Error fetching filter product:', error);
        //     }
        // };

        if (search === true) {

            if (panigate.page === 1) {
                setLoading(true);
                fetchProductFilter()
                setLoading(false);
            }

            else
                setPanigate({ ...panigate, page: 1 })


            SetSearch(false)
        }

    }, [search])
    // const { data: searchResult, isSuccess, isLoading: loadProduct } = useQuery({ queryKey: ['filter_products',], queryFn: fetchProductFilter() })
    const sumArray = (mang) => {
        let sum = 0;
        mang.forEach(function (value) {
            sum += value.countInStock;
        });
        // console.log(sum)
        return sum;
    }
    const onChange = (current, pageSize) => {
        setPanigate({ ...panigate, page: current })
    }
    const handleSearch = async () => {

        try {
            SetSearch(true)
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    const handleCategoryChange = (checkedKeys) => {
        setSelectedCategories(checkedKeys);
    };
    const treeNodeStyle = {
        fontWeight: 'bold', // Đặt font-weight là bold
    };


    return (
        <div className="warrap">
            <div className="leftSidebar">
                <h1>Phân loại</h1>
                <Menu mode="vertical-right" >
                    <Menu.Item>
                        <span>Giá (VNĐ): </span>
                    </Menu.Item>
                    <Menu.Item>

                        <Slider
                            range
                            min={0}
                            max={4000000}
                            defaultValue={[0, 100]}
                            value={price}
                            onChange={(value) => setPrice(value)}
                        />
                    </Menu.Item>

                    <Menu.Item>
                        <Tree
                            checkable
                            defaultExpandedKeys={typeCategories?.map(item => item.type)}
                            onCheck={handleCategoryChange}
                        >
                            {typeCategories?.map((typeCategory) => (
                                <TreeNode title={<span style={treeNodeStyle}>{typeCategory.type.toUpperCase()}</span>} key={typeCategory.type}>
                                    {typeCategory.categories.map((category) => (
                                        <TreeNode
                                            title={<span>{category.toUpperCase()}</span>}
                                            key={`${typeCategory.type}_${category}`}
                                        />
                                    ))}
                                </TreeNode>
                            ))}
                        </Tree>
                    </Menu.Item>
                    <Menu.Item>
                        <Button style={{ background: '#000000', color: "#fff", width: "100%" }} onClick={handleSearch} >Search</Button>
                    </Menu.Item>
                </Menu>
            </div>

            <div className="rightContent">

                <h2>Kết quả tìm kiếm</h2>
                <Select defaultValue="price_low_to_high" style={{ width: 200, marginLeft: 'auto', marginRight: 0, marginTop: "20px" }} onChange={handleSortChange}>
                    <Option value="price_low_to_high">Giá: Thấp đến cao</Option>
                    <Option value="price_high_to_low">Giá: Cao đến thấp</Option>
                    <Option value="name_A_to_Z">Tên: A to Z</Option>
                    <Option value="name_Z_to_A">Tên: Z to A</Option>
                </Select>
                <Loading isLoading={loading} >


                    <WrapperProducts >
                        {searchResult?.map((product) => {
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
                    <Pagination current={panigate.page} total={panigate.total} defaultPageSize={1} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />


                </Loading>

            </div>
        </div>

    );
};

export default SearchPage;