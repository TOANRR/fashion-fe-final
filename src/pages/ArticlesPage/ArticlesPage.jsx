import React, { useState } from 'react';
import { Layout, Pagination, Card, Row, Col, Spin } from 'antd';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import * as ArticleServices from '../../services/ArticleService'
import slider1 from '../../assets/images/sliderTT1.webp'
import slider2 from '../../assets/images/sliderTT2.webp'
import SliderComponent from '../../components/SliderComponent/SliderComponent';

const { Header, Content } = Layout;

const ArticlesPage = () => {
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
    const currentArticles = data?.slice(startIndex, startIndex + PAGE_SIZE);

    // if (isLoadingArticles) return <Spin size="large" style={{ margin: 'auto', marginTop: '50px', display: 'block' }} />;

    // Hoặc bạn có thể sử dụng styled-components để canh giữa spinner:
    const CenteredSpinner = styled(Spin)`
    margin: auto;
    margin-top: 50px;
    display: block;
`;

    // Trong component MyBlog:
    if (isLoadingArticles) return <CenteredSpinner size="large" />;
    if (isError) return <div>Error fetching data</div>;
    const truncateContent = (content) => {
        const words = content.split(' ');
        const truncatedWords = words.slice(0, 50);
        const truncatedText = truncatedWords.join(' ');

        if (words.length > 50) {
            return truncatedText + '...';
        } else {
            return truncatedText;
        }
    };
    const handleArticleClick = (articleId) => {

        window.location.href = `/articles/${articleId}`;

        // Hoặc sử dụng window.location.replace để thay đổi URL mà không tạo ra một mục trong lịch sử trình duyệt
        // window.location.replace(`/article/${articleId}`);
    };
    return (
        <div>
            <div id="container" style={{ height: '100%', width: '100%', margin: '0 auto', }}>
                <SliderComponent arrImages={[slider1, slider2]} />
            </div>
            <StyledHeader>
                <h1>TIN TỨC</h1>
            </StyledHeader>
            <div style={{ background: "#fff", paddingBottom: "50px" }}>
                <Row>
                    <Col span={18}>
                        <div style={{ marginTop: "4%", marginRight: "40px" }}>
                            <StyledWrapperArticle>
                                {currentArticles.map(article => (
                                    <StyledCard key={article.id}>
                                        <div className="article-content">
                                            <div className="article-image">
                                                <img src={article.coverImage} alt={article.title} style={{ borderRadius: '5px' }} />
                                            </div>
                                            <div className="article-text">
                                                <div style={{ fontWeight: "640", fontSize: "1.7rem", textDecoration: "none", transition: "text-decoration 0.3s", cursor: "pointer" }} onMouseEnter={(e) => { e.target.style.textDecoration = "underline" }} onMouseLeave={(e) => { e.target.style.textDecoration = "none" }} onClick={() => handleArticleClick(article._id)}>
                                                    {article.title}
                                                </div>
                                                <div style={{ fontSize: "12px", fontWeight: "400", marginTop: "10px", color: "#7F7D77" }}>
                                                    {new Date(article.createdAt).toLocaleString()}
                                                </div>
                                                <div style={{ fontSize: "15px", fontWeight: "450", color: "#7F7D77", marginTop: '20px' }}>
                                                    <div dangerouslySetInnerHTML={{ __html: truncateContent(article.content) }} />
                                                </div>

                                            </div>
                                        </div>
                                    </StyledCard>
                                ))}
                            </StyledWrapperArticle>
                            <Pagination
                                current={currentPage}
                                pageSize={PAGE_SIZE}
                                total={data.length}
                                onChange={handlePageChange}
                                style={{ textAlign: 'center', marginTop: 40 }}
                            />
                        </div>
                    </Col>
                    <Col span={6}>
                        <StyledSider>
                            <img
                                src="https://routine.vn/media/wysiwyg/Blog/Voucher-mua-sam-online-giam-gia-70K.jpg"
                                alt="Voucher"
                                width="100%"
                            />
                        </StyledSider>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ArticlesPage;

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
  margin-bottom: 20px;
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
  padding-right: 30px;
  margin-top: 5%;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;
