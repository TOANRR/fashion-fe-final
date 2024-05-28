import { Breadcrumb, Checkbox, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperTotal, WrapperStyleHeaderDilivery } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'

import { WrapperInputNumber } from '../../components/ProductDetailComponent/style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct, decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, resetOrder, selectedOrder, setAmount } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as  UserService from '../../services/UserService'
import Loading from '../../components/LoadingComponent/LoadingComponent';
import * as message from '../../components/MessageComponent/MessageComponent'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import StepComponent from '../../components/StepComponent/StepComponent';
import * as CardService from '../../services/CardService'
import { Select } from 'antd';
import axios from 'axios';
const { Option } = Select;
const OrderPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)

  const [listChecked, setListChecked] = useState([])
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: ''
  })
  const [form] = Form.useForm();
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  // const [city, setCity] = useState('')
  // const [district, setDistrict] = useState('');
  // const [ward, setWard] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
        setCities(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const updateOrder = async () => {
      if (user?.id && user?.access_token) {

        const res = await CardService.getAllItems(user?.id, user?.access_token)
        dispatch(resetOrder())
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


      }
    }
    updateOrder()

  }, []);
  useEffect(() => {
    if (user?.city && (districts.length === 0)) {
      const selectedC = cities.find((city) => city.Name === user?.city)
      setDistricts(selectedC?.Districts || []);
    }
  }, [user?.city, cities]); // Gọi lại khi user.city hoặc cities thay đổi

  useEffect(() => {
    if (user?.district && (wards.length === 0)) {
      const selectedD = districts.find((district) => district.Name === user?.district)
      setWards(selectedD?.Wards || []);
    }
  }, [user?.district, districts]); // Gọi lại k

  const handleCityChange = (value) => {
    if (value) {
      const selectedCity = cities.find((city) => city.Id === value);
      setDistricts(selectedCity.Districts);
      setStateUserDetails(prevState => ({
        ...prevState,
        city: selectedCity.Name,
        ward: '',
        district: ''
      }));
      setWards([]);

    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const handleDistrictChange = (value) => {
    if (value) {
      const selectedDistrict = districts.find((district) => district.Id === value);
      setWards(selectedDistrict.Wards);
      setStateUserDetails(prevState => ({
        ...prevState,
        ward: '',
        district: selectedDistrict.Name
      }));
    } else {
      setWards([]);
    }
  };
  // const handleWards = (value) => {

  //   const selectedDistrict = districts.find((district) => district.Name === value);
  //   setWards(selectedDistrict.Wards);


  // };
  const handleWardChange = (value) => {
    if (value) {
      const selectedWard = wards.find((ward) => ward.Id === value);
      setStateUserDetails(prevState => ({
        ...prevState,
        ward: selectedWard.Name

      }));
    }
  };
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onChangeSelect = (e) => {
    const elementToCheck = e.target.value
    if (listChecked.some(item => item.id === elementToCheck.id && item.size === elementToCheck.size)) {
      const newListChecked = listChecked.filter(item => !(item.id === elementToCheck.id && item.size === elementToCheck.size))
      setListChecked(newListChecked)
    } else {
      setListChecked([...listChecked, e.target.value])
    }
    // console.log(listChecked)
  };

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

  const handleChangeCount = async (type, idProduct, limited, size) => {
    if (type === 'increase') {
      // console.log(amout, limited)
      if (!limited) {


        const res = await CardService.addToCard({

          product: idProduct,
          quantity: 1,
          user: user?.id,
          size: size
        }, user?.access_token)
        console.log(res)
        if (res.status === "OK") { console.log("+1"); dispatch(setAmount({ idProduct, size, amount: res.data.quantity })) }

        else
          message.error("số lượng không đủ")
      }
      else
        message.error("số lượng không đủ")
    }
    else
      if (type == 'decrease') {
        if (!limited) {

          const res = await CardService.addToCard({

            product: idProduct,
            quantity: -1,
            user: user?.id,
            size: size
          }, user?.access_token)
          console.log(res)
          if (res.status === "OK") { console.log("-1"); dispatch(setAmount({ idProduct, size, amount: res.data.quantity })) }
          else
            message.error("Vui lòng chọn số lượng lớn hơn 0")
        }
        else
          message.error("Vui lòng chọn số lượng lớn hơn 0")
      }
  };

  const handleDeleteOrder = async (idProduct, size) => {

    const res = await CardService.deleteItem({
      product: idProduct,
      user: user?.id,
      size: size
    }, user?.access_token)
    if (res.status === "OK")
      dispatch(removeOrderProduct({ idProduct, size }))
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push({ id: item?.product, size: item?.size })
      })
      setListChecked(newListChecked)
    } else {
      setListChecked([])
    }
  }

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }))
    console.log("change here")
  }, [listChecked])

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    if (isOpenModalUpdateInfo) {

      setStateUserDetails({
        city: user?.city,
        district: user?.district,
        ward: user?.ward,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      })
    }
  }, [isOpenModalUpdateInfo])

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [order])

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0
      return total + (cur.price * (totalDiscount * cur.amount) / 100)
    }, 0)
    if (Number(result)) {
      console.log(result)
      return result
    }
    return 0
  }, [order])

  const diliveryPriceMemo = useMemo(() => {

    if (priceMemo >= 200000 && priceMemo < 500000) {

      return 10000
    } else if (priceMemo >= 500000 || order?.orderItemsSlected?.length === 0) {
      return 0
    } else {
      console.log(priceMemo)
      return 20000

    }
  }, [priceMemo])

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }))
    }
  }

  const handleAddCard = () => {
    if (!order?.orderItemsSlected?.length) {
      message.error('Vui lòng chọn sản phẩm')
    } else if (!user?.phone || !user?.address || !user?.name || !user?.city || !user?.ward || !user?.district) {
      setIsOpenModalUpdateInfo(true)
    }
    else {
      navigate('/payment')
    }
  }

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = UserService.updateUser(
        id,
        { ...rests }, token)
      return res
    },
  )

  const { isPending, data } = mutationUpdate

  const handleCancleUpdate = () => {
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    })
    form.resetFields()
    setIsOpenModalUpdateInfo(false)
  }
  const handleUpdateInforUser = () => {
    const { name, address, city, phone, district, ward } = stateUserDetails
    if (name && address && city && phone && district && ward) {
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
        onSuccess: () => {
          dispatch(updateUser({ name, address, city, phone, district, ward }))
          setIsOpenModalUpdateInfo(false)
        }
      })
    }
  }

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }
  const itemsDelivery = [
    {
      title: '20.000 VND',
      description: 'Dưới 200.000 VND',
    },
    {
      title: '10.000 VND',
      description: 'Từ 200.000 VND đến dưới 500.000 VND',
    },
    {
      title: '0 VND',
      description: 'Trên 500.000 VND',
    },
  ]
  return (
    <div style={{ background: '#F9F9FC', minWith: '1100px', minHeight: '100vh', paddingBottom: "30px" }}>
      <Breadcrumb
        items={[

          {
            title: <a href="#">GIỎ HÀNG</a>,
          }
        ]}
        style={{ marginBottom: "25px", paddingTop: "30px", fontSize: "24px", paddingLeft: "4%", fontWeight: "500" }}
      />
      <div style={{ height: '100%', minWidth: '1100px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <WrapperStyleHeaderDilivery>
              <StepComponent items={itemsDelivery} current={diliveryPriceMemo === 10000
                ? 1 : diliveryPriceMemo === 20000 ? 0
                  : diliveryPriceMemo === 0 && listChecked.length === 0 ? 3 : 2} />
            </WrapperStyleHeaderDilivery>
            <WrapperStyleHeader>
              <span style={{ display: 'inline-block', width: '390px' }}>
                <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Kích cỡ</span>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Giảm</span>
                <span>Thành tiền</span>
                <span> </span>
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order, index) => {
                return (
                  <WrapperItemOrder key={index}>
                    <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Checkbox onChange={onChangeSelect} value={{ id: order?.product, size: order?.size }} checked={listChecked.some(item => item.id === order?.product && item.size === order?.size)}></Checkbox>
                      <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                      <a href={`/product-details/${order?.product}`}
                        target="_blank" // Để mở trong một tab mới
                        rel="noopener noreferrer" // Đảm bảo an toàn khi mở trong tab mới
                        style={{
                          width: 260,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          textDecoration: 'none', // Loại bỏ gạch chân mặc định của thẻ <a>
                          color: 'inherit', // Sử dụng màu chữ mặc định của thẻ <a>
                          display: 'block',

                        }}>{order?.name}</a>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>{order?.size.toUpperCase()}</span>
                      </span>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                      </span>

                      <WrapperCountOrder>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product, order?.amount === 1, order?.size)}>
                          <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                        <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order?.countInstock} />
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product, order?.amount === order?.countInstock, order?.size)}>
                          <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                      </WrapperCountOrder>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>{order?.discount}%</span>
                      </span>
                      <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(order?.price * order?.amount)}</span>
                      <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product, order?.size)} />
                    </div>
                  </WrapperItemOrder>
                )
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: '100%' }}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: 'bold' }}>{`${user?.address}, ${user?.ward}, ${user?.district}, ${user?.city}`} </span>
                  <span onClick={handleChangeAddress} style={{ color: 'blue', cursor: 'pointer' }}>Thay đổi</span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Tạm tính</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Giảm giá</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Phí giao hàng</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                  <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddCard()}
              size={40}
              styleButton={{
                background: '#000000',
                height: '48px',
                width: '330px',
                border: 'none',
                borderRadius: '4px',
                marginLeft: "6px"

              }}
              textbutton={'Mua hàng'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancleUpdate} onOk={handleUpdateInforUser} forceRender={true}>
        <Loading isLoading={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="SĐT"
              name="phone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"

              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Select
                  className="form-select form-select-sm mb-3"
                  placeholder="Chọn tỉnh thành"
                  onChange={handleCityChange}
                  value={stateUserDetails.city ? stateUserDetails.city : undefined}
                  style={{ width: 150, marginBottom: 10 }}

                >
                  {cities.map((city) => (
                    <Option key={city.Id} value={city.Id}>{city.Name}</Option>
                  ))}
                </Select>

                <Select
                  className="form-select form-select-sm mb-3"
                  placeholder=" quận/huyện"
                  onChange={handleDistrictChange}
                  value={stateUserDetails.district ? stateUserDetails.district : undefined}
                  style={{ width: 150, marginBottom: 10 }}

                >
                  {districts.map((district) => (
                    <Option key={district.Id} value={district.Id}>{district.Name}</Option>
                  ))}
                </Select>

                <Select
                  className="form-select form-select-sm"
                  placeholder="phường/xã"
                  onChange={handleWardChange}
                  value={stateUserDetails.ward ? stateUserDetails.ward : undefined}
                  style={{ width: 150 }}


                >
                  {wards.map((ward) => (
                    <Option key={ward.Id} value={ward.Id}>{ward.Name}</Option>
                  ))}
                </Select>
              </div>
            </Form.Item>
            <Form.Item
              label="Số nhà"
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
              <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="address" />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default OrderPage