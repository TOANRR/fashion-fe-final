import { Breadcrumb, Button, Col, Form, Image, List, Menu, Modal, Pagination, Rate, Row } from 'antd'
import React, { useEffect } from 'react'
import imageProductSmall from '../../assets/images/imagesmall.webp'
import { WrapperStyleImageSmall, WrapperStyleColImage, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct, WrapperAddressProduct, WrapperQualityProduct, WrapperInputNumber, WrapperBtnQualityProduct, WrapperStyleImage, WrapperStyleCount, WrapperStyleSize, StyledPriceWrapper, PriceContainer, Price, DiscountPrice, Currency } from './style'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/LoadingComponent'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct, resetOrder } from '../../redux/slides/orderSlide'
import { convertPrice, initFacebookSDK } from '../../utils'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as CardService from '../../services/CardService'
import { Radio, message } from 'antd';
import TextArea from 'antd/es/input/TextArea'
import './ProductReviewForm.css'; // Import CSS file for styling
import RatingStatsTableComponent from '../RatingTableComponent/RatingTableComponent'
import { UserOutlined } from '@ant-design/icons';
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent'
import CommentComponent from '../CommentComponent/CommentComponent'
import ImageZoomPopup from '../ImageZoomComponent/ImageZoomComponent'


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
    const [selectImage, setSelectImage] = useState('')

    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [comments, setComments] = useState([]); // Mảng chứa các bình luận
    //phan trang 
    const PageSize = 1; // Số mục trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * PageSize;
    const endIndex = startIndex + PageSize;
    const currentData = comments.slice(startIndex, endIndex);
    //review

    const [ratingStats, setRatingStats] = useState({
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
    })
    useEffect(() => {
        initFacebookSDK()
    }, []);
    const handleReview = async () => {
        const res = await ProductService.getReview(idProduct)
        setComments(res.reviews)
        setRatingStats(res.ratingStats)



    }
    const columns = [
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            width: '50%'
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '50%'
        },
    ];

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái cho biết modal có hiển thị hay không
    const [submitting, setSubmitting] = useState(false);

    const rowClassName = () => 'custom-table-row';
    const toggleModal = async () => {
        const res = await ProductService.getCheckReview({ userId: user?.id, productId: idProduct })
        if (res.status === "ERR")
            message.error(res.message)
        else
            setIsModalVisible(!isModalVisible);

    };

    const onFinish = async (values) => {
        setSubmitting(true);
        console.log('Received values of form:', values);
        // Gửi dữ liệu đánh giá và nhận xét lên server

        // Thêm bình luận mới vào mảng bình luận
        const res = await ProductService.createReview({
            user: user?.id,
            product: idProduct,
            rating: values.rating,
            content: values.comment
        }, user?.access_token)


        // Reset form
        form.resetFields();
        setSubmitting(false);
        // setComments(res.message)
        if (res.success === true)
            message.success(res.message)
        toggleModal(); // Đóng modal sau khi gửi thành công
        window.location.reload()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    ///

    const [activeMenu, setActiveMenu] = useState('description'); // Mặc định là mô tả sản phẩm

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };




    const onChange = (value) => {
        setNumProduct(Number(value))
    }
    const fetchGetDetailsProduct = async (id) => {
        if (id) {
            const res = await ProductService.getDetailsProduct(id)
            console.log(res.data)
            let op1 = []
            res.data?.product.sizes.forEach(function (temp) {
                let opt = { label: temp.size?.toUpperCase(), value: temp.size }
                op1.push(opt)

            });
            setSelectImage(res.data.product.images[0]);
            setOptions(op1)
            console.log(op1)
            return res.data
        }
    }
    const handleSelect = (id) => {
        setSelectImage(productDetails?.product.images[id]);
    }

    const handleChangeCount = (type) => {
        if (type === 'increase') {
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
    console.log("query", queryCheck)
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

                    product: productDetails?.product._id,
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
                    message.success("thêm vào giỏ hàng thành công")
                }
                else {
                    message.error(res.message)
                }


            }
        }

    }
    const onChange3 = ({ target: { value } }) => {


        productDetails?.product.sizes.forEach(function (temp) {
            if (temp.size === value) setSizeSelected({ size: value, quantity: temp.countInStock })
        });


        setValue(value);
    };

    return (
        <Loading isLoading={isLoading}>
            <Breadcrumb
                items={[
                    {
                        title: <a href="/">Trang chủ</a>,
                    },
                    {
                        title: (
                            <a href={`/type/${productDetails?.product.type}`}>
                                {productDetails?.product.type === 'women'
                                    ? 'Thời trang cho nữ'
                                    : productDetails?.product.type === 'men'
                                        ? 'Thời trang cho nam'
                                        : productDetails?.product.type === 'kids'
                                            ? 'Thời trang cho bé'
                                            : productDetails?.product.type?.toUpperCase()}
                            </a>
                        ),
                    },
                    {
                        title: <a href={`/category/${encodeURIComponent(productDetails?.product.category)}?type=${productDetails?.product.type}`}>{productDetails?.product.category}</a>,
                    },
                ]}
                style={{ fontSize: "18px", fontWeight: "500", marginTop: "35px" }}
            />
            <Row style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.7)', padding: '16px', background: '#fff', borderRadius: '4px', marginTop: "30px" }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <ImageZoomPopup src={selectImage} alt="Sample Image" />
                    {/* <WrapperStyleImage src={selectImage} alt="image product" /> */}
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <WrapperStyleColImage span={5} sty="true">
                            <WrapperStyleImageSmall src={productDetails?.product.images[0]} onClick={() => handleSelect(0)} alt="image small" />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={5}>
                            <WrapperStyleImageSmall src={productDetails?.product.images[1]} onClick={() => handleSelect(1)} alt="image small" />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={5}>
                            <WrapperStyleImageSmall src={productDetails?.product.images[2]} onClick={() => handleSelect(2)} alt="image small" />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={5}>
                            <WrapperStyleImageSmall src={productDetails?.product.images[3]} onClick={() => handleSelect(3)} alt="image small" />
                        </WrapperStyleColImage>



                    </Row>
                </Col>
                <Col span={13} style={{ paddingLeft: '60px' }}>
                    <WrapperStyleNameProduct>{productDetails?.product.name}</WrapperStyleNameProduct>
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Rate disabled allowHalf defaultValue={productDetails?.averageRating} value={productDetails?.averageRating} />
                        <WrapperStyleTextSell> | Số lượng còn: {sizeSelected.size ? sizeSelected.quantity : sumArray(productDetails?.product.sizes)}</WrapperStyleTextSell>
                    </div>
                    <div yle={{ marginTop: "30px" }}>
                        <WrapperStyleCount style={{ marginTop: "100px" }}> Đã bán:     {productDetails?.product.selled} sản phẩm</WrapperStyleCount>
                    </div>
                    <div style={{ marginTop: "30px" }}>
                        <WrapperStyleSize style={{ marginRight: "50px" }}>Kích cỡ: </WrapperStyleSize>
                        <Radio.Group options={options} onChange={onChange3} value={value} optionType="button"
                            buttonStyle="solid" />
                    </div>


                    <StyledPriceWrapper>
                        <PriceContainer>
                            {productDetails?.product.discount ? (
                                <div>
                                    <div style={{ color: '#ff6666', fontStyle: 'italic', fontWeight: "600" }}>
                                        Đang giảm: {productDetails?.product.discount} %
                                    </div>
                                    <Price>{productDetails?.product.price.toLocaleString()}</Price>
                                    <DiscountPrice>{convertPrice(productDetails?.product.price - productDetails?.product.price * productDetails?.product.discount / 100)}</DiscountPrice>
                                </div>

                            ) : (<div> <DiscountPrice>{convertPrice(productDetails?.product.price)}</DiscountPrice></div>)}


                        </PriceContainer>
                    </StyledPriceWrapper>


                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', display: 'flex' }}>
                        <div style={{ marginBottom: '10px', marginRight: "30px", color: "rgb(120, 120, 120)", fontWeight: "500", fontSize: "16px" }}>Số lượng</div>
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

                    <LikeButtonComponent dataHref={`https://fe-deploy-yj5a-git-main-toanrrs-projects.vercel.app/${idProduct}`} />

                    <div style={{ display: 'flex', aliggItems: 'center', gap: '12px', marginTop: "50px" }}>
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
                            textbutton={'ĐÁNH GIÁ'}
                            styleTextButton={{ color: '#000000', fontSize: '15px' }}
                            onClick={toggleModal}
                        ></ButtonComponent>

                    </div>
                    {/* <div>
                        <WrapperStyleNameProduct>Mô tả</WrapperStyleNameProduct>
                        <div dangerouslySetInnerHTML={{ __html: productDetails?.description }} />
                    </div> */}
                </Col>
            </Row >
            <Row style={{ background: "#ffffff", marginTop: "30px", background: "#f9f9f9", borderRadius: "4px", padding: "20px", paddingBottom: "30px", minHeight: "100px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                <Col span={24}>
                    <Menu mode="horizontal" selectedKeys={[activeMenu]} onClick={({ key }) => handleMenuClick(key)} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Menu.Item key="description"><div style={{ fontSize: '18px', color: '#555555', fontWeight: '500' }}>Mô tả sản phẩm</div></Menu.Item>
                        <Menu.Item key="review" onClick={handleReview}><div style={{ fontSize: '18px', color: '#555555', fontWeight: '500' }}>Thống kê</div></Menu.Item>
                        <Menu.Item key="reviewComment" onClick={handleReview}><div style={{ fontSize: '18px', color: '#555555', fontWeight: '500' }}>Đánh giá</div></Menu.Item>
                    </Menu>
                    {activeMenu === 'description' && (
                        <div style={{ background: "#fff", paddingBottom: "50px", marginTop: "20px" }}>

                            <div style={{ color: '#555555', paddingTop: "10px", paddingLeft: "30px" }} dangerouslySetInnerHTML={{ __html: productDetails?.product.description }} />
                        </div>
                    )}
                    {activeMenu === 'review' && (
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                            <div style={{ width: "50%", background: "#fff", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", marginTop: "10px" }}>
                                <RatingStatsTableComponent ratingStats={ratingStats} />

                            </div>

                        </div>
                    )}
                    {activeMenu === 'reviewComment' && (
                        <div style={{ width: "80%", margin: "0 auto" }}>
                            <List
                                dataSource={comments}
                                pagination={{
                                    current: currentPage,
                                    total: comments.length,
                                    pageSize: 5,
                                    onChange: onPageChange
                                }}
                                renderItem={(item) => (
                                    <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginTop: "20px", background: "#fff", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                                        <div style={{ display: 'block', marginTop: '8px', fontWeight: 'bold', display: "flex", paddingLeft: "20px", paddingTop: "20px" }}>
                                            <div  >
                                                {
                                                    item.user.avatar ? <img src={item.user.avatar} height="30" width="30" style={{ borderRadius: "50px", marginRight: "5px" }} alt="anh dai dien" /> : <UserOutlined style={{ fontSize: '30px', marginRight: "5px" }} />
                                                }
                                            </div>
                                            {item.user.name ? item.user.name : item.user.email}
                                        </div>
                                        <List.Item>
                                            <List.Item.Meta
                                                title={<Rate disabled defaultValue={item.rating} />}
                                                description={
                                                    <div>
                                                        <div style={{ fontWeight: "600", fontSize: "16px" }}>{item.content}</div>
                                                        <div style={{ fontWeight: "400", color: "#888888", textAlign: "right", paddingRight: "30px" }}>
                                                            {` ${new Date(item.updatedAt).toLocaleString()}`}
                                                        </div>
                                                    </div>
                                                }
                                                style={{ paddingLeft: "50px" }}

                                            />
                                        </List.Item>
                                    </div>
                                )}
                            />

                        </div>
                    )}
                </Col>
            </Row>
            <div style={{ width: "50%", marginTop: "30px" }}>
                <CommentComponent dataHref={`https://fe-deploy-yj5a-git-main-toanrrs-projects.vercel.app/${idProduct}`} />
            </div>

            <Modal
                title="Đánh giá Sản phẩm"
                open={isModalVisible}
                onCancel={toggleModal}
                footer={null}
            >
                <Form
                    form={form}
                    name="product_review"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item name="rating" label="Đánh giá" rules={[{ required: true }]}>
                        <Rate />
                    </Form.Item>

                    <Form.Item name="comment" label="Nhận xét của bạn" rules={[{ required: true }]}>
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={submitting}>
                            Gửi Nhận xét
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>



        </Loading>
    )
}

export default ProductDetailsComponent