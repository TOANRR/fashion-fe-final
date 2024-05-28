import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import * as OrderServices from '../../services/OrderService'
import { useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import RevenueChart from '../RevenueChartComponent/RevenueChartComponent';
import UserCountChart from '../UserChartComponent/UserChartComponent';
import TopSellingProductsTable from '../TopSelledComponent/TopSelledComponent';
import CancellationRatioPieChart from '../CancellationRatioPieChartComponent/CancellationRatioPieChartComponent';

const RectangleWrapper = styled.div`
    width: 200px;
    height: 120px;
    text-align: center;
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
    transition: box-shadow 0.3s;

    &:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.7);
        cursor: pointer;
    }
`;

const Title = styled.h3`
    color: white;
`;

const Value = styled.h1`
    color: white;
`;

const LargeTitle = styled.h1`
    color: white;
    font-size: 20px; /* Kích thước chữ lớn hơn */
`;
const SmallValue = styled.h3`
    color: white;
    font-size: 18px; /* Kích thước chữ nhỏ hơn */
`;
const handleRectangleClick = (key) => {
    window.location.search = `select=${key}`;
};
const AdminDashboard = () => {

    const [totalRevenue, setTotalRevenue] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);
    const [totalProducts, setTotalProducts] = useState(null);
    const [totalOrders, setTotalOrders] = useState(null);
    const user = useSelector((state) => state?.user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await OrderServices.getTotalRevenueAndOrders(user?.access_token);

                setTotalRevenue(response.totalRevenue);
                setTotalUsers(response.totalusers);
                setTotalProducts(response.totalProducts);
                setTotalOrders(response.totalOrders);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Row gutter={[20, 20]}>
                <Col span={6}>
                    <RectangleWrapper style={{ backgroundColor: "#1E90FF" }}>
                        <LargeTitle>Tổng doanh thu</LargeTitle>
                        <SmallValue>{convertPrice(totalRevenue)}</SmallValue>
                    </RectangleWrapper>
                </Col>
                <Col span={6}>
                    <RectangleWrapper onClick={() => handleRectangleClick("user")} style={{ backgroundColor: "#32CD32" }}>
                        <LargeTitle>Số người dùng</LargeTitle>
                        <SmallValue>{totalUsers}</SmallValue>
                    </RectangleWrapper>
                </Col>
                <Col span={6}>
                    <RectangleWrapper onClick={() => handleRectangleClick("product")} style={{ backgroundColor: "#FFD700" }}>
                        <LargeTitle>Số sản phẩm</LargeTitle>
                        <SmallValue>{totalProducts}</SmallValue>
                    </RectangleWrapper>
                </Col>
                <Col span={6}>
                    <RectangleWrapper onClick={() => handleRectangleClick("order")} style={{ backgroundColor: "#ff7875" }}>
                        <LargeTitle>Số đơn hàng</LargeTitle>
                        <SmallValue>{totalOrders}</SmallValue>
                    </RectangleWrapper>
                </Col>
            </Row>
            <Row justify="center" align="middle">
                <Col span={20}>
                    <TopSellingProductsTable />
                </Col>
                <Col span={20} style={{ marginTop: "50px" }}>
                    <RevenueChart />
                </Col>
                <Col span={20} style={{ marginTop: "50px" }}>
                    <UserCountChart />
                </Col>
                <Col span={20}>
                    <CancellationRatioPieChart />
                </Col>
            </Row>
        </div>
    );
}

export default AdminDashboard
