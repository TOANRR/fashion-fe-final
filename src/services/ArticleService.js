import axios from "axios";

const axiosJWT = axios.create();

export const getArticleById = async (id) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/article/get-article/${id}`);
    return res.data;
};

export const createArticle = async (articleData, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/article/create`, articleData,
        {
            headers: {
                token: `Bearer ${access_token}`,
            }
        }
    );
    return res.data;
};

export const updateArticle = async (id, articleData, token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/article/update/${id}`, articleData,
        {
            headers: {
                token: `Bearer ${token}`,
            }
        }
    );
    return res.data;
};

export const deleteArticle = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/article/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            }
        }
    );
    return res.data;
};

export const getAllArticles = async (access_token) => {
    console.log(access_token)
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/article/get-all`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            }
        }
    );
    return res.data;
};

export const getAllComment = async (access_token) => {
    console.log(access_token)
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/comment`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            }
        }
    );
    return res.data;
};
export const deleteComment = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/comment/${id}`
    );
    return res.data;
};