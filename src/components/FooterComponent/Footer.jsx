import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { footMenu, footSocial } from './FooterData';
import './footer.css';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';



const Footer = () => {

    const [subValue, setSubValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubValue('');
        alert(' Cảm ơn bạn, bạn đã đăng ký nhận bản tin hàng ngày của chúng tôi');
    };

    const currYear = new Date().getFullYear();


    return (
        <footer id="footer">
            <div className="container">
                <div className="wrapper footer_wrapper">
                    <div className="foot_about">
                        <h2>
                            <Link to="/">TKLFashion</Link>
                        </h2>
                        <div className="foot_subs">

                            <p>Subscribe to our Email alerts to receive early discount offers, and new products info.</p>
                            <form onSubmit={handleSubmit}>
                                <InputComponent
                                    size="large"
                                    placeholder="Email address"
                                    bordered="bordered"
                                    style={{ backgroundColor: "#fff" }}
                                    display="inline"
                                    position="absolute"
                                    z-index="2"

                                />
                                <ButtonComponent
                                    onClick={handleSubmit}
                                    size={40}
                                    styleButton={{
                                        background: 'rgba(255,0,0,.8)',
                                        height: '48px',
                                        width: '110px',
                                        border: '1px solid #000000',
                                        borderRadius: '4px',
                                        marginTop: '20px',

                                    }}
                                    textbutton={'SUBSCRIBE'}
                                    styleTextButton={{ color: '#ffff', fontSize: '15px' }}
                                ></ButtonComponent>

                            </form>

                        </div>
                    </div>

                    {
                        footMenu.map(item => {
                            const { id, title, menu } = item;
                            return (
                                <div className="foot_menu" key={id}>
                                    <h4>{title}</h4>
                                    <ul>
                                        {
                                            menu.map(item => {
                                                const { id, link, path } = item;
                                                return (
                                                    <li key={id}>
                                                        <Link to={path}>{link}</Link>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            <div className="separator"></div>

            <div className="sub_footer">
                <div className="container">
                    <div className="sub_footer_wrapper">
                        <div className="foot_copyright">
                            <p>
                                {currYear} | TKLFashion. All Rights Reserved.
                                Built by | <a href="https://gulshansongara.netlify.app/">Trịnh Khánh Ly</a>
                            </p>
                        </div>
                        <div className="foot_social">
                            {
                                footSocial.map((item) => {
                                    const { id, icon, path } = item;
                                    return (
                                        <Link to={path} key={id}>{icon}</Link>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;