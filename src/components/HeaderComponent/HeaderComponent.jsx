import React from 'react'
import { Badge, Col, Popover } from 'antd'
import { WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall, WrapperContentPopup, SearchLabelImage } from './style'
import { searchProduct } from '../../redux/slides/productSlide';
import { CameraOutlined } from '@ant-design/icons'
// import Search  from 'antd/es/input/Search';
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  SearchOutlined
} from '@ant-design/icons';
import ButttonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import { resetOrder } from '../../redux/slides/orderSlide';
import { useState } from 'react';
import Loading from '../LoadingComponent/LoadingComponent'
import { useEffect } from 'react';
import UploadImageComponent from '../UploadImageComponent/UploadImageComponent';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import axios from 'axios';
import logo from '../../assets/images/logobranch.png'



const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [isImage, setIsImage] = useState(false)
  const [productImgs, setProductImgs] = useState([])
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [fileImg, setFileImg] = useState();
  const [img, setImg] = useState("");


  const searchImageSubmit = async () => {
    try {

      const res = await axios.get(`https://api-python-image-mmsqt5gz7-toanrrs-projects.vercel.app/`, {
        query_img: img
      }

      )
      console.log("res", res)
      if (res?.data?.status === "OK") {
        setProductImgs(res.data.data)
        console.log("productImgs", res.data.data)
        setIsImage(true)
        dispatch(searchProduct({ search: search, isImage: true, productImgs: res.data.data }))
      }



      // const res = await axios.get(`http://127.0.0.1:5001`)

    }
    catch (error) {
      console.error(error);
    }
  };

  const handleChooseImg = (e) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (!file) return;
      if (file.type.indexOf("image/") === -1) {
        alert("dinh dang file khong hop le");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setImg(result);
      };
      reader.readAsDataURL(files[0]);

      setFileImg(file);

      console.log("img", img)
    }
  };

  const handleSearch = () => {
    setIsImage(false)
    setProductImgs([])
    dispatch(searchProduct({ search: search, isImage: isImage, productImgs: productImgs }))
  }
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  const order = useSelector((state) => state.order)
  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    dispatch(resetOrder())
    localStorage.clear("access_token")
    navigate('/')
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (

        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate('my-order')}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  );
  const onChangeInput = (e) => {
    setSearch(e.target.value)
    // dispatch(searchProduct(e.target.value))
  }
  const handleClickNavigate = (type) => {
    if (type === 'profile') {
      navigate('/profile-user')
    } else if (type === 'admin') {
      navigate('/system/admin')
    } else if (type === 'my-order') {
      navigate('/my-order', {
        state: {
          id: user?.id,
          token: user?.access_token
        }
      })
    } else {
      handleLogout()
    }
    setIsOpenPopup(false)
  }


  return (
    <div style={{ height: '60px', width: '100%', display: 'flex', background: '#ffff', justifyContent: 'center' }}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset', width: '100%' }}>
        <Col span={6}>
          {/* // <WrapperTextHeader onClick={() => navigate('/')} style={{ cursor: "pointer", paddingLeft: "25px" }}><img src='/src/assets/images/logo.png'></img></WrapperTextHeader> */}
          <img src={logo} alt="logo" width="120" height="35" onClick={() => navigate('/')} style={{ cursor: "pointer", paddingLeft: "25px" }}></img>
        </Col>
        {!isHiddenSearch && (
          <Col span={12}>
            <div style={{ display: 'flex', }}>
              <InputComponent
                size="large"
                placeholder="Nhập và tìm kiếm"
                bordered="bordered"
                style={{ backgroundColor: "#fff" }}
                display="inline"
                position="absolute"
                z-index="2"
                onChange={onChangeInput}
              />

              {/* <UploadImageComponent /> */}
              <SearchLabelImage htmlFor="image">
                {(img !== "") ? (
                  <img src={img} alt="file" />
                ) : (
                  <CameraOutlined />
                )}

              </SearchLabelImage>
              <input type="file" id="image" hidden onChange={handleChooseImg} />
              {(img !== "") ? (
                <ButtonComponent
                  size="large"
                  styleButton={{ background: '#fff', border: 'none' }}
                  icon={<SearchOutlined color="#fff" style={{ color: '#fff' }} />}
                  textbutton="Tìm kiếm"
                  styleTextButton={{ color: "#000000" }}
                  display="inline"
                  onClick={searchImageSubmit}

                />
              ) : (
                <ButtonComponent
                  size="large"
                  styleButton={{ background: '#ffff', border: 'none' }}
                  icon={<SearchOutlined color="#000000" style={{ color: '#000000' }} />}
                  textbutton="Tìm kiếm"
                  styleTextButton={{ color: "#000000" }}
                  display="inline"
                  onClick={handleSearch}

                />
              )}

            </div>

          </Col>
        )}

        <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Loading isLoading={loading}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                  height: '25px',
                  width: '25px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <UserOutlined style={{ fontSize: '25px' }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div style={{ cursor: 'pointer' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccout>
          </Loading>
          {!isHiddenCart && user?.id && (
            <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined style={{ fontSize: '25px', color: '#000000' }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent