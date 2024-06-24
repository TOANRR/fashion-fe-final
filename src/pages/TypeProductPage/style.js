
import { Col, Layout } from "antd"
import styled from "styled-components"

const { Header, Content } = Layout;

export const WrapperProducts = styled.div`
    display: flex;
    gap: 12px;
    margin-top:20px;
    flex-wrap: wrap;
`

export const WrapperNavbar = styled(Col)`
    background: #fff; 
    margin-right: 20px;
    padding: 20px;
    border-radius: 4px;
    height: fit-content;
    margin-top:20px;
    width: 200px;
`
export const Wrapper = styled.div`
    width: 100%;
    overflow: hidden;
    display: flex;
    padding-bottom:50px;
    /* Ngăn tràn ra ngoài khi sử dụng float */
`
export const LeftSide = styled.div`
    width: 20%;
    /* 2/5 của trang web */
    padding-left: 50px;
    margin-top: 50px;
    /* Lề trái 50px */
    float: left;
    /* Cố định phần bên trái */
`
export const RightContent = styled.div`
    width: 80%;
    overflow: auto;
    padding-left: 15%;

    /* Phần còn lại của trang web */

    /* Cố định phần bên phải */
`
export const StyledHeader = styled(Header)`
  background: #000000;
  padding: 0;
  h1 {
    color: white;
    text-align: center;
    margin: 0;
    line-height: 64px;
  }
`;