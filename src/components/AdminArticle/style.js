import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 14px;
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
// Trong file styles.js hoặc bất kỳ tên nào bạn muốn
const styles = {
    coverImageContainer: {
        cursor: "pointer",
    },
    imgBefore: {
        width: '100px',
        height: '100px',
    },
    imgAfterUp: {
        width: '400px',
        height: 'auto',
    },
};

export default styles;


