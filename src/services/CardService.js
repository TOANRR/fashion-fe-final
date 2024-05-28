import { axiosJWT } from "./UserService"
import axios from "axios"
// export const createProduct = async (data) => {
//   const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
//   return res.data
// // }
// http://localhost:3001/api/order/get-order-details/639724669c6dda4fa11edcde
export const addToCard = async (data, access_token) => {
    // console.log(data)
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/card/create/${data.user}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}



export const getAllItems = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/card/get-all-items/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteItem = async (data, access_token) => {
    console.log({ data })
    console.log(access_token)
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/card/delete/${data.user}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
                withCredentials: true
            },
            data: data
        })
    return res.data
}

