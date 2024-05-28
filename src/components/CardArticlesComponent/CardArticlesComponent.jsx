import React, { useState } from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'

const CardArticlesComponent = ({ article }) => {
    const navigate = useNavigate()
    const handleDetailsArtilce = () => {
        window.location.href = `/articles/${article._id}`;
    }


    return (
        <WrapperCardStyle
            hoverable
            styles={{ header: { width: '200px', height: '200px' }, body: { padding: '10px' } }}
            style={{ width: 250, height: 250 }}
            cover={<img alt="example" src={article.coverImage} width="250" height='auto' />}
            onClick={() => handleDetailsArtilce()}
        >

            <div style={{


                fontWeight: '600',
                paddingTop: "5px"

            }}>{article.title}</div>
            {/* <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>Chất lượng 5 </span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                </span>
                <WrapperStyleTextSell> | Đã bán {selled || 0}+</WrapperStyleTextSell>
            </WrapperReportText> */}
            {/* <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                {discount ? (
                    <WrapperDiscountText>
                        giảm {discount} %
                    </WrapperDiscountText>
                ) : (
                    <WrapperDiscountText>
                    </WrapperDiscountText>
                )}
            </WrapperPriceText> */}
        </WrapperCardStyle>
    )
}

export default CardArticlesComponent