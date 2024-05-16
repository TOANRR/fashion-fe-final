import { axiosJWT } from "./UserService"

// export const createProduct = async (data) => {
//   const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
//   return res.data
// // }
// http://localhost:3001/api/order/get-order-details/639724669c6dda4fa11edcde
export const createOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create/${data.user}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getOrderByUserId = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getDetailsOrder = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const cancelOrder = async (id, access_token, orderItems, userId) => {
    const data = { orderItems, orderId: id }
    console.log(access_token)
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/cancel-order/${userId}`, {
        headers: {
            token: `Bearer ${access_token}`,
            withCredentials: true
        },
        data: data
    })
    return res.data
}
export const deleteOrder = async (id, access_token) => {
    const data = { orderId: id }
    console.log(access_token)
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/delete-order`, {
        headers: {
            token: `Bearer ${access_token}`,
            withCredentials: true
        },
        data: data
    })
    return res.data
}

export const getAllOrder = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getAllOrderByTime = async (access_token, start, end) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order?start=${start}&end=${end}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const updateOrder = async (id, access_token, data) => {
    console.log(access_token)
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/update-order/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
            withCredentials: true
        },

    })
    return res.data
}
export const getTotalRevenueAndOrders = async (access_token) => {
    console.log(access_token)
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/dashboard/total-revenue-and-orders`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    console.log(res)
    return res.data
}