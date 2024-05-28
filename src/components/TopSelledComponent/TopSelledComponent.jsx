import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { convertPrice } from '../../utils';
import { useSelector } from 'react-redux';

const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, index) => index + 1,
        width: 40
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        key: 'name',
        width: 250
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'images',
        key: 'images',
        render: images => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={images[0]} alt="Product" style={{ width: '50px', height: 'auto', borderRadius: '50%' }} />
            </div>
        ),
        width: 150
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        width: 150,
        render: (text) => <span>{convertPrice(text)}</span>
    },
    {
        title: 'Đã bán',
        dataIndex: 'selled',
        key: 'selled',
        width: 130
    },
];

const TopSellingProductsTable = () => {
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const user = useSelector((state) => state?.user)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/product/top-selling-products`, {
            method: 'GET',
            headers: {
                token: `Bearer ${user?.access_token}`,
                // Thêm các header khác tại đây nếu cần
            }
        })
            .then(response => response.json())
            .then(data => {
                const formattedData = data.data.map((product, index) => ({
                    ...product,
                    index: index + 1,
                }));
                setTopSellingProducts(formattedData);
            })
            .catch(error => console.error('Error fetching top selling products:', error));
    }, []);

    return (
        <div >
            <h2 style={{ marginBottom: "20px" }}>Top 5 sản phẩm bán chạy</h2>
            <Table columns={columns} dataSource={topSellingProducts} size="small" pagination={false} />
        </div>
    );
};

export default TopSellingProductsTable;
