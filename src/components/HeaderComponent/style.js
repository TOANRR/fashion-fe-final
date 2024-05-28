import { Row } from "antd";
import styled from "styled-components";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';

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
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    }
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #000000;
    white-space: nowrap;
    @media (max-width: 768px) {
      font-size: 10px;
    }
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`
export const SearchLabelImage = styled.label`
  position: relative;
  width: 5%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  cursor: pointer;
  padding-left: 5px;
  padding-right:5px;
  z-index: 3;
  font-size: 18px;
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

  
`;
export const AvatarImage = styled.img`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 768px) {
    height: 20px;
    width: 20px;
  }
`;

export const UserNameDiv = styled.div`
  cursor: pointer;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none;
  color: inherit;
  display: block;
  @media (max-width: 768px) {
    width: 80px;
    font-size: 12px;
  }
`;

export const ResponsiveUserIcon = styled(UserOutlined)`
  font-size: 25px;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
