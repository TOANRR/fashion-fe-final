import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { isJsonString } from './utils'
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser, updateUser } from './redux/slides/userSlide'
import Loading from './components/LoadingComponent/LoadingComponent'
import { useNavigate } from 'react-router-dom'

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsLoading(false)
  }, [])

  const handleDecoded = () => {
    let storageData = user?.access_token || localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const decodedRefreshToken = jwtDecode(refreshToken)
    if (decoded?.exp < currentTime.getTime() / 1000) {
      if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken(refreshToken)
        config.headers['token'] = `Bearer ${data?.access_token}`
      } else {
        dispatch(resetUser())
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token")
      }
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })

  const handleGetDetailsUser = async (id, token) => {
    try {
      let storageRefreshToken = localStorage.getItem('refresh_token')
      const refreshToken = JSON.parse(storageRefreshToken)
      const res = await UserService.getDetailUser(id, token)
      dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken }))
    } catch (e) {
      console.log(e)
    }

  }
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const checkSign = !route.isAuth || user.id
              const ischeckAuth = !route.isPrivate || user.isAdmin
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (

                <Route key={route.path} path={(ischeckAuth && checkSign) ? route.path : undefined} element={
                  <div>
                    <Layout>
                      <Page />
                    </Layout>
                    <div style={{ display: route.isShowHeader ? 'block' : 'none' }}>
                      {(user ? (
                        // Nếu user tồn tại, hiển thị df-messenger với user-id
                        <df-messenger intent="WELCOME" chat-title="TKLFashion" agent-id="e7f8ffc8-4612-4cab-914d-8d81f3b0ba0a" language-code="vi" user-id={user.id}></df-messenger>
                      ) : (
                        // Nếu user không tồn tại, hiển thị df-messenger bình thường
                        <df-messenger intent="WELCOME" chat-title="TKLFashion" agent-id="e7f8ffc8-4612-4cab-914d-8d81f3b0ba0a" language-code="vi"></df-messenger>
                      ))}
                    </div>
                  </div>


                } />
              )
            })}
          </Routes>
        </Router>
      </Loading>

    </div>
  )
}

export default App



