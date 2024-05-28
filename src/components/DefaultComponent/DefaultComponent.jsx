import React, { useEffect, useState } from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import Footer from '../FooterComponent/Footer'
import ServiceSupport from '../ServiceSupport/ServiceSupport'
import { ConfigProvider } from 'antd'
import HeadNavComponent from '../HeadNavComponent/HeadNavComponent'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

// import ChatIcon from '../../assets/images/'
const DefaultComponent = ({ children }) => {

  const user = useSelector((state) => state.user);
  const [isMessengerLoaded, setIsMessengerLoaded] = useState(false);

  // useEffect(() => {
  //   const dfMessengerLoadedHandler = () => {
  //     const dfMessenger = document.querySelector("df-messenger");
  //     if (dfMessenger) {
  //       const chatElement = dfMessenger.shadowRoot.querySelector("df-messenger-chat");
  //       if (chatElement) {
  //         const sheet = new CSSStyleSheet();
  //         sheet.replaceSync(`div.chat-wrapper[opened="true"] { height: 450px; width: 300px; }`);
  //         chatElement.shadowRoot.adoptedStyleSheets = [sheet];
  //       }
  //     }
  //   };

  //   window.addEventListener('dfMessengerLoaded', dfMessengerLoadedHandler);

  //   return () => {
  //     window.removeEventListener('dfMessengerLoaded', dfMessengerLoadedHandler);
  //   };
  // }, []); // Empty dependency array ensures this effect only runs once after component mounts


  return (
    <div>
      <HeaderComponent />
      <HeadNavComponent />
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
        }}
      >
        {children}
        {/* {user ? (
          // Nếu user tồn tại, hiển thị df-messenger với user-id
          <df-messenger intent="WELCOME" chat-title="TKLFashion" agent-id="e7f8ffc8-4612-4cab-914d-8d81f3b0ba0a" language-code="vi" user-id={user.id}></df-messenger>
        ) : (
          // Nếu user không tồn tại, hiển thị df-messenger bình thường
          <df-messenger intent="WELCOME" chat-title="TKLFashion" agent-id="e7f8ffc8-4612-4cab-914d-8d81f3b0ba0a" language-code="vi"></df-messenger>
        )} */}
      </ConfigProvider>

      <ServiceSupport />
      <Footer />

    </div>
  )
}

export default DefaultComponent