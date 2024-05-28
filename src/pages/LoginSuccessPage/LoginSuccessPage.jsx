import { Spin } from 'antd';
import React, { useEffect } from 'react';

const LoginSuccess = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');

        // Lưu tokens vào Local Storage
        localStorage.setItem('access_token', JSON.stringify(accessToken))
        localStorage.setItem('refresh_token', JSON.stringify(refreshToken))
        // Redirect đến trang chủ
        window.location.href = '/';
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spin size="large" /> redicting {/* Thêm biểu tượng loading từ Ant Design và thiết lập kích thước lớn */}
        </div>
    );
};

export default LoginSuccess;
