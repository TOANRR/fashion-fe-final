import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils'
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminOrder from '../../components/AdminOrder/AdminOrder';


const AdminPage = () => {
  const items = [
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />),
    getItem('Đơn hàng', 'order', <ShoppingCartOutlined />)
  ];


  const rootSubmenuKeys = ['user', 'product', 'order'];
  const [openKeys, setOpenKeys] = useState(['user']);
  const [keySelected, setKeySelected] = useState('user')
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
    console.log('keyselected', keySelected)
  }

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