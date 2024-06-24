import styled from "styled-components";
import { Card } from "antd";

export const WrapperCardStyle = styled(Card)`
   
  
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    width: 100%;
    // max-width: 300px;
    height: auto;
    margin: 0 auto; /* Center the card horizontally */

    img {
        width: 100%;
        // height: auto;
    }
`
export const StyleNameProduct = styled.div`
    font - weight: bold;
    font - size: 12px;
    line - height: 16px;
    color: rgb(56, 56, 61);
    width: 260;
    overflow: 'hidden';
    textOverflow: 'ellipsis';
    whiteSpace: 'nowrap';
`
export const WrapperReportText = styled.div`
    font - size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align - items: center;
    margin: 6px 0 0px;
`

export const WrapperPriceText = styled.div`
    color: #000000;
    font - size: 16px;
    font - weight: 500;
`

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font - size: 12px;
    font - weight: 400;
`

export const WrapperStyleTextSell = styled.span`
    font - size: 12px;
    line - height: 24px;
    color: rgb(120, 120, 120)
    `