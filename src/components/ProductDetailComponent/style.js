import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled.img`
    height: 100px;
    width: 80px;
`
export const WrapperStyleImage = styled.img`
    height: auto; 
    width: 100%;
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`

export const WrapperStyleNameProduct = styled.h1`
    color: rgb(36, 36, 36);
    font-size: 25px;
    font-weight: 700;
    line-height: 32px;
    word-break: break-word;
    text-align: left; /* Căn trái */
`

export const WrapperStyleTextSell = styled.span`
    font-size: 16px;
    line-height: 24px;
    color: rgb(120, 120, 120);
    
`

export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
    border-top: 1px solid #e5e5e5;
    margin-top:30px;
`

export const WrapperPriceTextProduct = styled.h1`
    font-size: 24px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 20px;
`

export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl
    };
    span.change-address {
        color: #000000;
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
`

export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 100px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number {
        width: 40px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap {
            display: none !important;
        };
        // text-align: center;
        .ant-input-number-input {
            text-align: center;
        }
    };
`
export const WrapperStyleCount = styled.span`
    padding-top:30px;
    font-size: 16px;
    line-height: 24px;
    color: rgb(120, 120, 120);
    font-weight:500;
`
export const WrapperStyleSize = styled.span`
    padding-top:30px;
    font-size: 16px;
    line-height: 24px;
    color: rgb(120, 120, 120);
    font-weight:500;
`
export const StyledPriceWrapper = styled.div`
background: rgb(250, 250, 250);
border-radius: 4px;
border-top: 1px solid #e5e5e5;
margin-top:30px;   
position: relative;
    margin-top: 30px;
`;

export const PriceContainer = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
    border-top: 1px solid #e5e5e5;
    padding: 8px;
    position: relative;
`;

export const Price = styled.div`
    font-size: 18px;
    text-decoration: line-through;
    color: #999;
    position: relative;
    display: inline-block;
    margin-right: 5px;
`;

export const DiscountPrice = styled.div`
    font-weight: bold;
    color: #000;
    position: relative;
    display: inline-block;
    font-size: 28px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 20px;
`;

