import React, { useState } from 'react';
import { Layout, Pagination, Card, Row, Col, Spin } from 'antd';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import * as ArticleServices from '../../services/ArticleService'
import CardArticlesComponent from '../CardArticlesComponent/CardArticlesComponent';
import CarouselArticlesComponent from '../CarouselArticlesComponent/CarouselArticlesComponent';

const { Header, Content } = Layout;

const SliderArticlesComponent = () => {




    const getAllArticle = async () => {
        const res = await ArticleServices.getAllArticles()
        // console.log('res', res)
        return res
    }
    const queryArtilces = useQuery({ queryKey: ['articles'], queryFn: getAllArticle })
    const { isLoading: isLoadingArticles, isError, data } = queryArtilces

    const CenteredSpinner = styled(Spin)`
    margin: auto;
    margin-top: 50px;
    display: block;
`;

    // Trong component MyBlog:
    if (isLoadingArticles) return <CenteredSpinner size="large" />;





    return (

        <div>
            <div style={{ marginBottom: "10px", textAlign: "center", fontSize: "20px", borderTop: "1px solid #ccc", padding: "20px" }}>Một số tin tức gần đây</div>
            <CarouselArticlesComponent articles={data} />
        </div>

    );
};

export default SliderArticlesComponent;


