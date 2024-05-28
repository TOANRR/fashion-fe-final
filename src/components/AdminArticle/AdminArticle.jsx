import { Button, Form, Select, Space, Switch, Tag, Upload, Row, Col, Modal, Input } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/LoadingComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import { useEffect } from 'react'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import * as ArticleServices from '../../services/ArticleService'
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from "firebase/storage";
import { storage } from '../../components/FirebaseImage/config';

import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import ReactQuill from 'react-quill';
import TableComponentProduct from '../TableComponentProduct/TableComponentProduct'
import styles from './style.js'; // Đường dẫn đến file styles.js
import './reactquill.css'

const AdminArticle = () => {
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const hiddenFileInputDetail = useRef(null);
    const [loadImageDetail, setLoadImageDetail] = useState(false)

    const [stateArticle, setStateArticle] = useState({
        title: '',
        content: '',
        author: '',
        coverImage: ''
    })
    const [stateArticleDetails, setStateArticleDetails] = useState({
        title: '',
        content: '',
        author: '',
        coverImage: ''
    });

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form2] = Form.useForm();
    const hiddenFileInput = useRef(null);
    const reactQuillRef = useRef < ReactQuill > (null);

    const [loadImage, setLoadImage] = useState(false)


    const mutation = useMutationHooks(
        (data) => {
            const { title, author, content, coverImage } = data
            const res = ArticleServices.createArticle({
                title, author, content, coverImage
            })
            return res
        }
    )

    const handleOnchangeDespcriptionAdd = (value) => {
        stateArticle.content = value
    }
    const handleOnchangeDespcription = (value) => {
        stateArticleDetails.content = value
    }
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateArticle({
            title: '',
            content: '',
            coverImage: ''

        })


        form2.resetFields()
    };
    const onFinishmodal = () => {
        const params = {
            title: stateArticle.title,
            content: stateArticle.content,
            author: user?.id,
            coverImage: stateArticle.coverImage,


        }
        console.log(params)
        mutation.mutate(params, {
            onSettled: () => {
                queryArtilces.refetch()
            }
        })
    }
    const handleOnchange = (e) => {
        setStateArticle({
            ...stateArticle,
            [e.target.name]: e.target.value
        })
    }
    const handleClickDetail = (event) => {
        hiddenFileInputDetail.current.click();
    };
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    const handleImageChange = async (event) => {
        console.log(event.target.files)
        if (event.target.files) {
            setLoadImage(true)
            console.log("load", loadImage)
            // Upload each image to Firebase Storage

            const image = event.target.files[0];
            const storageRef = ref(storage, `articles/${image.name}`);
            await uploadBytes(storageRef, image);
            // Get the download URL of the uploaded image
            const downloadURL = await getDownloadURL(storageRef);
            stateArticle.coverImage = downloadURL;


            setLoadImage(false)
        }



    };
    const handleImageChangeDetail = async (event) => {
        console.log(event.target.files)

        if (event.target.files) {
            console.log("dang update")
            setLoadImageDetail(true)
            console.log("loading up", loadImageDetail)

            // Upload each image to Firebase Storage

            const image = event.target.files[0];
            const storageRef = ref(storage, `article/${image.name}`);
            await uploadBytes(storageRef, image);
            // Get the download URL of the uploaded image
            const downloadURL = await getDownloadURL(storageRef);
            stateArticleDetails.coverImage = downloadURL;


            setLoadImageDetail(false)
        }



    };
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = ArticleServices.updateArticle(
                id,
                { ...rests }, token)
            return res
        },
    )

    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = ArticleServices.deleteArticle(
                id,
                token)
            return res
        },
    )
    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = UserService.deleteManyUser(
                ids,
                token)
            return res
        },
    )

    const handleDelteManyArticles = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryArtilces.refetch()
            }
        })
    }

    const getAllArticle = async () => {
        const res = await ArticleServices.getAllArticles()
        console.log('res', res)
        return res
    }

    const fetchGetDetailsArticle = async (rowSelected) => {
        const res = await ArticleServices.getArticleById(rowSelected)
        console.log(res)
        if (res) {
            setStateArticleDetails({
                title: res?.title,
                content: res?.content,
                author: res?.author,
                coverImage: res?.coverImage
            })

        }

    }



    useEffect(() => {
        form.setFieldsValue(stateArticleDetails)
    }, [form, stateArticleDetails])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsArticle(rowSelected)
            setIsLoadingUpdate(false)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }
    const { data, isPending, isSuccess, isError } = mutation

    const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany
    useEffect(() => {
        if (isSuccess && data?.success === true) {
            message.success("Thêm mới thành công")
            handleCancel()
        } else if (isSuccess && data?.status != true) {
            message.error("Có lỗi xảy ra")
        }
    }, [isSuccess])

    const queryArtilces = useQuery({ queryKey: ['articles'], queryFn: getAllArticle })
    const { isLoading: isLoadingArticles, data: articles } = queryArtilces
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'black', fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'black', fontSize: '20px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     <Highlighter
        //       highlightStyle={{
        //         backgroundColor: '#ffc069',
        //         padding: 0,
        //       }}
        //       searchWords={[searchText]}
        //       autoEscape
        //       textToHighlight={text ? text.toString() : ''}
        //     />
        //   ) : (
        //     text
        //   ),
    });
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = dateTime.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
        const day = dateTime.getDate();
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const seconds = dateTime.getSeconds();

        // Định dạng lại thành chuỗi ngày giờ
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours}:${minutes}:${seconds}`;
    };
    const [columns, setColumns] = useState([
        {
            title: 'STT',
            dataIndex: 'index',
            rowScope: 'row',
            fixed: 'left',
            width: 60,
        },
        {
            key: 'title',
            title: 'Tiêu đề',
            dataIndex: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
            ...getColumnSearchProps('title'),
            fixed: 'left',
            width: 180
        },
        {
            key: 'author',
            title: 'Người đăng',
            dataIndex: 'author',
            sorter: (a, b) => a.author.name.localeCompare(b.author.name),
            ...getColumnSearchProps('author'),
            width: 150,
            fixed: 'left',
            render: (author) => author?.name || author?.email, // Hiển thị tên của tác giả hoặc 'Unknown' nếu không có tên

        },
        {
            key: 'content',
            title: 'Nội dung',
            dataIndex: 'content',
            render: (content) => {
                if (content.length > 300) {
                    const truncatedContent = `${content.substring(0, 300)}...`;
                    return <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />;
                }
                return <div dangerouslySetInnerHTML={{ __html: content }} />;
            },
            width: 400,
        },
        {
            key: 'coverImage',
            title: 'Ảnh bìa',
            dataIndex: 'coverImage',
            render: (coverImage) => (
                <img src={coverImage} alt="Cover" style={{ width: 'auto', height: '100px', borderRadius: '5%' }} />
            ),
            width: 200,
        },

        {
            key: 'date',
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (text) => <span>{formatDateTime(text)}</span>,
            width: 180,
        },
        {
            key: 'action',
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
            width: 80,
            fixed: 'right'
        },
    ]);
    const handleToggleColumn = (checked, columnName) => {
        setColumns((prevColumns) =>
            prevColumns.map((column) =>
                column.key === columnName ? { ...column, hidden: !checked } : column
            )
        );
    };
    const dataTable = articles?.length && articles?.map((article, index) => {
        console.log(article)
        return { ...article, key: article._id, index: index + 1 }
    })

    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.success === true) {
            message.success("Xóa bài viết thành công")
            handleCancelDelete()
        } else if (isSuccessDelected && dataDeleted?.success != true) {
            message.error(dataDeleted?.message)
        }
    }, [isSuccessDelected])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateArticleDetails({
            title: '',
            author: '',
            content: '',
            coverImage: ''
        })
        form.resetFields()
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.success === true) {
            message.success("Cập nhật bài viết thành thành công")
            handleCloseDrawer()
        } else if (isSuccessUpdated && dataUpdated?.success != true) {
            message.error("có lỗi xảy ra")
        }
    }, [isSuccessUpdated])

    useEffect(() => {
        if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
            message.success("xóa thành công")
        } else if (dataDeletedMany?.status === 'ERR') {
            message.error(dataDeletedMany?.message)
        }
    }, [isSuccessDelectedMany])

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteArticle = () => {
        mutationDeleted.mutate({ id: rowSelected }, {
            onSettled: () => {
                queryArtilces.refetch()
            }
        })
    }

    const handleOnchangeDetails = (e) => {
        setStateArticleDetails({
            ...stateArticleDetails,
            [e.target.name]: e.target.value
        })
    }



    const onUpdateArticles = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateArticleDetails }, {
            onSettled: () => {
                queryArtilces.refetch()
            }
        })
    }
    const handleChange = (value) => {
        // Cập nhật giá trị isAdmin trong stateUserDetails
        setStateArticleDetails({ ...stateArticleDetails });
    };

    return (
        <div>
            <WrapperHeader>Quản lý bài đăng</WrapperHeader>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Tạo bài đăng mới
            </Button>
            <div style={{ marginTop: '20px', width: "100%" }}>
                <div style={{ marginBottom: 16, fontSize: "10px" }}>
                    {columns.map((column, index) => (
                        <span key={index} style={{ marginLeft: 8 }}>
                            {column.title}{' '}
                            <Switch
                                onChange={(checked) => handleToggleColumn(checked, column.key)}
                                checked={!column.hidden}
                                size="small"
                            />
                        </span>
                    ))}
                </div>
                <TableComponentProduct style={{ width: '1000px' }} columns={columns.filter((column) => !column.hidden)} isLoading={isLoadingArticles} data={dataTable} scroll={{ x: 800 }} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    };
                }} />
            </div>
            <ModalComponent title="Tạo bài viết" open={isModalOpen} onCancel={handleCancel} footer={null} width={1200} height={1000}>
                <Loading isLoading={isPending}>

                    <Form
                        name="basic2"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 30 }}
                        onFinish={onFinishmodal}
                        autoComplete="on"
                        form={form2}
                    >

                        <Form.Item
                            label="Tiêu đề"
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài viết !' }]}
                        >
                            <InputComponent value={stateArticle.title} onChange={handleOnchange} name="title" />
                        </Form.Item>




                        <Form.Item
                            label="Ảnh bìa"
                            name="coverImage"
                        // rules={[{ required: true, message: 'Please input 4 images!' }]}
                        >
                            <Loading isLoading={loadImage}>
                                <div onClick={handleClick} style={styles.coverImageContainer} name="coverImage">
                                    {stateArticle.coverImage ? (
                                        <img src={stateArticle.coverImage} alt="upload image" style={styles.imgAfterUp} />
                                    ) : (
                                        <img src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" style={styles.imgBefore} />
                                    )}
                                    <input
                                        id="image-upload-input"
                                        type="file"
                                        ref={hiddenFileInput}
                                        onChange={(event) => handleImageChange(event)}
                                        style={{ display: "none" }}
                                    />
                                </div>
                            </Loading>


                        </Form.Item>



                        <Form.Item
                            label="Nội dung"
                            name="content"
                            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                        >
                            <ReactQuill
                                ref={reactQuillRef}
                                placeholder="Start writing..."
                                modules={{
                                    toolbar: {
                                        container: [
                                            [{ header: "1" }, { header: "2" }, { font: [] }],
                                            [{ size: [] }],
                                            ["bold", "italic", "underline", "strike", "blockquote"],
                                            [
                                                { list: "ordered" },
                                                { list: "bullet" },
                                                { indent: "-1" },
                                                { indent: "+1" },
                                            ],
                                            ["link", "image", "video"],
                                            ["code-block"],
                                            ["clean"],
                                            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]
                                        ],
                                    },
                                    clipboard: {
                                        matchVisual: false,
                                    },
                                }}
                                formats={[
                                    "header",
                                    "font",
                                    "size",
                                    "bold",
                                    "italic",
                                    "underline",
                                    "strike",
                                    "blockquote",
                                    "list",
                                    "bullet",
                                    "indent",
                                    "link",
                                    "image",
                                    "video",
                                    "code-block",
                                    "align"
                                ]}
                                value={stateArticle.content}
                                onChange={handleOnchangeDespcriptionAdd}
                            />

                        </Form.Item>












                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button style={{ backgroundColor: "#000000", color: "#fff" }} htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>
            <DrawerComponent title='Chi tiết bài báo' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="95%" forceRender={true}>
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 30 }}
                        onFinish={onUpdateArticles}
                        autoComplete="on"
                        form={form}
                    >

                        <Form.Item
                            label="Tiêu đề"
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài viết !' }]}
                        >
                            <InputComponent value={stateArticleDetails.title} onChange={handleOnchangeDetails} name="title" />
                        </Form.Item>




                        <Form.Item
                            label="Ảnh bìa"
                            name="coverImage"
                        // rules={[{ required: true, message: 'Please input 4 images!' }]}
                        >
                            <Loading isLoading={loadImageDetail}>
                                <div onClick={handleClickDetail} style={{ cursor: "pointer" }} name="coverImage">
                                    {stateArticleDetails.coverImage ? (
                                        <img src={stateArticleDetails.coverImage} alt="upload image" style={styles.imgAfterUp} />
                                    ) : (
                                        <img src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" style={styles.imgBefore} />
                                    )}
                                    <input
                                        id="image-upload"
                                        type="file"
                                        ref={hiddenFileInputDetail}
                                        onChange={(event) => handleImageChangeDetail(event)}
                                        style={{ display: "none" }}
                                    />
                                </div>

                            </Loading>


                        </Form.Item>



                        <Form.Item
                            label="Nội dung"
                            name="content"
                            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                        >
                            <ReactQuill
                                ref={reactQuillRef}
                                placeholder="Start writing..."
                                modules={{
                                    toolbar: {
                                        container: [
                                            [{ header: "1" }, { header: "2" }, { font: [] }],
                                            [{ size: [] }],
                                            ["bold", "italic", "underline", "strike", "blockquote"],
                                            [
                                                { list: "ordered" },
                                                { list: "bullet" },
                                                { indent: "-1" },
                                                { indent: "+1" },
                                            ],
                                            ["link", "image", "video"],
                                            ["code-block"],
                                            ["clean"],
                                            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]
                                        ],
                                    },
                                    clipboard: {
                                        matchVisual: false,
                                    },
                                }}
                                formats={[
                                    "header",
                                    "font",
                                    "size",
                                    "bold",
                                    "italic",
                                    "underline",
                                    "strike",
                                    "blockquote",
                                    "list",
                                    "bullet",
                                    "indent",
                                    "link",
                                    "image",
                                    "video",
                                    "code-block",
                                    "align",
                                ]}
                                value={stateArticleDetails.content}
                                onChange={handleOnchangeDespcription}
                            />

                        </Form.Item>












                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button style={{ backgroundColor: "#000000", color: "#fff" }} htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xóa bài viết" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteArticle} forceRender={true}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa tài khoản này không?</div>
                </Loading>
            </ModalComponent>
        </div >
    )
}

export default AdminArticle