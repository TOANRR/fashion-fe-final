import axios from "axios";

const axiosJWT = axios.create();

export const getArticleById = async (id) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/article/get-article/${id}`);
    return res.data;
};

export const createArticle = async (articleData) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/article/create`, articleData);
    return res.data;
};

export const updateArticle = async (id, articleData) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/article/update/${id}`, articleData);
    return res.data;
};

export const deleteArticle = async (id) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/article/delete/${id}`);
    return res.data;
};

export const getAllArticles = async () => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/article/get-all`);
    return res.data;
};
