import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled.img`
     height: auto;
    width: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer; /* Thay đổi con trỏ thành pointer khi di chuột vào ảnh */

  &:hover {
    transform: scale(1.1); /* Phóng to ảnh khi di chuột */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Tăng bóng đổ khi di chuột */
  }
`;
export const WrapperStyleImage = styled.img`
     height: auto;
    width: 100%;
    border: 2px solid #ddd; /* Viền */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Bóng đổ */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Hiệu ứng khi di chuột */

    &:hover {
        transform: scale(1.05); /* Phóng to ảnh khi di chuột */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Tăng bóng đổ khi di chuột */
    }
`;

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`;

export const WrapperStyleNameProduct = styled.h1`
    color: rgb(36, 36, 36);
    font-size: 25px;
    font-weight: 700;
    line-height: 32px;
    word-break: break-word;
    text-align: left; /* Căn trái */
    @media (max-width: 768px) {
        font-size: 20px;
        line-height: 28px;
    }
`;

export const WrapperStyleTextSell = styled.span`
    font-size: 16px;
    line-height: 24px;
    color: rgb(120, 120, 120);
    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 20px;
    }
`;

export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
    border-top: 1px solid #e5e5e5;
    margin-top: 30px;
`;

export const WrapperPriceTextProduct = styled.h1`
    font-size: 24px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 20px;
    @media (max-width: 768px) {
        font-size: 20px;
        line-height: 28px;
        padding: 8px;
    }
`;

export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    span.change-address {
        color: #000000;
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
    @media (max-width: 768px) {
        span.address, span.change-address {
            font-size: 14px;
            line-height: 22px;
        }
    }
`;

export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 100px;
    border: 1px solid #ccc;
    border-radius: 4px;
    @media (max-width: 768px) {
        width: 80px;
    }
`;

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number {
        width: 40px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap {
            display: none !important;
        }
        .ant-input-number-input {
            text-align: center;
        }
    }
    @media (max-width: 768px) {
        &.ant-input-number {
            width: 30px;
        }
    }
`;

export const WrapperStyleCount = styled.span`
    padding-top: 30px;
    font-size: 16px;
    line-height: 24px;
    color: rgb(120, 120, 120);
    font-weight: 500;
    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 22px;
    }
`;

export const WrapperStyleSize = styled.span`
    padding-top: 30px;
    font-size: 16px;
    line-height: 24px;
    color: rgb(120, 120, 120);
    font-weight: 500;
    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 22px;
    }
`;

export const StyledPriceWrapper = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
    border-top: 1px solid #e5e5e5;
    margin-top: 30px;   
    position: relative;
`;

export const PriceContainer = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
    border-top: 1px solid #e5e5e5;
    padding: 8px;
    position: relative;
    @media (max-width: 768px) {
        padding: 6px;
    }
`;

export const Price = styled.div`
    font-size: 18px;
    text-decoration: line-through;
    color: #999;
    position: relative;
    display: inline-block;
    margin-right: 5px;
    @media (max-width: 768px) {
        font-size: 16px;
    }
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
    @media (max-width: 768px) {
        font-size: 24px;
        line-height: 32px;
        padding: 8px;
    }
`;
