import { Button, Form, Select, Space, Switch } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/LoadingComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import { getBase64 } from '../../utils'
import { useEffect } from 'react'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
const { Option } = Select;

const AdminUser = () => {
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const [stateUser, setStateUser] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    address: '',
    avatar: ''
  })
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    address: '',
    avatar: ''

  })

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = UserService.updateUser(
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
      const res = UserService.deleteUser(
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

  const handleDelteManyUsers = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user.access_token)
    console.log('res', res)
    return res
  }

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailUser(rowSelected, user?.access_token)
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        address: res?.data?.address,
        isAdmin: res?.data?.isAdmin,
        avatar: res?.data?.avatar
      })
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsUser(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true)
  }

  const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

  const queryUser = useQuery({ queryKey: ['users'], queryFn: getAllUsers })
  const { isLoading: isLoadingUsers, data: users } = queryUser
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
      key: 'name',
      title: 'Tên',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
      fixed: 'left',
      width: 180
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email'),
      width: 250,
      fixed: 'left',
    },
    {
      key: 'isAdmin',
      title: 'Admin',
      dataIndex: 'isAdmin',
      filters: [
        {
          text: 'TRUE',
          value: 'TRUE',
        },
        {
          text: 'FALSE',
          value: 'FALSE',
        }
      ],
      onFilter: (value, record) => {
        console.log('value', value, record)
        if (value === 'TRUE') {
          return record.isAdmin === 'TRUE'
        } else if (value === 'FALSE') {
          return record.isAdmin === 'FALSE'
        }
      },
      width: 100
    },
    {
      key: 'phone',
      title: 'Điện Thoại',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps('phone'),
      width: 150
    },
    {
      key: 'address',
      title: 'Địa chỉ',
      dataIndex: 'address',
      width: 300
    },
    {
      key: 'city',
      title: 'Tỉnh/Thành Phố',
      dataIndex: 'city',
      sorter: (a, b) => a.city?.length - b.city?.length,
      ...getColumnSearchProps('city'),
      width: 150
    },
    {
      key: 'district',
      title: 'Quận/huyện',
      dataIndex: 'district',
      sorter: (a, b) => a.city?.length - b.city?.length,
      ...getColumnSearchProps('district'),
      width: 150
    },
    {
      key: 'ward',
      title: 'Phường/Xã',
      dataIndex: 'ward',
      sorter: (a, b) => a.city?.length - b.city?.length,
      ...getColumnSearchProps('ward'),
      width: 150
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
  const dataTable = users?.data?.length && users?.data?.map((user) => {
    return { ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' }
  })

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === 'OK') {
      message.success("Xóa người dùng thành công")
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDelected])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      address: '',
      isAdmin: false,
      avatar: ''
    })
    form.resetFields()
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success("Cập nhật người dùng thành công")
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated])

  useEffect(() => {
    if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
      message.success()
    } else if (isErrorDeletedMany) {
      message.error()
    }
  }, [isSuccessDelectedMany])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const handleDeleteUser = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      image: file.preview
    })
  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      image: file.preview
    })
  }
  const onUpdateUser = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetails }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }
  const handleChange = (value) => {
    // Cập nhật giá trị isAdmin trong stateUserDetails
    setStateUserDetails({ ...stateUserDetails, isAdmin: value });
  };

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
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
        <TableComponent style={{ width: '1000px' }} handleDelteMany={handleDelteManyUsers} columns={columns.filter((column) => !column.hidden)} isLoading={isLoadingUsers} data={dataTable} scroll={{ x: 800 }} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
      <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="60%" forceRender={true}>
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên"
              name="name"

            >
              <InputComponent value={stateUserDetails.name} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <InputComponent value={stateUserDetails['email']} onChange={handleOnchangeDetails} name="email" disabled />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: false }]}
            >
              <InputComponent value={stateUserDetails['address']} onChange={handleOnchangeDetails} name="address" disabled />
            </Form.Item>
            <Form.Item
              label="SĐT"
              name="phone"

            >
              <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" disabled />
            </Form.Item>
            <Form.Item
              label="Admin"
              name="isAdmin"

            >
              <Select id="isAdminSelect" value={stateUserDetails.isAdmin} onChange={handleChange} >
                <Option value={true}>TRUE</Option>
                <Option value={false}>FALSE</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Avatar"
              name="avatar"

            >
              {
                stateUserDetails['avatar'] ? (
                  // Nếu có, hiển thị ảnh kích thước 40x40 hình tròn
                  <img
                    src={stateUserDetails.avatar}
                    alt="User Avatar"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  // Nếu không, hiển thị ảnh trống
                  <img
                    src="https://i.pinimg.com/236x/2a/65/f9/2a65f948b71ff3a70e21c64bca10a312.jpg" // Đường dẫn đến ảnh trống
                    alt="Empty Avatar"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                    }}
                  />
                )
              }

            </Form.Item>

            {/* <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: 'Please input your count image!' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                <Button >Select File</Button>
                {stateProductDetails?.image && (
                  <img src={stateProductDetails?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="avatar" />
                )}
              </WrapperUploadFile>
            </Form.Item> */}
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button style={{ backgroundColor: "#000000", color: "#fff" }} htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser} forceRender={true}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa tài khoản này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminUser