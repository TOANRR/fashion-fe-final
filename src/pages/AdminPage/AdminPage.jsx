import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { getItem } from '../../utils'
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined, DashboardOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminOrder from '../../components/AdminOrder/AdminOrder';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';


const AdminPage = () => {
  const items = [
    getItem('Dashboard', 'dashboard', <DashboardOutlined />),
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />),
    getItem('Đơn hàng', 'order', <ShoppingCartOutlined />),


  ];

  const searchParams = new URLSearchParams(window.location.search);
  const paramValue = searchParams.get('select');
  // const rootSubmenuKeys = ['user', 'product', 'order', 'dashboard'];
  const [openKeys, setOpenKeys] = useState(paramValue);
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
      default:
        {

        }
    }
  }
  // const onOpenChange = (keys) => {
  //   const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  //   if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //     setOpenKeys(keys);
  //   } else {
  //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //   }
  // };

  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
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
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: 'flex' }}>
        <Menu
          mode="inline"
          openKeys={openKeys}
          //onOpenChange={onOpenChange}
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: '170vh'
          }}
          items={items}
          onClick={handleOnCLick}
        />
        <div style={{ flex: 1, padding: '15px' }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage