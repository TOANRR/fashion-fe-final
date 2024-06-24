import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form, message, Modal, Pagination, Avatar } from 'antd';
import { useForm } from 'antd/es/form/Form';

const CommentContainer = styled.div`
  margin-bottom: 20px;
  background: #fff;
  // border-radius: 50%; /* Điều chỉnh giá trị border-radius theo ý muốn */
 
`;

const CommentContent = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 100px;
  border-radius: 20px; /* Điều chỉnh giá trị border-radius theo ý muốn */

`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 16px;
`;

const CommentText = styled.div`
  margin-bottom: 10px;
`;

const CommentActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CommentButton = styled.button`
  background-color: #1890ff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 5px;
`;

const DeleteButton = styled(CommentButton)`
  background-color: #ff4d4f;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  resize: vertical;
`;

const CommentComponentArticle = ({ articleId, author, image }) => {
    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState('');
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    // const articleId = "6655db4d61fded17dffc157c";
    // const author = '';
    // const image = '';
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(3); // Số lượng comment trên mỗi trang
    const fetchComments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/comment/${articleId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [articleId]);
    const indexOfLastComment = currentPage * pageSize;
    const indexOfFirstComment = indexOfLastComment - pageSize;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    // Chuyển đến trang mới khi người dùng chọn
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const [form] = useForm();

    const handleSubmit = async () => {
        if (newComment) {
            try {
                await form.validateFields();
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/comment`, {
                    articleId: articleId,
                    content: newComment,
                    author: author
                });
                fetchComments();
                setNewComment('');
                message.success('Comment added successfully');
            } catch (error) {
                console.error('Error creating comment:', error);
                message.error('Failed to add comment');
            }
        }

    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/comment/${id}`);
            fetchComments();
            setCurrentPage(1)
            message.success('Comment deleted successfully');
        } catch (error) {
            console.error('Error deleting comment:', error);
            message.error('Failed to delete comment');
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/comment/${id}`, {
                content: editedCommentContent
            });
            fetchComments();
            setEditingComment(null);
            setEditedCommentContent('');
            message.success('Comment edited successfully');
        } catch (error) {
            console.error('Error editing comment:', error);
            message.error('Failed to edit comment');
        }
    };

    const cancelEdit = () => {
        setEditingComment(null);
        setEditedCommentContent('');
    };

    return (
        <div style={{ borderTop: "1px solid #ccc", background: '#F9F9FC', paddingBottom: "50px" }}>
            <div style={{ width: "90%", margin: "0 auto" }}>
                <h2>Bình luận</h2>
                {
                    author && (<div>
                        <div style={{ display: 'flex' }}>
                            <Avatar src={image ? image : "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"} size={40} style={{ marginRight: '8px' }} />
                            <div style={{ flex: 1 }}>
                                <TextArea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                            </div>
                        </div>
                        <div style={{ textAlign: 'right', marginTop: '8px', marginBottom: "40px" }}>
                            <Button type="primary" onClick={handleSubmit} style={{ width: "100px", fontWeight: "600" }} >Đăng</Button>
                        </div> </div>)
                }


                {currentComments.map(comment => (
                    <div style={{ display: 'flex' }}>
                        <Avatar src={comment.author.avatar ? comment.author.avatar : "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"} size={40} style={{ marginRight: '8px' }} />
                        <div style={{ flex: 1 }}>
                            <CommentContainer key={comment._id}>
                                <CommentContent>
                                    <CommentAuthor>{comment.author.name ? comment.author.name : comment.author.email}   <span style={{ color: "#ccc", fontWeight: "400", marginLeft: "30px", fontSize: "12px" }}>{new Date(comment.createdAt).toLocaleString()}</span> {/* Hiển thị thời gian */}</CommentAuthor>

                                    {editingComment === comment._id ? (
                                        <>
                                            <TextArea value={editedCommentContent} onChange={(e) => setEditedCommentContent(e.target.value)} />
                                            <CommentButton onClick={() => handleEdit(comment._id)}><SaveOutlined /> Save</CommentButton>
                                            <CommentButton onClick={() => setEditingComment(null)}><CloseOutlined /> Cancel</CommentButton>
                                        </>
                                    ) : (
                                        <>
                                            <CommentText>{comment.content}</CommentText>
                                            <CommentActions>
                                                <div>
                                                    {comment.author._id === author && (
                                                        <>
                                                            <CommentButton onClick={() => {
                                                                setEditingComment(comment._id);
                                                                setEditedCommentContent(comment.content);
                                                            }}><EditOutlined /> Edit</CommentButton>
                                                            <DeleteButton onClick={() => {
                                                                setCommentToDelete(comment._id);
                                                                setDeleteModalVisible(true);
                                                            }}><DeleteOutlined /> Delete</DeleteButton>
                                                        </>
                                                    )}
                                                </div>
                                            </CommentActions>
                                        </>
                                    )}
                                </CommentContent>
                            </CommentContainer>
                        </div>
                    </div>

                ))}
                {
                    comments?.length ? (
                        <Pagination
                            current={currentPage}
                            total={comments.length}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                            style={{ float: 'right' }}
                        />
                    ) : (
                        <div />

                    )
                }
                {/* Delete confirmation modal */}
                <Modal
                    title="Confirm Delete"
                    visible={deleteModalVisible}
                    onOk={() => {
                        handleDelete(commentToDelete);
                        setDeleteModalVisible(false);
                    }}
                    onCancel={() => setDeleteModalVisible(false)}
                >
                    <p>Bạn có chắc muốn xóa bình luận này?</p>
                </Modal>
            </div >
        </div>

    );
};

export default CommentComponentArticle;
