import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, message } from 'antd';
import { FormWrapper, FormContainer, StyledButton, Title, FormItem, ButtonWrapper } from './style';
import * as UserServices from '../../services/UserService';

const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);

        const response = await UserServices.ForgotPassword(values.email);
        if (response.success === true) {
            message.success(response.message)
        }
        else
            message.error(response.message)

        setLoading(false);

    };

    return (
        <FormWrapper>
            <FormContainer>
                <Title>Nhập email bạn đã đăng kí</Title>
                <Form onFinish={onFinish} size="large">
                    <FormItem>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email !' },
                                { type: 'email', message: 'Định dạng không đúng!' },
                            ]}
                        >
                            <Input placeholder="Enter your email" />
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

export default ForgotPasswordPage;
