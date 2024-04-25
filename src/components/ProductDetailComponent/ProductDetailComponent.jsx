import { Col, Image, Rate, Row } from 'antd'
import React from 'react'
import imageProductSmall from '../../assets/images/imagesmall.webp'
import { WrapperStyleImageSmall, WrapperStyleColImage, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct, WrapperAddressProduct, WrapperQualityProduct, WrapperInputNumber, WrapperBtnQualityProduct, WrapperStyleImage } from './style'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/LoadingComponent'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct, resetOrder } from '../../redux/slides/orderSlide'
import { convertPrice } from '../../utils'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as CardService from '../../services/CardService'
import { Radio, message } from 'antd';

const ProductDetailsComponent = ({ idProduct }) => {
    // console.log("id?", idProduct)
    const [numProduct, setNumProduct] = useState(1)
    const [sizeSelected, setSizeSelected] = useState(
        {
            size: '',
            quantity: ''
        }
    )
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);

    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    // const [productDetails, setProductDetails] = useState('')
    const onChange = (value) => {
        setNumProduct(Number(value))
    }
    const fetchGetDetailsProduct = async (id) => {
        if (id) {
            const res = await ProductService.getDetailsProduct(id)
            let op1 = []
            res.data?.sizes.forEach(function (temp) {
                let opt = { label: temp.size?.toUpperCase(), value: temp.size }
                op1.push(opt)

            });
            setOptions(op1)
            return res.data
        }
    }

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            // if (numProduct < productDetails?.countInStock)
            setNumProduct(numProduct + 1)
        } else {
            if (numProduct > 1)
                setNumProduct(numProduct - 1)
        }
    }

    const sumArray = (mang) => {
        let sum = 0;
        mang?.forEach(function (value) {
            sum += value.countInStock;
        });
        console.log(sum)
        return sum;
    }
    const queryCheck = useQuery({ queryKey: ['product-details', idProduct], queryFn: () => fetchGetDetailsProduct(idProduct) })
    //console.log("query", queryCheck)
    const { isLoading, data: productDetails } = queryCheck;
    const handleAddOrderProduct = async () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {

            if (sizeSelected.size === '') {
                message.error('Vui lòng chọn size');
            }
            else {
                const res = await CardService.addToCard({

                    product: productDetails?._id,
                    quantity: numProduct,
                    user: user?.id,
                    size: sizeSelected.size
                }, user?.access_token)
                if (res.status === "OK") {
                    const result = await CardService.getAllItems(user?.id, user?.access_token)
                    dispatch(resetOrder())

                    result.data.forEach((data, index) => {
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
                }
                else {
                    message.error(res.message)
                }


            }
        }

    }
    const onChange3 = ({ target: { value } }) => {


        productDetails?.sizes.forEach(function (temp) {
            if (temp.size === value) setSizeSelected({ size: value, quantity: temp.countInStock })
        });


        setValue(value);
    };

    return (
        <Loading isLoading={isLoading}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={11} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <WrapperStyleImage src={productDetails?.images[0]} alt="image product" />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <WrapperStyleColImage span={6} sty="true">
                            <WrapperStyleImageSmall src={productDetails?.images[0]} alt="image small" />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={6}>
                            <WrapperStyleImageSmall src={productDetails?.images[1]} alt="image small" />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={6}>
                            <WrapperStyleImageSmall src={productDetails?.images[1]} alt="image small" />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={6}>
                            <WrapperStyleImageSmall src={productDetails?.images[0]} alt="image small" />
                        </WrapperStyleColImage>



                    </Row>
                </Col>
                <Col span={13} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                        <WrapperStyleTextSell> | Số lượng còn: {sizeSelected.size ? sizeSelected.quantity : sumArray(productDetails?.sizes)}</WrapperStyleTextSell>
                    </div>
                    <div>
                        <WrapperStyleTextSell style={{ marginRight: "50px" }}>Size </WrapperStyleTextSell>
                        <Radio.Group options={options} onChange={onChange3} value={value} optionType="button" />
                    </div>

                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{convertPrice(productDetails?.price * 1000)}</WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Giao đến </span>
                        <span className='address'>{user?.address}</span> -
                        <span className='change-address'>Đổi địa chỉ</span>
                    </WrapperAddressProduct>
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', display: 'flex' }}>
                        <div style={{ marginBottom: '10px', marginRight: "30px" }}>Số lượng</div>
                        <WrapperQualityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease')}>
                                <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                            </button>
                            <WrapperInputNumber onChange={onChange} defaultValue={1} value={numProduct} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase')}>
                                <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <div style={{ display: 'flex', aliggItems: 'center', gap: '12px' }}>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: '#000000',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            textbutton={'CHỌN MUA'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '400' }}
                            onClick={handleAddOrderProduct}
                        ></ButtonComponent>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '48px',
                                width: '220px',
                                border: '1px solid #000000',
                                borderRadius: '4px'
                            }}
                            textbutton={'MUA TRẢ SAU'}
                            styleTextButton={{ color: '#000000', fontSize: '15px' }}
                        ></ButtonComponent>
                    </div>
                </Col>
            </Row >
        </Loading>
    )
}

export default ProductDetailsComponent