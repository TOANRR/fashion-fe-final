import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { Breadcrumb } from 'antd'

const ProductDetailsPage = () => {
  const { id } = useParams()
  console.log(id)
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '110vh', with: '100%', background: '#ffff', paddingBottom: "50px" }}>
      <div style={{ width: '1100px', height: '100%', margin: '0 auto' }}>

        <ProductDetailsComponent idProduct={id} />
      </div>

    </div>
  )
}

export default ProductDetailsPage