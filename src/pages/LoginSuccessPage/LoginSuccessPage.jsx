import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'
import * as CardService from '../../services/CardService'
import { addOrderProduct } from '../../redux/slides/orderSlide'
import { useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');
        const userId = urlParams.get('id');

        // Lưu tokens vào Local Storage
        console.log(userId)
        localStorage.setItem('access_token', JSON.stringify(accessToken))
        localStorage.setItem('refresh_token', JSON.stringify(refreshToken))
        if (userId) {
            const fetchData = async () => {
                return await CardService.getAllItems(userId, accessToken)

            };
            const result = fetchData()
                .catch(console.error);

            result.then(function (res) {
                console.log(res) // "Some User token"
                res.data.forEach((data, index) => {
                    let orderItem = {
                        name: data?.product.name,
                        amount: data?.quantity,
                        image: data?.product.images[0],
                        price: data?.product.price,
                        product: data?.product._id,
                        discount: data?.product.discount,
                        countInstock: data?.countInStock,
                        size: data?.size
                    }
                    console.log(orderItem)
                    dispatch(addOrderProduct({
                        orderItem

                    }))
                });
            })
        }
        // Redirect đến trang chủ
        navigate('/');
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spin size="large" /> redicting {/* Thêm biểu tượng loading từ Ant Design và thiết lập kích thước lớn */}
        </div>
    );
};

export default LoginSuccess;
