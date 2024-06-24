import React from 'react'
import { Lable, WrapperInfo, WrapperContainer, WrapperValue, WrapperCountOrder, WrapperItemOrder, WrapperItemOrderInfo, ImageWrapper, ProductLink, InfoWrapper, SpanStyled } from './style';
import Loading from '../../components/LoadingComponent/LoadingComponent';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import { Breadcrumb } from 'antd';


const OrderSucess = () => {
    const location = useLocation()
    const { state } = location
    return (
        <div style={{ background: '#F9F9FC', with: '100%', minHeight: '100vh' }}>
            <Breadcrumb
                items={[
                    {
                        title: <a href="/">Trang chủ</a>,
                    },
                    {
                        title: <a href="/order">Giỏ hàng</a>,
                    },
                    {
                        title: <a href="#">Đơn đặt hàng thành công</a>,
                    }
                ]}
                style={{ marginBottom: "25px", paddingTop: "30px", fontSize: "18px", paddingLeft: "5%", fontWeight: "500" }}
            />
            <Loading isLoading={false}>
                <div style={{ height: '100%', width: '90%', margin: '0 auto' }}>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperContainer>
                            <WrapperInfo>
                                <div>
                                    <Lable>Phương thức giao hàng</Lable>
                                    <WrapperValue>
                                        <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Lable>Phương thức thanh toán</Lable>

                                    <WrapperValue>
                                        {orderContant.payment[state?.payment]}
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperItemOrderInfo>
                                {state.orders?.map((order) => (
                                    <WrapperItemOrder key={order.id}>
                                        <ImageWrapper>
                                            <img
                                                src={order.image}
                                                style={{ width: '77px', height: 'auto', objectFit: 'cover' }}
                                            />
                                            <ProductLink href={`/product-details/${order.product}`} target="_blank" rel="noopener noreferrer">
                                                {order?.name}
                                            </ProductLink>
                                        </ImageWrapper>
                                        <InfoWrapper>
                                            <SpanStyled>Kích cỡ: {order?.size}</SpanStyled>
                                            <SpanStyled>Giảm giá: {order?.discount}%</SpanStyled>
                                            <SpanStyled>Giá tiền: {convertPrice(order?.price)}</SpanStyled>
                                            <SpanStyled>Số lượng: {order?.amount}</SpanStyled>

                                        </InfoWrapper>
                                    </WrapperItemOrder>
                                ))}
                            </WrapperItemOrderInfo>
                            <div style={{ textAlign: 'right', marginTop: "20px" }}>
                                <span style={{ color: '#ea8500', fontWeight: 'bold', fontSize: "20px", textAlign: 'right' }}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
                            </div>
                        </WrapperContainer>
                    </div>
                </div>
            </Loading>
        </div>
    )
}

export default OrderSucess