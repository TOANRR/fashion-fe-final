import React from 'react'
import { useNavigate } from 'react-router-dom'
import { WrapperNameType } from './style'

const TypeProduct = ({ name }) => {
  const navigate = useNavigate()
  const handleNavigatetype = (type) => {
    navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: type })
  }
  return (
    <WrapperNameType style={{ padding: '0 10px', cursor: 'pointer' }} onClick={() => handleNavigatetype(name)}>{name.toUpperCase()}</WrapperNameType>
  )
}

export default TypeProduct