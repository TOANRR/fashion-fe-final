import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    // padding: 10px 120px;
    // position: fixed;
    background-color: #ffff;
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1300px;
    padding: 10px 0;
    // z-index: 200;
 
`

export const WrapperTextHeader = styled.span`
    // font-size: 18px;
    // color: #000000;
    // font-weight: bold;
    // text-align: left;
`

export const WrapperHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    color: #000000;
    gap: 10px;
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #000000;
    white-space: nowrap;
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`
export const SearchLabelImage = styled.label`
  position: relative;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  cursor: pointer;
  padding-left: 5px;
  padding-right:5px;
  position: absolute;
  right: 130px;
  z-index: 3;
  i,
  p {
    color: hsl(244, 4%, 36%);
  }
  i {
    font-size: 40px;
  }
  p {
    font-size: 24px;
  }
  img {
    position: absolute;
    top: 2px;
    bottom: 2px;
    width: 100%;
    height: 100%;
  }
`;