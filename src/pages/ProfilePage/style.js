import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 18px;
    margin: 4px 0;
`
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    height: 57vh;
    border: 1px solid #ccc;
    width: 600px;
    margin: 0 auto;
    margin-top: 30px;
    padding: 50px;
    border-radius: 10px;
    gap: 30px;
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 12px;
    line-height: 30px;
    font-weight: 600;
    width: 80px;
    text-align: left;
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: cemter;
    gap: 20px;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-name {
        display: none
    }
    & .ant-upload-list-item .anticon svg {
        display: none;
    }
`