import { ConfigProvider, Spin } from 'antd'
import React from 'react'

const Loading = ({ children, isLoading }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorSuccess: "#58ea10",
                    colorPrimary: "#000000",
                    colorInfo: "#000000",
                    colorPrimaryBg: "#4040401d",
                    colorPrimaryBgHover: "#3333332e",
                    colorPrimaryHover: "#0d0d0d",
                    colorPrimaryBorderHover: "#1a1a1a",
                    colorPrimaryBorder: "#262626",
                    colorPrimaryTextHover: "#0d0d0df7"
                },
            }}
        >
            <Spin spinning={isLoading} >
                {children}
            </Spin>
        </ConfigProvider>
    )
}

export default Loading