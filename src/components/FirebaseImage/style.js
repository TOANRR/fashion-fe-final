import styled from 'styled-components';

export const CommentContainer = styled.div`
    margin-bottom: 20px;
`;

export const CommentContent = styled.div`
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
`;

export const CommentAuthor = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

export const CommentText = styled.div`
    color: #333;
`;

export const CommentActions = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
`;

export const DeleteButton = styled.button`
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c82333;
    }
`;

export const CommentForm = styled.form`
    margin-top: 20px;
`;

export const CommentTextArea = styled.textarea`
    width: 95%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ced4da;
    resize: none;
    margin-bottom: 10px;
`;

export const SubmitButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;
