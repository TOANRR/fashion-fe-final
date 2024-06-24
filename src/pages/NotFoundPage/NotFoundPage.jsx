import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { routes } from '../../routes/index';

const NotFoundPage = () => {
  const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading
  const [error, setError] = useState(false); // State để kiểm tra trạng thái lỗi
  const user = useSelector(state => state.user);

  useEffect(() => {
    const checkPath = () => {
      const currentPath = window.location.pathname;
      const isValidPath = routes.some(route => route.path === currentPath);
      if (!isValidPath) {
        setLoading(false); // Tắt trạng thái loading
        setError(true); // Không có lỗi
      } else {
        if (user?.id) {
          setLoading(false); // Tắt trạng thái loading
          setError(false); // Hiển thị lỗi
        }
        else {
          setLoading(false); // Tắt trạng thái loading
          setError(true); // Hiển thị lỗi
        }

      }
    };

    const timeout = setTimeout(checkPath, 5000); // Kiểm tra đường dẫn và user sau 2 giây

    return () => clearTimeout(timeout); // Hủy timeout khi component unmount
  }, [user]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading && !error && <Spin size="large" />} {/* Hiển thị Spin khi đang loading và không có lỗi */}
      {error && <div>Error: 404</div>} {/* Hiển thị lỗi nếu điều kiện không thỏa mãn */}
    </div>
  );
};

export default NotFoundPage;
