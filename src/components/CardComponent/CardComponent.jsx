import React, { useState } from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'

const CardComponent = (props) => {
  const { countInStock, description, images, name, price, rating, type, discount, selled, id } = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    window.open(`/product-details/${id}`, '_blank');
  }
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleMouseEnter = () => {
    // Lấy index hình ảnh tiếp theo trong mảng
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
  };

  return (
    <WrapperCardStyle
      hoverable
      styles={{ header: { width: '200px', height: '200px' }, body: { padding: '10px' } }}
      style={{ width: 250, height: 480 }}
      cover={<img alt="example" src={images[currentImageIndex]} width="auto" height='375px' onMouseEnter={handleMouseEnter} />}
      onClick={() => countInStock !== 0 && handleDetailsProduct(id)}
      disabled={countInStock === 0}
    >
      <img
        src={logo}
        style={{
          width: '68px',
          height: '14px',
          position: 'absolute',
          top: -1,
          left: -1,
          borderTopLeftRadius: '3px'
        }}
      />
      <div style={{
        width: 220,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontWeight: '600'

      }}>{name}</div>
      <WrapperReportText>
        <span style={{ marginRight: '4px' }}>
          <span>Chất lượng 5 </span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
        </span>
        <WrapperStyleTextSell> | Đã bán {selled || 0}+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
        {discount ? (
          <WrapperDiscountText>
            giảm {discount} %
          </WrapperDiscountText>
        ) : (
          <WrapperDiscountText>
          </WrapperDiscountText>
        )}
      </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent