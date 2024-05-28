import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { FormWrapper, FormContainer, StyledButton, Title, FormItem, ButtonWrapper } from './style';
import * as UserServices from '../../services/UserService';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onFinish = async (values) => {
        setLoading(true);

        const response = await UserServices.ResetPassword(token, values.password)
        if (response.success === true) {
            message.success(response.message)
            navigate('/sign-in')

        }
        else {
            message.error(response.message)
        }

        setLoading(false);

    };

    return (
        <FormWrapper>
            <FormContainer>
                <Title>Nhập mật khẩu mới</Title>
                <Form
                    onFinish={onFinish}
                    size="large"
                >
                    <FormItem>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 kí tự!' },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Enter new password" />
                        </Form.Item>
                    </FormItem>
                    <FormItem>
                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm new password" />
                        </Form.Item>
                    </FormItem>
                    <ButtonWrapper>
                        <StyledButton type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </StyledButton>
                    </ButtonWrapper>
                </Form>
            </FormContainer>
        </FormWrapper>
    );
};

export default ResetPasswordPage;
