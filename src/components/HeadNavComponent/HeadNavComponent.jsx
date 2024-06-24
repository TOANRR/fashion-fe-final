import React from 'react'
import { WrapperTypeProduct, Nav, NavLink } from './style'
const HeadNavComponent = () => {
    return (
        <div style={{ width: '100%', margin: '0 auto', backgroundColor: '#000000' }}>
            <WrapperTypeProduct>
                <NavLink to="/">TRANG CHỦ</NavLink>
                <NavLink to="/about-us">VỀ CHÚNG TÔI</NavLink>
                {/* <NavLink to="/">FAQ</NavLink> */}
                <NavLink to="/product/filter">SẢN PHẨM CỦA CHÚNG TÔI</NavLink>
                <NavLink to="/articles">TIN TỨC</NavLink>

            </WrapperTypeProduct>
        </div>
    )
}

export default HeadNavComponent