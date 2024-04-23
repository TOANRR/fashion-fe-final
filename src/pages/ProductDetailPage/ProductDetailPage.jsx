import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailComponent/ProductDetailComponent'

const ProductDetailsPage = () => {
  const { id } = useParams()
  console.log(id)
  const navigate = useNavigate()
  return (
    <div style={{ height: '100vh', with: '100%', background: '#efefef' }}>
      <div style={{ width: '1000px', height: '100%', margin: '0 auto' }}>
        <h5><span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { navigate('/') }}>Trang chủ</span> - Chi tiết sản phẩm</h5>
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  )
}

export default ProductDetailsPage