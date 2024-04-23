import styled from "styled-components";
import { Upload } from 'antd';

export const WrapperStyleImageUpload = styled(Upload)`
span.ant-upload-list-item-name {
    display: none;
}
.ant-upload-list-item.ant-upload-list-item-done {
    width: 78px;
    height: 60px;
}
    
`