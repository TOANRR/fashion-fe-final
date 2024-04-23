import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import Footer from '../FooterComponent/Footer'
import ServiceSupport from '../ServiceSupport/ServiceSupport'

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      {children}
      <ServiceSupport />
      <Footer />

    </div>
  )
}

export default DefaultComponent