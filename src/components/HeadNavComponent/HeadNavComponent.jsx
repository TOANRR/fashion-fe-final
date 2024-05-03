import React from 'react'
import { WrapperTypeProduct, Nav, NavLink } from './style'
const HeadNavComponent = () => {
    return (
        <div style={{ width: '100', margin: '0 auto', backgroundColor: '#000000', marginBottom: "10px" }}>
            <WrapperTypeProduct>

                <NavLink to="/about-us">ABOUT US</NavLink>
                <NavLink to="/">FAQ</NavLink>
                <NavLink to="/product/filter">SẢN PHẨM CỦA CHÚNG TÔI</NavLink>


            </WrapperTypeProduct>
        </div>
    )
}

export default HeadNavComponent