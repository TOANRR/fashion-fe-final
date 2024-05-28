import React, { useState } from 'react';
import { Form, Input, Button, message, Breadcrumb, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RightMenu from '../../components/RightMenuComponent/RightMenuComponent';

const PasswordChange = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [form] = Form.useForm(); // Sử dụng Form.useForm() để sử dụng form instance

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/change-password/${user.id}`, {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            },
                {
                    headers: {
                        token: `Bearer ${user.access_token}`,
                    }
                }
            );
            if (response.data.success) {
                message.success('Đổi mật khẩu thành công');
                form.resetFields(); // Đặt lại các trường của form
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error('mật khẩu không đúng');
        } finally {
            setLoading(false);
        }
    };

    return (

        <div style={{ width: "100%", borderBottom: '1px solid #ccc' }}>
            <div style={{ paddingLeft: "30px" }}>
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: <a href="/">Trang chủ</a>,
                        },

                        {
                            title: <a href="#">Đổi mật khẩu</a>,
                        }


                    ]}
                    style={{ fontSize: "18px", fontWeight: "500", marginTop: "15px", marginBottom: "30px", paddingLeft: "1%" }}
                />
                <div style={{ display: 'flex', paddingTop: "0px", width: "256px" }}>
                    <div style={{ marginRight: '10px', width: '25%', textAlign: 'center' }}>
                        {
                            user?.avatar ? (
                                <img src={user?.avatar} alt="Avatar" style={{ width: '50%', borderRadius: '50%' }} />
                            ) : <img src="https://salt.tikicdn.com/desktop/img/avatar.png" alt="Avatar" style={{ width: '50%', borderRadius: '50%' }} />
                        }


                    </div>

                    <div style={{ marginBottom: '5px', textAlign: 'center', fontWeight: "700", maxWidth: '150px', wordWrap: 'break-word' }}>
                        {user?.name ? user?.name : user?.email}
                    </div>
                </div>

                <Row >
                    <Col span={5}>
                        <RightMenu />
                    </Col>

                    <Col span={18} style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: "50%", padding: '20px', fontWeight: "600" }}>
                            <h1 style={{ textAlign: 'center', marginBottom: "50px" }}>Đổi mật khẩu</h1>
                            <Form
                                name="password_change"
                                onFinish={onFinish}
                                layout="vertical"
                                form={form} // Sử dụng form instance đã tạo
                            >
                                <Form.Item
                                    name="currentPassword"
                                    label="Mật khẩu hiện tại (nếu có)"
                                    rules={[{ message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    name="newPassword"
                                    label="Mật khẩu mới"
                                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    name="confirmNewPassword"
                                    label="Xác thực mật khẩu mới"
                                    dependencies={['newPassword']}
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập lại mật khẩu mới!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item>
                                    <div style={{ textAlign: 'right' }}>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            Đổi mật khẩu
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>

                    </Col>
                </Row>
            </div>


        </div>
    );
};

export default PasswordChange;
