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
        <div>
            <h1>Redirecting...</h1>
        </div>
    );
};

export default LoginSuccess;
