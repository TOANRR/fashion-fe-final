import React, { useState } from 'react';
import { Layout, Pagination, Card, Row, Col } from 'antd';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import * as ArticleServices from '../../services/ArticleService'
import CardArticlesComponent from '../CardArticlesComponent/CardArticlesComponent';
import CarouselArticlesComponent from '../CarouselArticlesComponent/CarouselArticlesComponent';

const { Header, Content } = Layout;

const MyBlog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 2;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const getAllArticle = async () => {
    const res = await ArticleServices.getAllArticles()
    console.log('res', res)
    return res
  }
  const queryArtilces = useQuery({ queryKey: ['articles'], queryFn: getAllArticle })
  const { isLoading: isLoadingArticles, isError, data } = queryArtilces




  const startIndex = (currentPage - 1) * PAGE_SIZE;



  return (

    <div>
      <CarouselArticlesComponent articles={data} />
    </div>

  );
};

export default MyBlog;

const StyledHeader = styled(Header)`
  background: #000000;
  padding: 0;
  h1 {
    color: white;
    text-align: center;
    margin: 0;
    line-height: 64px;
  }
`;

const StyledWrapperArticle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

const StyledCard = styled.div`
  margin-top: 20px;
  padding-left: 30px;
  display: flex;
  .article-content {
    display: flex;
    width: 100%;
  }
  .article-image {
    flex: 1;
    overflow: hidden;
  }
  .article-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .article-text {
    margin-left:30px;
    flex: 2;
  }
  .article-text h2 {
  }
`;

const StyledSider = styled(Col)`
  background: #fff;
  padding-right: 50px;
  margin-top: 5%;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;
