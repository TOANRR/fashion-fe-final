import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import { WrapperStyleImageUpload } from './style';
import axios from 'axios';
import { Button } from 'antd';
const UploadImageComponent = () => {
    const [fileList, setFileList] = useState([]);
    const onChange = async ({ fileList: newFileList }) => {
        setFileList(newFileList);

        // if (fileList[0]) {
        //     console.log("file", fileList)
        //     const res = await axios.post(`http://127.0.0.1:5000`, {
        //         query_img: fileList[0]?.thumbUrl
        //     }

        //     )
        //     console.log("respone", res)

        // }





    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    return (
        <ImgCrop rotationSlider>
            <WrapperStyleImageUpload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                fileList={fileList}
                onChange={onChange}
                maxCount={1}
                onPreview={onPreview}
            >
                {fileList.length < 1 && <span style={{ paddingTop: "6px" }}>Upload</span>}
            </WrapperStyleImageUpload>
        </ImgCrop>


    );
};
export default UploadImageComponent;