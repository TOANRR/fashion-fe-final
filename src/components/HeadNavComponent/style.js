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
    // }`
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
          color: #fff; /* Màu chữ khi hover là màu xám trắng */
          font-weight: bold; /* In đậm chữ khi hover */
          font-style: italic; /* Nghiêng chữ khi hover */
      }
  `;