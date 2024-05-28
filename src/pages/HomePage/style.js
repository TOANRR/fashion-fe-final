import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Link } from 'react-router-dom';

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: center;
    height: 44px;
    margin-left: 8%;
    color: #ffff;
    // a {
    //     color: #ffffff;
    //     text-decoration: none;
    // }
    // ul, li {
    //     margin: 0;
    //     padding: 0;
    //     list-style: none;
    // }

`
export const WrapperTypeFeatured = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: center;
    font-size: 27px;
    margin-left: 8%;
    color: #ffff;
    padding-top: 14px;
    text-align: center; /* căn giữa văn bản */
    margin: 0 auto; /* căn giữa phần tử */
    width: 80%; /* Đảm bảo rằng chiều rộng không quá rộng */

`
export const WrapperTypeFeaturedSec = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: center;
    font-size: 24px;
    margin-left: 8%;
    color: #000000;
    padding-top: 14px;
    text-align: center; /* căn giữa văn bản */
    margin: 0 auto; /* căn giữa phần tử */
    width: 80%; /* Đảm bảo rằng chiều rộng không quá rộng */
    

`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #000000;
        span {
            color: #fff;
        }
    }
    width: 100%;
    color: rgb(11,116,229);
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`

export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top: 20px;
    // justify-content: center; /* Căn giữa theo chiều ngang */
    // align-items: center; /* Căn giữa theo chiều dọc */
    // flex-wrap: wrap;
    padding-left:5%;
`
export const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  li {
    display: inline;
    color: #fff;
    margin-right: 10px; /* Khoảng cách giữa các liên kết */
  }
`;
export const NavLink = styled(Link)`
    color: #ffffff;
    text-decoration: none;
    margin-right: 20px; /* Khoảng cách giữa các liên kết */
    transition: text-decoration 0.3s ease; /* Hiệu ứng khi hover vào */
    
    &:hover {
        text-decoration: underline; /* Dấu gạch chân khi hover vào */
        text-decoration-color: #ffffff; /* Màu dấu gạch chân khi hover là trắng */
        color: #e0e0e0; /* Màu chữ khi hover là màu xám trắng */
        font-weight: bold; /* In đậm chữ khi hover */
        font-style: italic; /* Nghiêng chữ khi hover */
    }
`;
export const ParentContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; /* Adjust as needed */
`;