import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Switch, Table } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/LoadingComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import { convertPrice, getBase64 } from '../../utils'
import { useEffect } from 'react'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as OrderServices from '../../services/OrderService'
import * as UserService from '../../services/UserService'
import moment from 'moment';

import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CloseCircleOutlined } from '@ant-design/icons'
const { Option } = Select;
const initialOrderState = {
    orderItems: [],
    shippingAddress: {
        fullName: '',
        address: '',
        city: '',
        district: '',
        ward: '',
        phone: '',
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    delivery: '',
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: null,
    deliveryStatus: 'not_delivered',
    deliveredAt: null,
    isCancel: false,
};

const AdminOrder = () => {
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchRange, setSearchRange] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false)
    const [stateOrderDetails, setStateOrderDetails] = useState(initialOrderState);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const [form] = Form.useForm();

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                access_token,

                ...rests } = data
            const res = OrderServices.updateOrder(
                id,
                access_token,
                { ...rests })
            return res
        },
    )

    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                access_token,
            } = data
            const res = OrderServices.deleteOrder(
                id,
                access_token)
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

    const handleDelteManyOrders = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryOrder.refetch()
            }
        })
    }


    const getAllOrder = async (start, end) => {
        const res = await OrderServices.getAllOrderByTime(user.access_token, start, end);
        return res;
    }

    const fetchGetDetailsOrder = async (rowSelected) => {
        const res = await OrderServices.getDetailsOrder(rowSelected, user?.access_token)
        if (res?.data) {
            setStateOrderDetails(res.data);
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsOrder(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsOrder = () => {
        setIsOpenDrawer(true)
    }

    const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    // const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

    const queryOrder = useQuery({
        queryKey: ['orders'],
        queryFn: () => getAllOrder(start, end) // Thêm start và end vào đây
    }); const { isLoading: isLoadingOrder, data: orders } = queryOrder
    const [dataTable, setTable] = useState()
    useEffect(() => {
        if (orders?.data) {
            setTable(orders.data.map((order) => {
                return {
                    ...order,
                    key: order._id,
                    fullname: order.shippingAddress.fullName,
                    address: order.shippingAddress.address + ', ' + order.shippingAddress.city + ', ' + order.shippingAddress.district + ', ' + order.shippingAddress.ward + ', sđt: ' + order.shippingAddress.phone
                };
            }));
        }
    }, [orders]);
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'black', fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'black', fontSize: '20px', cursor: 'pointer' }} onClick={handleDetailsOrder} />
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();

    };
    const handleReset = (clearFilters) => {
        clearFilters();

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

    });

    const [columns, setColumns] = useState([

        {
            title: 'Người dùng',
            dataIndex: 'fullname',
            key: 'user',
            width: 150,
            fixed: "left",
            sorter: (a, b) => a.fullname.length - b.fullname.length,
            ...getColumnSearchProps('fullname'),

        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 300,
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address'),

        },

        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            width: 150,
            key: 'totalPrice',
            render: (text) => <span>{convertPrice(text)}</span>,
        },
        {
            title: 'Phương thức',
            dataIndex: 'paymentMethod',
            width: 150,
            key: 'paymentMethod',
            render: (paymentMethod) => {
                let text = '';
                switch (paymentMethod) {
                    case 'vnpay':
                        text = 'vnpay';
                        break;
                    case 'later_money':
                        text = 'Trả sau';
                        break;
                    case 'paypal':
                        text = 'Paypal';
                        break;
                    default:
                        break;
                }
                return text;
            },
            filters: [
                {
                    text: 'VNPAY',
                    value: 'vnpay',
                },
                {
                    text: 'Trả sau',
                    value: 'later_money',
                },
                {
                    text: 'Paypal',
                    value: 'paypal',
                }
            ],
            onFilter: (value, record) => {
                // console.log('value', value, record)
                if (value === 'paypal') {
                    return record.paymentMethod === 'paypal'
                } else if (value === 'later_money') {
                    return record.paymentMethod === 'later_money'
                } else if (value === 'vnpay') {
                    return record.paymentMethod === 'vnpay'
                }
            },
        },
        {
            title: 'Thanh toán',
            dataIndex: 'isPaid',
            key: 'status',
            width: 150,
            render: (isPaid) => (isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'),
            filters: [
                {
                    text: 'Đã thanh toán',
                    value: true,
                },
                {
                    text: 'Chưa thanh toán',
                    value: false,
                }

            ],
            onFilter: (value, record) => {
                // console.log('value', value, record)
                if (value === true) {
                    return record.isPaid === true
                } else if (value === false) {
                    return record.isPaid === false
                }
            },
        }, {
            title: 'Đơn vị Ship',
            dataIndex: 'delivery',
            width: 150,
            key: 'delivery',
        },

        {
            title: ' Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 160,
            render: (createdAt) => new Date(createdAt).toLocaleString(),
        },
        {
            title: 'Payment At',
            dataIndex: 'paidAt',
            key: 'paidAt',
            width: 160,
            render: (paidAt) => (paidAt ? new Date(paidAt).toLocaleString() : 'Not paid'),
        },
        {
            title: 'Vận chuyển',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            width: 150,
            render: (deliveryStatus) => {
                let text = '';
                switch (deliveryStatus) {
                    case 'not_delivered':
                        text = 'Chưa vận chuyển';
                        break;
                    case 'delivering':
                        text = 'Đang vận chuyển';
                        break;
                    case 'delivered':
                        text = 'Đã vận chuyển';
                        break;
                    default:
                        break;
                }
                return text;
            },
            filters: [
                {
                    text: 'Đã vận chuyển',
                    value: 'delivered',
                },
                {
                    text: 'Chưa vận chuyển',
                    value: 'not_delivered',
                },
                {
                    text: 'Đang vận chuyển',
                    value: 'delivering',
                }

            ],
            onFilter: (value, record) => {
                // console.log('value', value, record)
                if (value === 'delivering') {
                    return record.deliveryStatus === 'delivering'
                } else if (value === 'not_delivered') {
                    return record.deliveryStatus === 'not_delivered'
                } else if (value === 'delivered') {
                    return record.deliveryStatus === 'delivered'
                }
            },

        },
        {
            title: 'Bị hủy',
            dataIndex: 'isCancel',
            key: 'isCancel',
            width: 150,
            render: (isCancel) => (isCancel ? 'Đã hủy' : 'Bình thường'),
            filters: [
                {
                    text: 'Bị hủy',
                    value: true,
                },
                {
                    text: 'Bình thường',
                    value: false,
                }

            ],
            onFilter: (value, record) => {
                // console.log('value', value, record)
                if (value === true) {
                    return record.isCancel === true
                } else if (value === false) {
                    return record.isCancel === false
                }
            },
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


    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.status === 'OK') {
            message.success("Xóa đơn hàng thành công")
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDelected])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateOrderDetails(initialOrderState)
        form.resetFields()
    };

    // useEffect(() => {
    //     if (isSuccessUpdated && dataUpdated?.status === 'OK') {
    //         message.success("Cập nhật người dùng thành công")
    //         handleCloseDrawer()
    //     } else if (isErrorUpdated) {
    //         message.error()
    //     }
    // }, [isSuccessUpdated])

    // useEffect(() => {
    //     if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
    //         message.success()
    //     } else if (isErrorDeletedMany) {
    //         message.error()
    //     }
    // }, [isSuccessDelectedMany])

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteOrder = () => {
        mutationDeleted.mutate({ id: rowSelected, access_token: user?.access_token }, {
            onSettled: () => {
                queryOrder.refetch()
            }
        })
    }






    const columnsDetail = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} alt="product" style={{ maxWidth: '100px' }} />,
        },
    ];

    const handlePaymentStatusChange = (value) => {
        // console.log(value)
        // setStateOrderDetails({ ...stateOrderDetails, isPaid: value });
        if (value === true) {
            const currentDate = new Date();

            console.log(currentDate);
            setStateOrderDetails({ ...stateOrderDetails, isPaid: true, paidAt: new Date() });
        }
        else
            setStateOrderDetails({ ...stateOrderDetails, isPaid: false, paidAt: '' });
    };

    const handleDeliveryStatusChange = (value) => {
        // setStateOrderDetails({ ...stateOrderDetails, deliveryStatus: value });
        if (value === 'delivering' || value === 'delivered') {
            const currentDate = new Date();

            console.log(currentDate);
            setStateOrderDetails({ ...stateOrderDetails, deliveryStatus: value, deliveredAt: new Date() });
        }
        else {
            setStateOrderDetails({ ...stateOrderDetails, deliveryStatus: value, deliveredAt: '' });
        }
    };
    const handleCancelOrder = () => {

    }
    const onUpdateOrder = async () => {

        mutationUpdate.mutate({ id: rowSelected, access_token: user?.access_token, ...stateOrderDetails }, {
            onSettled: () => {
                queryOrder.refetch()
            }
        })

    }
    const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate

    useEffect(() => {
        queryOrder.refetch();
    }, [start, end])
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.message === 'OK') {
            message.success("update trạng thái thành công")
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])
    const handleSearchOrder = async () => {
        if (searchRange.length !== 2) {
            message.error("Please select a search range");
            return;
        }

        setStart(searchRange[0].startOf('day').toISOString());
        setEnd(searchRange[1].endOf('day').toISOString());

    }

    const handleResetSearch = async () => {
        setSearchRange([]);
        setStart('');
        setEnd('');
        queryOrder.refetch();

    }
    return (
        <div>
            <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
            <Row gutter={[20, 20]}>
                <Col span={12}>
                    <DatePicker.RangePicker
                        style={{ width: '100%' }}
                        onChange={(dates) => setSearchRange(dates)}
                        value={searchRange}
                        allowClear={false}
                    />
                </Col>
                <Col span={12}>
                    <Button type="primary" onClick={handleSearchOrder} icon={<SearchOutlined />}>
                        Tìm kiếm
                    </Button>
                    <Button style={{ marginLeft: '20px', backgroundColor: 'red', color: '#fff' }} onClick={handleResetSearch} icon={<CloseCircleOutlined />}>
                        Reset
                    </Button>
                </Col>

            </Row>
            <div style={{ marginTop: '20px', width: "100%" }}>
                <div style={{ marginBottom: 16, fontSize: "10px" }}>

                    {columns.map((column) => (
                        <span key={column.key} style={{ marginLeft: 8 }}>
                            {column.title}{' '}
                            <Switch
                                onChange={(checked) => handleToggleColumn(checked, column.key)}
                                checked={!column.hidden}
                                size="small"
                            />
                        </span>
                    ))}
                </div>
                <TableComponent style={{ width: '1000px' }} handleDelteMany={handleDelteManyOrders} columns={columns.filter((column) => !column.hidden)} isLoading={isLoadingOrder || loadingTable} data={dataTable} scroll={{ x: 800 }} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    };
                }} />
            </div>
            <DrawerComponent title='Chi tiết đơn hàng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="80%" forceRender={true}>
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateOrder}
                        autoComplete="on"
                        form={form}
                    >


                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Khách hàng" labelCol={{ span: 4 }}>
                                    <Input value={stateOrderDetails.shippingAddress.fullName} disabled />
                                </Form.Item>
                                <Form.Item label="Địa chỉ giao hàng" labelCol={{ span: 6 }}>
                                    <Input value={stateOrderDetails.shippingAddress.address} disabled />
                                </Form.Item>
                                <Form.Item label="Phương thức giao hàng" labelCol={{ span: 8 }}>
                                    <Input value={stateOrderDetails.delivery} disabled />
                                </Form.Item>
                                <Form.Item label="Phương thức thanh toán" labelCol={{ span: 8 }}>
                                    <Input value={stateOrderDetails.paymentMethod} disabled />
                                </Form.Item>
                                <Form.Item label="Tổng giá tiền" labelCol={{ span: 5 }}>
                                    <Input value={stateOrderDetails.totalPrice} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Trạng thái thanh toán" labelCol={{ span: 7 }}>
                                    <Select value={stateOrderDetails.isPaid} disabled={stateOrderDetails.isCancel} onChange={handlePaymentStatusChange} >
                                        <Option value={false}>Chưa thanh toán</Option>
                                        <Option value={true}>Đã thanh toán</Option>
                                    </Select>
                                </Form.Item>
                                {stateOrderDetails.isPaid === true && (
                                    <Form.Item label="Thời gian thanh toán" labelCol={{ span: 7 }}>
                                        <DatePicker value={moment(stateOrderDetails.paidAt)} showTime={{ format: 'HH:mm:ss' }}
                                            format="YYYY-MM-DD HH:mm:ss" disabled />
                                    </Form.Item>
                                )}
                                <Form.Item label="Trạng thái đơn hàng" labelCol={{ span: 7 }}>
                                    <Select value={stateOrderDetails.deliveryStatus} disabled={stateOrderDetails.isCancel} onChange={handleDeliveryStatusChange} >
                                        <Option value="not_delivered">Chưa vận chuyển</Option>
                                        <Option value="delivering">Đang vận chuyển</Option>
                                        <Option value="delivered">Đã vận chuyển</Option>
                                    </Select>
                                </Form.Item>
                                {(stateOrderDetails.deliveryStatus === 'delivering' || stateOrderDetails.deliveryStatus === 'delivered') && (
                                    <Form.Item label="Thời gian giao hàng" labelCol={{ span: 7 }}>
                                        <DatePicker value={moment(stateOrderDetails.deliveredAt)} showTime={{ format: 'HH:mm:ss' }}
                                            format="YYYY-MM-DD HH:mm:ss" disabled />
                                    </Form.Item>
                                )}
                                {stateOrderDetails.isCancel && (
                                    <Form.Item label="Đã bị hủy" labelCol={{ span: 4 }}>
                                        <CloseCircleOutlined style={{ color: 'red' }} />
                                    </Form.Item>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Table
                                    columns={columnsDetail}
                                    dataSource={stateOrderDetails.orderItems}
                                    pagination={false}
                                    bordered
                                />
                            </Col>
                        </Row>



                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <div style={{ display: "flex", marginTop: "50px", marginRight: "50px" }}>
                                <Button style={{ backgroundColor: "#000000", color: "#fff" }} disabled={stateOrderDetails.isCancel} htmlType="submit">
                                    Cập nhật
                                </Button>
                                {/* <Button
                                    style={{ backgroundColor: 'red', color: '#fff' }}
                                    onClick={handleCancelOrder}
                                    disabled={stateOrderDetails.isCancel}
                                >
                                    Hủy đơn hàng
                                </Button> */}
                            </div>

                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            < ModalComponent title="Xóa đơn hàng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteOrder} forceRender={true} >
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa đơn hàng này không?</div>
                </Loading>
            </ModalComponent >
        </div >
    )
}

export default AdminOrder