import React from 'react'
import { WrapperContent, WrapperLableText, WrapperTextValue, WrapperTextPrice } from './style'
import { Checkbox, Rate } from 'antd';
import { useState } from 'react'
import * as ProductService from '../../services/ProductService'
import { useEffect } from 'react'
import TypeProduct from '../TypeProduct/TypeProduct';

const NavbarComponent = () => {
    const [typeProducts, setTypeProducts] = useState([])
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {

                    return (
                        <WrapperTextValue><TypeProduct name={option} key={option} /></WrapperTextValue>
                    )
                }

                )
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox style={{ marginLeft: 0 }} value={option.value}>{option.label}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ dispaly: 'flex' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span> {`từ ${option}  sao`}</span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }
    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    return (
        <div style={{ backgroundColor: '#fff' }}>
            <WrapperLableText>Phân loại</WrapperLableText>
            <WrapperContent>
                {renderContent('text', typeProducts)}
            </WrapperContent>
            {/* <WrapperContent>
        {renderContent('checkbox',
        [{value:'a',label:'A'},
        {value:'b',label:'B'},
        {value:'c',label:'C'}])}
        </WrapperContent>
        <WrapperContent>
        {renderContent('star',[3,4,5])}
        </WrapperContent>
        <WrapperContent>
        {renderContent('price',['dưới 40.000đ','trên 50.000đ'])}
        </WrapperContent> */}

        </div>
    )
}

export default NavbarComponent