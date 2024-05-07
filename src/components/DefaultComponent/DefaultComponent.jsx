import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import Footer from '../FooterComponent/Footer'
import ServiceSupport from '../ServiceSupport/ServiceSupport'
import { ConfigProvider } from 'antd'
import HeadNavComponent from '../HeadNavComponent/HeadNavComponent'

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <HeadNavComponent />
      {/* <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorSuccess: "#58ea10",
            colorPrimary: "#000000",
            colorInfo: "#000000"
          },
        }}
      > */}
      {children}
      {/* </ConfigProvider> */}

      <ServiceSupport />
      <Footer />

    </div>
  )
}

export default DefaultComponent