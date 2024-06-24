import axios from "axios"
import { axiosJWT } from "./UserService"
export const getAllProduct = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`)
    } else {
        // if (limit === undefined) limit = 1000;
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`)
    }
    return res.data
}

export const getAllProductImage = async (search, limit) => {
    let res = {}
    console.log("ids", search)
    res = await axios.post(`${process.env.REACT_APP_API_URL}/product/get-all-obj?limit=${limit}`, {

        ids: search


    })

    return res.data
}


export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
    return res.data
}

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`)
    console.log(res.data)
    return res.data
}
export const getDetailsProductNostar = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details-admin/${id}`)
    console.log(res.data)
    return res.data
}
export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const deleteManyProduct = async (data, access_token,) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`)
    return res.data
}
export const getProductType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}
export const getAllTypeCategories = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/types-categories`)
    return res.data
}
export const getFilterProduct = async (data) => {
    console.log(data)
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/filter-product`, data)
    return res.data
}
export const getProductByType = async (data) => {
    // console.log(data)
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/product-type/${data}`)
    // console.log(res.data)
    return res.data
}
export const getProductByCategory = async (type, cate) => {
    // console.log(data)
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/product-category/${cate}?type=${type}`)
    // console.log(res.data)
    return res.data
}
export const getCategories = async () => {

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/categories`)
    return res.data

}
export const createReview = async (data, access_token) => {

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/review/create-review`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data

}
export const getReview = async (id) => {

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/review/get-all-review/${id}`)
    return res.data

}
export const getCheckReview = async (data) => {

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/check-order`, data)
    return res.data

}
export const getSearchImage = async (data) => {

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/search-image`, data)
    return res.data

}
export const getSearchResult = async (search) => {

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/search-name?query=${search}`)

    return res.data
}
export const checkStock = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/check-stock`, { products: data })
    return res.data
}