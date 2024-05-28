import { ConfigProvider, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { getItem } from '../../utils'
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined, DashboardOutlined, ReadOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminOrder from '../../components/AdminOrder/AdminOrder';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';
import AdminArticle from '../../components/AdminArticle/AdminArticle';


const AdminPage = () => {
  const items = [
    getItem('Dashboard', 'dashboard', <DashboardOutlined />),
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />),
    getItem('Đơn hàng', 'order', <ShoppingCartOutlined />),
    getItem('Bài đăng', 'article', <ReadOutlined />),

  ];

  const searchParams = new URLSearchParams(window.location.search);
  const paramValue = searchParams.get('select');
  const [keySelected, setKeySelected] = useState(paramValue || 'dashboard')
  const renderPage = (key) => {
    switch (key) {
      case 'user':
        {
          return (
            <AdminUser />
          )
        }
      case 'product':
        {
          return (
            <AdminProduct />
          )
        }
      case 'order':
        {
          return (
            <AdminOrder />
          )
        }
      case 'dashboard':
        {
          return (
            <AdminDashboard />
          )
        }
      case 'article':
        {
          return (
            <AdminArticle />
          )
        }
      default:
        {

        }
    }
  }
  const handleOnClick = ({ key }) => {
    setKeySelected(key);
    updateSearchParam(key);
  }

  const updateSearchParam = (key) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('select', key);
    const newSearchString = searchParams.toString();
    const newURL = window.location.pathname + '?' + newSearchString;
    window.history.replaceState(null, null, newURL);
  };



  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorSuccess: "#58ea10",
            colorPrimary: "#000000",
            colorInfo: "#000000",
            colorPrimaryBg: "#4040401d",
            colorPrimaryBgHover: "#3333332e",
            colorPrimaryHover: "#0d0d0d",
            colorPrimaryBorderHover: "#1a1a1a",
            colorPrimaryBorder: "#262626",
            colorPrimaryTextHover: "#0d0d0df7"
          },
        }}
      >
        <HeaderComponent isHiddenSearch isHiddenCart />
        <div style={{ display: 'flex' }}>
          <Menu
            mode="inline"
            style={{
              width: 256,
              boxShadow: '1px 1px 2px #ccc',
              minHeight: '100vh'
            }}
            items={items.map(item => ({
              ...item,
              style: keySelected === item.key ? { color: 'white', background: 'black' } : {}
            }))}
            onClick={handleOnClick}
          />
          <div style={{ flex: 1, padding: '15px' }}>
            {renderPage(keySelected)}
          </div>
        </div>
      </ConfigProvider>

    </>
  )
}

export default AdminPage;