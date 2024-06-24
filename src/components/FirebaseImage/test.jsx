import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const WrapperStyleImage = styled.img`
    height: auto; 
    width: 100%;
    border: 2px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer; /* Thay đổi con trỏ thành pointer khi di chuột vào ảnh */

    // &:hover {
    //     transform: scale(1.05);
    //     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    // }
`;

const ZoomedImagePopup = styled.div`
  position: absolute;
  border: 2px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 400px; /* Chiều rộng của popup */
  height: 600px; /* Chiều cao của popup */
  background-image: url(${props => props.src});
  background-size: 300%; /* Điều chỉnh kích thước phóng to */
  background-position: ${props => props.position};
  z-index: 10; /* Đảm bảo popup hiển thị trên các phần tử khác */
  pointer-events: none; /* Để popup không cản trở thao tác chuột */
`;

const ImageZoomPopup = ({ src, alt }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = imgRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setPosition({ x, y });
    };

    const handleMouseEnter = () => {
        setIsZoomed(true);
    };

    const handleMouseLeave = () => {
        setIsZoomed(false);
    };

    return (
        <div
            className="image-container-detail"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            <WrapperStyleImage
                ref={imgRef}
                src={src}
                alt={alt}
            />
            {isZoomed && (
                <ZoomedImagePopup
                    src={src}
                    position={`${position.x}% ${position.y}%`}
                    style={{ top: '0', left: 'calc(100% + 20px)' }} /* Đặt popup phía tay phải */
                />
            )}
        </div>
    );
};

export default ImageZoomPopup;
