import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';
import CardComponent from '../CardComponent/CardComponent';

const { Content, Sider } = Layout;

const ArticlePage = () => {
    const [article, setArticle] = useState(null);
    const { id } = useParams(); // Lấy id từ đường link
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/article/get-article/${id}`);
                console.log(response.data)
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };
        fetchArticle();
    }, [id]);

    return (
        <div>
            {/* <CardComponent /> */}
        </div>
    );
};

const ArticleContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
`;

const ArticleTitle = styled.h1`
    color: #555;
    text-align: center;
`;

const ArticleCreatedAt = styled.div`
    color: #888;
    text-align: center;
    margin-bottom: 20px;
`;

const ArticleContent = styled.div`
    border-top: 1px solid #ccc;
    padding-top: 20px;
`;

export default ArticlePage;
