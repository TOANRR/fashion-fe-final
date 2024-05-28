import { Menu } from 'antd';
import { UserOutlined, LockOutlined, OrderedListOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RightMenu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState('');

    useEffect(() => {
        // Phân tích đường dẫn URL để xác định mục menu tương ứng
        const path = location.pathname;
        let key = '';
        if (path === '/profile-user') {
            key = 'profile';
        } else if (path === '/change-password') {
            key = 'change-password';
        } else if (path === '/my-order') {
            key = 'orders';
        }
        setSelectedKey(key);
    }, [location]);

    const handleClick = (key) => {
        let path = '/';
        if (key === 'profile') {
            path = '/profile-user';
        } else if (key === 'change-password') {
            path = '/change-password';
        } else if (key === 'orders') {
            path = '/my-order';
        }
        navigate(path);
    };

    return (
        <Menu mode="inline" style={{

            minHeight: '100vh'
        }}
            selectedKeys={[selectedKey]}>
            <Menu.Item icon={<UserOutlined />} key="profile" onClick={() => handleClick('profile')}>
                Thông tin người dùng
            </Menu.Item>
            <Menu.Item icon={<LockOutlined />} key="change-password" onClick={() => handleClick('change-password')}>
                Đổi mật khẩu
            </Menu.Item>
            <Menu.Item icon={<OrderedListOutlined />} key="orders" onClick={() => handleClick('orders')}>
                Đơn hàng
            </Menu.Item>
        </Menu>
    );
};

export default RightMenu;
