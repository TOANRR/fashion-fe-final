import { Button, Form, Select, Space, Switch, Tag, Upload, Row, Col, Modal, Input } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
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
import TableArticleComponent from '../TableArticleComponent/TableArticleComponent.jsx'

const AdminComment = () => {
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);


    const [form] = Form.useForm();












    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = ArticleServices.deleteComment(
                id,
                token)
            return res
        },
    )




    const getAllComment = async () => {
        const res = await ArticleServices.getAllComment(user?.access_token)
        console.log('res', res)
        return res
    }

    const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted


    const queryComments = useQuery({ queryKey: ['comments'], queryFn: getAllComment })
    const { isLoading: isLoadingArticles, data: comments } = queryComments
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'black', fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
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
            key: 'author',
            title: 'Người đăng',
            dataIndex: 'author',
            sorter: (a, b) => a.author.name.localeCompare(b.author.name),
            ...getColumnSearchProps('author'),
            width: 200,
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
            ...getColumnSearchProps('content'),

        },
        {
            key: 'article',
            title: 'Bài đăng', // Tiêu đề của cột
            dataIndex: 'articleId', // Trường dữ liệu tương ứng trong dữ liệu của mỗi hàng

            // Sử dụng thuộc tính render để tùy chỉnh cách hiển thị nội dung trong cột
            render: (text, record) => (
                <a href={`${process.env.REACT_APP_URL}/articles/${record.articleId._id}`} target="_blank" rel="noopener noreferrer">
                    {record.articleId.title}
                </a>
            ),

            width: 220, // Độ rộng của cột


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
    const dataTable = comments?.length && comments?.map((comment, index) => {
        return { ...comment, key: comment._id, index: index + 1 }
    })

    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.success === true) {
            message.success("Xóa bình luận thành công")
            handleCancelDelete()
        } else if (isSuccessDelected && dataDeleted?.success != true) {
            message.error(dataDeleted?.message)
        }
    }, [isSuccessDelected])






    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteComment = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryComments.refetch()
            }
        })
    }








    return (
        <div>
            <WrapperHeader>Quản lý bình luận của bài báo</WrapperHeader>

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
                <TableArticleComponent style={{ width: '1000px' }} columns={columns.filter((column) => !column.hidden)} isLoading={isLoadingArticles} data={dataTable} scroll={{ x: 800 }} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    };
                }} />
            </div>


            <ModalComponent title="Xóa bình luận" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteComment} forceRender={true}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa bình luận này không?</div>
                </Loading>
            </ModalComponent>
        </div >
    )
}

export default AdminComment