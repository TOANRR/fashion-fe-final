import React from 'react'
import { Badge, Col, Popover } from 'antd'
import { WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall, WrapperContentPopup, SearchLabelImage, UserNameDiv, ResponsiveUserIcon } from './style'
import { searchProduct } from '../../redux/slides/productSlide';
import { CameraOutlined } from '@ant-design/icons'
// import Search  from 'antd/es/input/Search';
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  LogoutOutlined,
  PoweroffOutlined,
  DashboardOutlined,
  SettingOutlined,
  EditOutlined,
  KeyOutlined
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

  const handleSearchImage = async () => [
    navigate('/search-image')
  ]



  const handleSearch = () => {
    // setIsImage(false)
    // setProductImgs([])
    // dispatch(searchProduct({ search: search, isImage: isImage, productImgs: productImgs }))
    if (search) {
      if (window.location.pathname === '/search') {
        navigate(`/search?key=${encodeURIComponent(search)}`);
        window.location.reload();
      }
      else {
        navigate(`/search?key=${encodeURIComponent(search)}`);

      }
    }


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
      {user?.isAdmin && (

        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}> <SettingOutlined style={{ fontSize: '14px', marginRight: "5px" }} />Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}><EditOutlined style={{ fontSize: '14px', marginRight: "5px" }} />Thông tin người dùng</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate('change-password')}><KeyOutlined style={{ fontSize: '14px', marginRight: "5px" }} />Đổi mật khẩu</WrapperContentPopup>


      <WrapperContentPopup onClick={() => handleClickNavigate('my-order')}><ShoppingCartOutlined style={{ fontSize: '14px', marginRight: "5px" }} />Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}> <PoweroffOutlined style={{ fontSize: '14px', marginRight: "5px" }} />Đăng xuất</WrapperContentPopup>
    </div>
  );
  const onChangeInput = (e) => {
    setSearch(e.target.value)
    // dispatch(searchProduct(e.target.value))
  }
  const handleClickNavigate = (type) => {
    if (type === 'profile') {
      navigate('/profile-user')
    }
    else if (type === 'change-password') {
      navigate('/change-password')
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
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Xử lý logic khi nhấn phím Enter ở đây
      handleSearch()
    }
  };

  return (
    <div style={{ height: '60px', width: '100%', display: 'flex', background: '#ffff', justifyContent: 'center' }}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset', width: '100%' }}>
        <Col span={5}>
          {/* // <WrapperTextHeader onClick={() => navigate('/')} style={{ cursor: "pointer", paddingLeft: "25px" }}><img src='/src/assets/images/logo.png'></img></WrapperTextHeader> */}
          <img src={logo} alt="logo" width="40%" height="35" onClick={() => navigate('/')} style={{ cursor: "pointer", paddingLeft: "25px" }}></img>
        </Col>
        {!isHiddenSearch && (
          <Col span={12}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: "80%", position: "relative" }}>
                <InputComponent
                  size="large"
                  placeholder="Nhập và tìm kiếm"
                  style={{ backgroundColor: "#fff", width: "100%" }}
                  onChange={onChangeInput}
                  onKeyPress={handleKeyPress}
                />
                <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: "10px" }}>
                  <SearchLabelImage>
                    <CameraOutlined onClick={handleSearchImage} />
                  </SearchLabelImage>
                </div>
              </div>

              <ButtonComponent
                size="large"
                styleButton={{ background: '#fff', border: 'none', marginLeft: "20px" }}
                icon={<SearchOutlined color="#000000" style={{ color: '#000000' }} />}
                textbutton="Tìm kiếm"
                styleTextButton={{ color: "#000000" }}
                display="inline"
                onClick={handleSearch}
              />
            </div>
          </Col>
        )}

        <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: "30px" }}>
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
                <ResponsiveUserIcon />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} >
                    <UserNameDiv onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</UserNameDiv>
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