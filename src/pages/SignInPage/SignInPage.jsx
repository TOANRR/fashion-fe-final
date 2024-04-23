import React, { useEffect } from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContainerLeft, WrapperContainerRight, WrapperCover, WrapperTextLight } from './style'
import imageLogologin from '../../assets/images/logo2.png'


import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'
import * as CardService from '../../services/CardService'
import { addOrderProduct } from '../../redux/slides/orderSlide'

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation()

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  const { data, isPending, isSuccess } = mutation


  useEffect(() => {
    // console.log("mutation",mutation)
    if (localStorage.getItem('access_token')) {
      const decoded = jwtDecode(localStorage.getItem('access_token'))
      if (decoded?.id) {
        if (decoded?.isAdmin)
          navigate('/system/admin')
        else navigate('/')
      }
    }
    if (isSuccess) {
      if (data?.status === 'OK') {
        localStorage.setItem('access_token', JSON.stringify(data?.access_token))
        localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
        if (data?.access_token) {

          const decoded = jwtDecode(data?.access_token)
          // console.log(decoded)
          if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, data?.access_token)
            const fetchData = async () => {
              return await CardService.getAllItems(decoded?.id, data?.access_token)

            };
            const result = fetchData()
              .catch(console.error);;

            result.then(function (res) {
              console.log(res) // "Some User token"
              res.data.forEach((data, index) => {
                let orderItem = {
                  name: data?.product.name,
                  amount: data?.quantity,
                  image: data?.product.images[0],
                  price: data?.product.price,
                  product: data?.product._id,
                  discount: data?.product.discount,
                  countInstock: data?.countInStock,
                  size: data?.size
                }
                console.log(orderItem)
                dispatch(addOrderProduct({
                  orderItem

                }))
              });
            })


            if (location?.state) {
              navigate(location?.state)
            }
            else
              if (decoded?.isAdmin)
                navigate('/system/admin')
              else navigate('/')
          }

        }

      }


    }


  }, [isSuccess])

  // console.log('mutation', mutation)

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))

  }
  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
    // console.log('sign-in', email, password)
  }

  return (
    <WrapperCover >
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex', boxShadow: '5px 5px 10px 0 rgba(0, 0, 0, 0.7)' }}>
        <WrapperContainerLeft>
          <h1>Đăng nhập</h1>
          <p>Cùng đăng nhập và mua sắm nhé!</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: '#000000',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textbutton={'Đăng nhập'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </Loading>
          <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
          <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogologin} preview={false} alt="iamge-logo" height="203px" width="203px" />
          {/* <h4>Mua sắm tại web-economerce</h4> */}
        </WrapperContainerRight>
      </div>
    </WrapperCover >
  )
}

export default SignInPage