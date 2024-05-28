import { Button, ConfigProvider } from 'antd'
import React from 'react'

const ButtonComponent = ({ width, size, styleButton, styleTextButton, textbutton, disabled, ...rests }) => {
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
        }
      }}>
      <Button
        style={{
          ...styleButton,
          background: disabled ? '#ccc' : styleButton.background,
        }}
        size={size}
        {...rests}
      >
        <span style={styleTextButton}>{textbutton}</span>
      </Button>
    </ConfigProvider>
  )
}

export default ButtonComponent