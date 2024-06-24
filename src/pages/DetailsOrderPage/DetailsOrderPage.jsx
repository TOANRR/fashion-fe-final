import React from 'react'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperLabelCode, WrapperNameProduct, WrapperProduct, WrapperStyleContent, WrapperWatermark } from './style'
import logo from '../../assets/images/logo.png'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant'
import { convertPrice, formatDate } from '../../utils'
import { useMemo } from 'react'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import { Breadcrumb, Watermark } from 'antd'
import { ProductLink } from '../OrderPage/style'

const DetailsOrderPage = () => {
    const params = useParams()
    const location = useLocation()
    const { state } = location
    const { id } = params

    const fetchDetailsOrder = async () => {
        const res = await OrderService.getDetailsOrder(id, state?.token)
        return res.data
    }

    const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder })
    const { isLoading, data } = queryOrder

    const priceMemo = useMemo(() => {
        const result = data?.orderItems?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [data])

    return (
        <Loading isLoading={isLoading}>
            <div style={{ width: '100%', minHeight: '100vh', background: '#F9F9FC', marginBottom: "50px", display: 'flex', justifyContent: 'center' }}>

                <div style={{ width: '95%', maxWidth: '1270px', margin: '0 auto' }}>
                    <Breadcrumb
                        items={[
                            {
                                title: <a href="/">Trang chủ</a>,
                            },
                            {
                                title: <a href="/my-order">Đơn hàng của tôi</a>,
                            },
                            {
                                title: <a href="">Chi tiết đơn hàng</a>,
                            }
                        ]}
                        style={{ fontSize: "18px", marginTop: "1%", marginBottom: "2%", fontWeight: "500" }}
                    />
                    {/* <h3 style={{ fontStyle: "italic" }}>Chi tiết đơn hàng</h3> */}
                    <Watermark content={`${data?.isCancel ? 'Đã Hủy' : ''}`}>
                        <WrapperLabelCode>Mã đơn hàng: {data?._id}</WrapperLabelCode>

                        <WrapperHeaderUser>
                            <WrapperInfoUser>
                                <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
                                <WrapperContentInfo>
                                    <div className='name-info'>{data?.shippingAddress?.fullName}</div>
                                    <div className='address-info'><span>Địa chỉ: </span> {`${data?.shippingAddress?.address} ${data?.shippingAddress?.ward} ${data?.shippingAddress?.district} ${data?.shippingAddress?.city}`}</div>
                                    <div className='phone-info'><span>Điện thoại: </span> {data?.shippingAddress?.phone}</div>
                                </WrapperContentInfo>
                            </WrapperInfoUser>
                            <WrapperInfoUser>
                                <WrapperLabel>Hình thức giao hàng</WrapperLabel>
                                <WrapperContentInfo>
                                    <div className='delivery-info'><span className='name-delivery'>FAST </span>Giao hàng tiết kiệm</div>
                                    <div className='delivery-fee'><span>Phí giao hàng: </span> {convertPrice(data?.shippingPrice)}</div>
                                    {(data?.deliveryStatus === 'delivering' || data?.deliveryStatus === 'delivered') && (

                                        <div className='delivery-fee'>{data?.deliveryStatus === 'delivering' ? 'Đang giao: ' : 'Đã giao: '}
                                            {formatDate(data?.deliveredAt)}</div>

                                    )}
                                </WrapperContentInfo>
                            </WrapperInfoUser>
                            <WrapperInfoUser>
                                <WrapperLabel>Hình thức thanh toán</WrapperLabel>
                                <WrapperContentInfo>
                                    <div className='payment-info'>{orderContant.payment[data?.paymentMethod]}</div>
                                    <div className='status-payment'>{data?.isPaid ? `Đã thanh toán, ${formatDate(data?.paidAt)}` : 'Chưa thanh toán'}</div>

                                </WrapperContentInfo>
                            </WrapperInfoUser>
                        </WrapperHeaderUser>
                        <WrapperStyleContent>
                            {/* {data?.isCancel && (
                                <WrapperWatermark>Đã bị hủy</WrapperWatermark>
                            )} */}
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ width: '470px' }}>Sản phẩm</div>
                                <WrapperItemLabel>Kích cỡ</WrapperItemLabel>
                                <WrapperItemLabel>Giá</WrapperItemLabel>
                                <WrapperItemLabel>Số lượng</WrapperItemLabel>
                                <WrapperItemLabel>Giảm</WrapperItemLabel>
                            </div>
                            {data?.orderItems?.map((order) => {
                                return (
                                    <WrapperProduct>
                                        <WrapperNameProduct>
                                            <img
                                                src={order?.image}
                                                style={{
                                                    width: '70px',
                                                    height: '70px',
                                                    objectFit: 'cover',
                                                    border: '1px solid rgb(238, 238, 238)',
                                                    padding: '2px'
                                                }}
                                            />
                                            <ProductLink href={`/product-details/${order?.product}`} target="_blank" rel="noopener noreferrer">
                                                {order?.name}
                                            </ProductLink>
                                        </WrapperNameProduct>
                                        <WrapperItem>{order?.size}</WrapperItem>
                                        <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                                        <WrapperItem>{order?.amount}</WrapperItem>
                                        <WrapperItem>{order?.discount ? convertPrice(order?.price * order?.discount * order?.amount / 100) : '0 VND'}</WrapperItem>


                                    </WrapperProduct>
                                )
                            })}

                            <WrapperAllPrice>
                                <WrapperItemLabel>Tạm tính</WrapperItemLabel>
                                <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
                            </WrapperAllPrice>
                            <WrapperAllPrice>
                                <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
                                <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
                            </WrapperAllPrice>
                            <WrapperAllPrice>
                                <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
                                <WrapperItem><WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem></WrapperItem>
                            </WrapperAllPrice>
                        </WrapperStyleContent>
                        {/* Dòng lý do hủy nếu có */}
                        {data?.isCancel && (
                            <WrapperNameProduct>*Lý do hủy: {data?.cancelReason}</WrapperNameProduct>
                        )}
                    </Watermark>
                </div>
            </div>
        </Loading>
    )
}

export default DetailsOrderPage