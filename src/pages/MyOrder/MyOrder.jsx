import React, { useEffect, useState } from 'react'
import Loading from '../../components/LoadingComponent/LoadingComponent';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService'
import { useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/MessageComponent/MessageComponent'
import { Breadcrumb } from 'antd';

const MyOrderPage = () => {
    const location = useLocation()
    const { state } = location
    console.log(location)
    const user = useSelector((state) => state.user)

    const navigate = useNavigate()
    const fetchMyOrder = async () => {
        // console.log(state.id, state.token)
        const res = await OrderService.getOrderByUserId(state?.id, state?.token)
        return res.data
    }

    const queryOrder = useQuery({ queryKey: ['myorders'], queryFn: fetchMyOrder })
    const { isLoading, data } = queryOrder

    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`, {
            state: {
                token: state?.token
            }
        })
    }

    const mutation = useMutationHooks(
        (data) => {
            const { id, token, orderItems, userId } = data
            const res = OrderService.cancelOrder(id, token, orderItems, userId)
            return res
        }
    )

    const handleCanceOrder = (order) => {
        mutation.mutate({ id: order._id, token: state.token, orderItems: order?.orderItems, userId: user.id }, {
            onSuccess: () => {
                queryOrder.refetch()
            }
        })
    }
    const { isPending: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation

    useEffect(() => {
        if (isSuccessCancel && dataCancel?.status === 'OK') {
            message.success()
        } else if (isErrorCancle) {
            message.error()
        }
    }, [isErrorCancle, isSuccessCancel])

    const renderProduct = (data) => {
        return data?.map((order, index) => {
            return <WrapperHeaderItem key={index}>
                <img src={order?.image}
                    style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        border: '1px solid rgb(238, 238, 238)',
                        padding: '2px'
                    }}
                />
                <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginLeft: '10px'
                }}>{order?.name}</div>
                <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
        })
    }

    return (
        <Loading isLoading={isLoading || isLoadingCancel}>

            <WrapperContainer>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <Breadcrumb
                        items={[
                            {
                                title: <a href="/">Trang chủ</a>,
                            },
                            {
                                title: <a href="">Đơn hàng của tôi</a>,
                            }
                        ]}
                        style={{ fontSize: "20px" }}
                    />
                    <WrapperListOrder>
                        {data?.map((order, index) => {
                            return (
                                <WrapperItemOrder key={index}>
                                    <WrapperStatus>
                                        {
                                            (!order?.isCancel) ? (<div>
                                                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái</span>
                                                <div><span style={{ color: 'rgb(255, 66, 78)', paddingTop: "20px" }}>Giao hàng: </span>{`${order.isDelivered ? ' Đã giao hàng' : ' Chưa giao hàng'}`}</div>
                                                <div><span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán:</span>{`${order.isPaid ? ' Đã thanh toán' : ' Chưa thanh toán'}`}</div>

                                            </div>) : (<div><span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái</span>
                                                <div><span style={{ color: "red", fontWeight: "600" }}>Đã bị hủy</span></div></div>)
                                        }

                                    </WrapperStatus>

                                    {renderProduct(order?.orderItems)}
                                    <WrapperFooterItem>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                                            <span
                                                style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}
                                            >{convertPrice(order?.totalPrice)}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            {
                                                (!order?.isCancel) ? (<ButtonComponent
                                                    onClick={() => handleCanceOrder(order)}
                                                    size={40}
                                                    styleButton={{
                                                        height: '36px',
                                                        border: '1px solid rgb(11, 116, 229)',
                                                        borderRadius: '4px'
                                                    }}
                                                    textbutton={'Hủy đơn hàng'}
                                                    styleTextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                                                >
                                                </ButtonComponent>) : (<div></div>)
                                            }
                                            <ButtonComponent
                                                onClick={() => handleDetailsOrder(order?._id)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid rgb(11, 116, 229)',
                                                    borderRadius: '4px'
                                                }}
                                                textbutton={'Xem chi tiết'}
                                                styleTextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                                            >
                                            </ButtonComponent>
                                        </div>
                                    </WrapperFooterItem>
                                </WrapperItemOrder>
                            )
                        })}
                    </WrapperListOrder>
                </div>
            </WrapperContainer>
        </Loading >
    )
}

export default MyOrderPage