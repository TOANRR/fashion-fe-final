import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Layout } from 'antd';
import styled from 'styled-components';
import SliderArticlesComponent from '../../components/SliderArtilcesComponent/SliderArticlesComponent';

const { Content, Sider } = Layout;

const ArticleDetailsPage = () => {
    const [article, setArticle] = useState(null);
    const { id } = useParams(); // Lấy id từ đường link
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/article/get-article/${id}`);
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };
        fetchArticle();
    }, [id]);

    return (
        <div>
            <Layout style={{ background: "#fff", paddingBottom: "100px" }}>

                <Content style={{ marginRight: '5%', marginLeft: "5%", marginTop: "50px" }}>
                    <Breadcrumb
                        separator=">"
                        items={[
                            {
                                title: <a href="/">Trang chủ</a>,
                            },

                            {
                                title: <a href="/articles">Tin tức</a>,
                            },
                            {
                                title: <a href="#">{article?.title}</a>,
                            }


                        ]}
                        style={{ fontSize: "18px", fontWeight: "500", marginTop: "15px", marginBottom: "30px", paddingLeft: "1%" }}
                    />
                    {article ? (
                        <>
                            <ArticleTitle>{article.title}</ArticleTitle>
                            <ArticleCreatedAt>Được tạo vào lúc: {new Date(article.createdAt).toLocaleString()}</ArticleCreatedAt>
                            <CoverImage src={article.coverImage} alt="Ảnh bìa" />
                            <ArticleContent>
                                <div
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                    style={{ width: "100%", overflowWrap: "break-word" }}
                                />
                            </ArticleContent>

                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Content>
                <Sider width="25%">
                    <img
                        src="https://routine.vn/media/wysiwyg/Blog/Voucher-mua-sam-online-giam-gia-70K.jpg"
                        alt="Voucher"
                        style={{ width: "100%", position: "sticky", top: "0" }}
                    />
                </Sider>
            </Layout>
            <SliderArticlesComponent />

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
const CoverImage = styled.img`
    width: 100%;
    height: auto; /* Điều chỉnh độ cao tối đa của ảnh bìa */
    object-fit: cover;
    margin-bottom: 20px; /* Điều chỉnh khoảng cách dưới ảnh bìa */
`;


export default ArticleDetailsPage;
