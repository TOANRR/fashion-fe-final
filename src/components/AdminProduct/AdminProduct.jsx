import { Button, Col, Form, Input, Modal, Row, Select, Space, Switch, Tag } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined, MinusCircleOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../InputComponent/InputComponent'
import { convertPrice, getBase64, renderOptions, renderOptionsCate } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import { useEffect } from 'react'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './StyleImage.css'
import { storage } from '../../components/FirebaseImage/config';
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from "firebase/storage";
import { limit } from 'firebase/firestore'
import { CLOTHING_TYPES } from '../../contant';
import { type } from '@testing-library/user-event/dist/type'
import TableComponentProduct from '../TableComponentProduct/TableComponentProduct'
const AdminProduct = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [image1, setImage1] = useState([])
  const hiddenFileInput = useRef(null);
  const hiddenFileInputDetail = useRef(null);
  const [loadImage, setLoadImage] = useState(false)
  const [loadImageDetail, setLoadImageDetail] = useState(false)
  const colors = {
    women: 'volcano', // Màu đỏ của Ant Design
    men: 'geekblue', // Màu xanh của Ant Design
    kids: 'gold', // Màu vàng của Ant Design
  };



  const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState({ size: '', countInStock: '' });


  const handleSizeChangeAdd = (index, value, field) => {
    const newSizes = [...stateProduct.sizes];
    newSizes[index][field] = value;
    setStateProduct({ ...stateProduct, sizes: newSizes });
  };

  const handleNewSizeChangeAdd = (value, field) => {
    setNewSize({ ...newSize, [field]: value });
  };

  const handleAddSizeAdd = () => {
    // Kiểm tra xem cả kích thước và số lượng mới không được để trống
    if (!newSize.size || !newSize.countInStock) {
      message.error('Vui lòng điền đầy đủ thông tin cho kích thước và số lượng!');
      return;
    }

    // Kiểm tra xem kích thước mới đã tồn tại chưa
    const exists = stateProduct.sizes.some(item => item.size === newSize.size);
    if (exists) {
      message.error('Kích thước đã tồn tại!');
      return;
    }

    // Thêm kích thước mới vào danh sách
    setStateProduct({ ...stateProduct, sizes: [...stateProduct.sizes, newSize] });
    setNewSize({ size: '', countInStock: '' });
  };

  const handleRemoveSizeAdd = (indexToRemove) => {
    const filteredSizes = stateProduct.sizes.filter((size, index) => index !== indexToRemove);
    setStateProduct({ ...stateProduct, sizes: filteredSizes });
  };

  const renderSizeInputsAdd = () => {
    return stateProduct.sizes.map((size, index) => (
      <div key={index}>
        <Space>
          <Input
            style={{ width: '100px' }}
            value={size.size}
            onChange={(e) => handleSizeChangeAdd(index, e.target.value, 'size')}
          />
          <Input
            style={{ width: '100px' }}
            value={size.countInStock}
            onChange={(e) => handleSizeChangeAdd(index, e.target.value, 'countInStock')}
          />
          <Button type="danger" onClick={() => handleRemoveSizeAdd(index)}>Xóa</Button>
        </Space>
      </div>
    ));
  };
  const handleSizeChange = (index, value, field) => {
    const newSizes = [...stateProductDetails.sizes];
    newSizes[index][field] = value;
    setStateProductDetails({ ...stateProductDetails, sizes: newSizes });
  };

  const handleNewSizeChange = (value, field) => {
    setNewSize({ ...newSize, [field]: value });
  };

  const handleAddSize = () => {
    // Kiểm tra xem cả kích thước và số lượng mới không được để trống
    if (!newSize.size || !newSize.countInStock) {
      message.error('Vui lòng điền đầy đủ thông tin cho kích thước và số lượng!');
      return;
    }

    // Kiểm tra xem kích thước mới đã tồn tại chưa
    const exists = stateProductDetails.sizes.some(item => item.size === newSize.size);
    if (exists) {
      message.error('Kích thước đã tồn tại!');
      return;
    }

    // Thêm kích thước mới vào danh sách
    setStateProductDetails({ ...stateProductDetails, sizes: [...stateProductDetails.sizes, newSize] });
    setNewSize({ size: '', countInStock: '' });
  };

  const handleRemoveSize = (indexToRemove) => {
    const filteredSizes = stateProductDetails.sizes.filter((size, index) => index !== indexToRemove);
    setStateProductDetails({ ...stateProductDetails, sizes: filteredSizes });
  };

  const renderSizeInputs = () => {
    return stateProductDetails.sizes.map((size, index) => (
      <div key={index} style={{ marginBottom: "5px" }}>
        <Space>
          <Input
            style={{ width: '100px' }}
            value={size.size}
            onChange={(e) => handleSizeChange(index, e.target.value, 'size')}
          />
          <Input
            style={{ width: '100px' }}
            value={size.countInStock}
            onChange={(e) => handleSizeChange(index, e.target.value, 'countInStock')}
          />
          <Button type="danger" onClick={() => handleRemoveSize(index)}>Xóa</Button>
        </Space>
      </div>
    ));
  };

  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    images: [],
    type: '',
    countInStock: '',
    newCategory: '',
    discount: '',
    category: '',
    sizes: []

  })
  const [stateProductDetails, setStateProductDetails] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    images: [],
    type: '',
    countInStock: '',
    discount: '',
    sizes: [],
    category: '',
    newCategory: '',
  })

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
      const { name,
        price,
        description,
        rating,
        images,
        type,
        countInStock,
        discount,
        category,
        sizes } = data
      const res = ProductService.createProduct({
        name,
        price,
        description,
        rating,
        images,
        type,
        countInStock,
        discount,
        category,
        sizes
      })
      return res
    }
  )
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = ProductService.updateProduct(
        id,
        token,
        { ...rests })
      return res
    },
  )

  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id,
        token,
      } = data
      const res = ProductService.deleteProduct(
        id,
        token)
      return res
    },
  )
  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids
      } = data
      const res = ProductService.deleteManyProduct(
        ids,
        token)
      return res
    },
  )

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct({ limit: 1000 })
    return res
  }

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProductNostar(rowSelected)
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        images: res?.data?.images,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        discount: res?.data?.discount,
        category: res?.data?.category,
        sizes: res?.data?.sizes
      })
      setSizes(res?.data?.sizes)
      console.log(sizes)
    }
    setIsLoadingUpdate(false)
  }
  const fetchAllCategories = async () => {
    const res = await ProductService.getCategories()
    console.log(res)
    return res
  }
  const categoryProduct = useQuery({ queryKey: ['category-product'], queryFn: fetchAllCategories })


  useEffect(() => {
    form2.setFieldsValue(stateProductDetails)
  }, [form2, stateProductDetails])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsProduct(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true)
  }

  const { data, isPending, isSuccess, isError } = mutation
  const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isPending: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

  const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
  // const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })
  const { isLoading: isLoadingProducts, data: products } = queryProduct
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'black', fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'black', fontSize: '20px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
      </div>
    )
  }

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
  const ImageCell = ({ images }) => (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Ảnh ${index}`} style={{ width: 'auto', height: '70px' }} />
      ))}
    </div>
  );
  const SizesCell = ({ sizes }) => (
    <ul>
      {sizes.map((size, index) => (
        <li key={index}>
          {size.size}:  {size.countInStock} sản phẩm
        </li>
      ))}
    </ul>
  );
  const [columns, setColumns] = useState([
    {
      title: 'STT',
      dataIndex: 'index',
      rowScope: 'row',
      fixed: 'left',
      width: 60,
    },
    {
      key: 'name',
      title: 'Sản phẩm',
      dataIndex: 'name',
      fixed: 'left',
      width: 250,
      render: (text, record) => (
        <a href={`${process.env.REACT_APP_URL}/product-details/${record._id}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
      style: { wordWrap: 'break-word', overflowWrap: 'break-word' },
      ...getColumnSearchProps('name')
    },
    {
      key: 'price',
      title: 'Giá',
      dataIndex: 'price',
      render: (text) => <span>{convertPrice(text)}</span>,
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: '>= 500000',
          value: '>='
        },
        {
          text: '<= 500000',
          value: '<='
        }
      ],
      onFilter: (value, record) => {
        console.log('value', value, record)
        if (value === '>=') {
          return record.price >= 500000
        } else if (value === '<=') {
          return record.price <= 500000
        }
      }
    },
    {
      key: 'type',
      title: 'Loại',
      dataIndex: 'type',
      render: (text) => (
        <Tag color={colors[text.toLowerCase()]}>{text.toUpperCase()}</Tag>
      ),
      width: 120,
      filters: [
        {
          text: 'WOMEN',
          value: 'women'
        },
        {
          text: 'MEN',
          value: 'men'
        },
        {
          text: 'KIDS',
          value: 'kids'
        }
      ],
      onFilter: (value, record) => {
        console.log('value', value, record)
        if (value === 'men') {
          return record.type === 'men'
        } else if (value === 'women') {
          return record.type === "women"
        }
        else if (value === 'kids') {
          return record.type === "kids"
        }
      }
    },
    {
      key: 'category',
      title: 'Danh mục',
      dataIndex: 'category',
      sorter: (a, b) => a.name.length - b.name.length,
      style: { wordWrap: 'break-word', overflowWrap: 'break-word' },
      ...getColumnSearchProps('category'),
      width: 200
    },
    {
      key: 'images',
      title: 'Hình ảnh',
      dataIndex: 'images',
      render: (images) => <ImageCell images={images} />,
      width: 300
    },
    {
      key: 'sizes',
      title: 'Kích thước',
      dataIndex: 'sizes',
      width: 200,
      render: (sizes) => <SizesCell sizes={sizes} />,
    },
    {
      key: 'selled',
      title: 'Đã bán',
      dataIndex: 'selled',
      width: 120,
      render: (selled) => <span>{selled ? selled : 0} sản phẩm</span>,
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,
      width: 100,
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
  const dataTable = products?.data?.length && products?.data?.map((product, index) => {
    return { ...product, key: product._id, index: index + 1 }
  })

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success("Thêm mới thành công")
      handleCancel()
    } else if (data?.status === 'ERR') {
      message.error(data?.message)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDelected, isErrorDeleted])

  useEffect(() => {
    if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
      message.success()
    } else if (isErrorDeletedMany) {
      message.error()
    }
  }, [isSuccessDelectedMany])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: '',
      price: '',
      description: '',
      rating: '',
      images: [],
      type: '',
      countInStock: '',
      discount: '',
      category: '',
      sizes: []

    })
    setNewSize({ size: '', countInStock: '' });
    form2.resetFields()
  };
  const handleDelteManyProducts = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success("Cập nhật thành công")
      handleCloseDrawer()
    } else if (dataUpdated?.status === 'OK') {
      message.error(dataUpdated?.message)
    }
  }, [isSuccessUpdated])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const handleDeleteProduct = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      price: '',
      description: '',
      rating: '',
      images: [],
      type: '',
      countInStock: '',
      category: '',
      sizes: []

    })


    form.resetFields()
  };



  const onFinishmodal = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      images: stateProduct.images,
      type: stateProduct.type,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount,
      category: stateProduct.category === 'add_category' ? stateProduct.newCategory : stateProduct.category,
      sizes: stateProduct.sizes

    }
    console.log(params)
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value
    })
  }


  // const handleOnchangeAvatar = async ({ fileList }) => {
  //   const file = fileList[0]
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setStateProduct({
  //     ...stateProduct,
  //     image: file.preview
  //   })
  // }

  // const handleOnchangeAvatarDetails = async ({ fileList }) => {
  //   const file = fileList[0]
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setStateProductDetails({
  //     ...stateProductDetails,
  //     image: file.preview
  //   })
  // }
  const onUpdateProduct = () => {
    const para = { ...stateProductDetails, category: stateProductDetails.category === 'add_category' ? stateProductDetails.newCategory : stateProductDetails.category }
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...para }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }
  const handleChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value
    })
  }
  const handleChangeSelectDetail = (value) => {
    setStateProductDetails({
      ...stateProductDetails,
      type: value
    })
  }
  const handleChangeSelectCate = (value) => {
    setStateProduct({
      ...stateProduct,
      category: value
    })
  }
  const handleChangeSelectCateDetail = (value) => {
    setStateProductDetails({
      ...stateProductDetails,
      category: value
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

    if (event.target.files?.length !== 4) {
      message.error("vui lòng chọn 4 hình ảnh")
      return

    }
    setLoadImage(true)
    console.log("load", loadImage)
    const downloadURLs = [];
    // Upload each image to Firebase Storage
    for (let i = 0; i < event.target.files.length; i++) {
      const image = event.target.files[i];
      const storageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(storageRef, image);
      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);
      downloadURLs.push(downloadURL);
      console.log(downloadURLs);
    }
    stateProduct.images = downloadURLs;
    setLoadImage(false)


  };
  const handleImageChangeDetail = async (event) => {
    console.log(event.target.files)

    if (event.target.files?.length !== 4) {
      message.error("vui lòng chọn 4 hình ảnh")
      return

    }
    console.log("dang update")
    setLoadImageDetail(true)
    console.log("loading up", loadImageDetail)
    const downloadURLs = [];
    // Upload each image to Firebase Storage
    for (let i = 0; i < event.target.files.length; i++) {
      const image = event.target.files[i];
      const storageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(storageRef, image);
      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);
      downloadURLs.push(downloadURL);
      console.log(downloadURLs);
    }
    stateProductDetails.images = downloadURLs;
    setLoadImageDetail(false)


  };
  const handleOnchangeDespcription = (value) => {
    stateProductDetails.description = value
  }
  const handleOnchangeDespcriptionAdd = (value) => {
    stateProduct.description = value
  }

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '100px', width: '100px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
      </div>
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
        <TableComponentProduct style={{ width: '1000px' }} handleDelteMany={handleDelteManyProducts} columns={columns.filter((column) => !column.hidden)} isLoading={isLoadingProducts} scroll={{ x: 800 }} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
      <ModalComponent title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null} width={1000} height={700}>
        <Loading isLoading={isPending}>

          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 30 }}
            onFinish={onFinishmodal}
            autoComplete="on"
            form={form}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Tên"
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm !' }]}
                >
                  <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
                </Form.Item>
                <Form.Item
                  label="Loại"
                  name="type"
                  rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm!' }]}
                >
                  <Select
                    name="type"
                    // defaultValue="lucy"
                    // style={{ width: 120 }}
                    value={stateProduct.type}
                    onChange={handleChangeSelect}
                    options={renderOptions(CLOTHING_TYPES)}
                  />
                </Form.Item>
                <Form.Item
                  label="Danh mục"
                  name="category"
                  rules={[{ required: true, message: 'Please input your type!' }]}
                >
                  {/* <Select
                    name="category"
                    // defaultValue="lucy"
                    // style={{ width: 120 }}
                    value={stateProduct.category}
                    onChange={handleChangeSelectCate}
                    options={renderOptionsCate(categoryProduct?.data)}
                  /> */}
                  <Select
                    showSearch
                    name="category"
                    value={stateProduct.category}
                    onChange={handleChangeSelectCate}
                    placeholder="Chọn danh mục"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    style={{ width: 200 }}
                    options={renderOptionsCate(categoryProduct?.data)}

                  />


                </Form.Item>
                {stateProduct.category === 'add_category' && (
                  <Form.Item
                    label='Thêm'
                    name="newCategory"
                    rules={[{ required: true, message: 'Please input your type!' }]}
                  >
                    <InputComponent value={stateProduct.newCategory} onChange={handleOnchange} name="newCategory" />
                  </Form.Item>
                )}
                <Form.Item
                  label="Sizes"
                  name="sizes"
                  rules={[{ required: true, message: 'nhập size và số lượng' }]}
                >
                  <div name="sizes">
                    {renderSizeInputsAdd()}
                    <div style={{ marginBottom: '16px' }}>
                      <Space>
                        <Input
                          placeholder="Kích cỡ"
                          value={newSize.size}
                          onChange={(e) => handleNewSizeChangeAdd(e.target.value, 'size')}
                          style={{ width: '100px' }}
                        />
                        <Input
                          style={{ width: '100px' }}
                          placeholder="Số lượng"
                          value={newSize.countInStock}
                          onChange={(e) => handleNewSizeChangeAdd(e.target.value, 'countInStock')}
                        />
                        <Button onClick={handleAddSizeAdd}>Thêm</Button>
                      </Space>
                    </div>
                  </div>

                </Form.Item>
                <Form.Item
                  label="Giá"
                  name="price"
                  rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                >
                  <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
                </Form.Item>

                <Form.Item
                  label="Discount"
                  name="discount"
                  rules={[{ required: true, message: 'Please input your discount of product!' }]}
                >
                  <InputComponent value={stateProduct.discount} onChange={handleOnchange} name="discount" />
                </Form.Item>

              </Col>
              <Col span={12}>
                <Form.Item
                  label="Ảnh"
                  name="images"
                // rules={[{ required: true, message: 'Please input 4 images!' }]}
                >
                  <Loading isLoading={loadImage}>
                    <div onClick={handleClick} style={{ cursor: "pointer" }} name="images">
                      {stateProduct.images[0] ? (
                        <img src={stateProduct.images[0]} alt="upload image" className="img-after-up" />
                      ) : (
                        <img src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" className="img-before" />
                      )}



                      {stateProduct.images[1] ? (
                        <img src={stateProduct.images[1]} alt="upload image" className="img-after-up" />
                      ) : (
                        <img src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" className="img-before" />
                      )}

                      {stateProduct.images[2] ? (
                        <img src={stateProduct.images[2]} alt="upload image" className="img-after-up" />
                      ) : (
                        <img src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" className="img-before" />
                      )}

                      {stateProduct.images[3] ? (
                        <img src={stateProduct.images[3]} alt="upload image" className="img-after-up" />
                      ) : (
                        <img src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" className="img-before" />
                      )}
                      <input
                        id="image-upload-input"
                        type="file"
                        multiple
                        ref={hiddenFileInput}
                        onChange={(event) => handleImageChange(event)}
                        style={{ display: "none" }}
                      />
                    </div>
                  </Loading>


                </Form.Item>
                <Form.Item
                  label="Mô tả"
                  name="description"
                  rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                  <ReactQuill style={{ height: "300%" }} value={stateProduct.description} onChange={handleOnchangeDespcriptionAdd} name="description" />
                </Form.Item>
              </Col>
            </Row>






            {/* {stateProduct.type === 'add_type' && (
              <Form.Item
                label='New type'
                name="newType"
                rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm!' }]}
              >
                <InputComponent value={stateProduct.newType} onChange={handleOnchange} name="newType" />
              </Form.Item>
            )} */}





            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button style={{ backgroundColor: "#000000", color: "#fff" }} htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={handleCloseDrawer} width="85%" >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

          <Form
            name="basic2"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form2}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Tên"
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                  labelCol={{ span: 4 }}
                >
                  <InputComponent value={stateProductDetails.name} onChange={handleOnchangeDetails} name="name" />
                </Form.Item>

                <Form.Item
                  label="Loại"
                  name="type"
                  rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm!' }]}
                  labelCol={{ span: 4 }}
                >
                  <Select
                    name="type"
                    // defaultValue="lucy"
                    // style={{ width: 120 }}
                    value={stateProductDetails.type}
                    onChange={handleChangeSelectDetail}
                    options={renderOptions(CLOTHING_TYPES)}
                  />
                </Form.Item>
                <Form.Item
                  label="Danh mục"
                  name="category"
                  rules={[{ required: true, message: 'Please input your type!' }]}
                  labelCol={{ span: 4 }}
                >
                  {/* <Select
                    name="category"
                    // defaultValue="lucy"
                    // style={{ width: 120 }}
                    value={stateProductDetails.category}
                    onChange={handleChangeSelectCateDetail}
                    options={renderOptionsCate(categoryProduct?.data)}
                  /> */}
                  <Select
                    showSearch
                    name="category"
                    value={stateProductDetails.category}
                    onChange={handleChangeSelectCateDetail}
                    placeholder="Chọn danh mục"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    style={{ width: 200 }}
                    options={renderOptionsCate(categoryProduct?.data)}

                  />
                </Form.Item>
                {stateProductDetails.category === 'add_category' && (
                  <Form.Item
                    label='Thêm'
                    name="newCategory"
                    rules={[{ required: true, message: 'Please input your type!' }]}
                    labelCol={{ span: 4 }}
                  >
                    <InputComponent value={stateProductDetails.newCategory} onChange={handleOnchangeDetails} name="newCategory" />
                  </Form.Item>
                )}
                <Form.Item
                  label="Sizes"
                  name="sizes"
                  rules={[{ required: true, message: 'Please input your discount of product!' }]}
                  labelCol={{ span: 4 }}
                >
                  <div name="sizes" >
                    {renderSizeInputs()}
                    <div style={{ marginBottom: '16px' }}>
                      <Space>
                        <Input
                          placeholder="Kích cỡ"
                          value={newSize.size}
                          onChange={(e) => handleNewSizeChange(e.target.value, 'size')}
                          style={{ width: '100px' }}
                          marginBottom={20}
                        />
                        <Input
                          style={{ width: '100px' }}
                          placeholder="Số lượng"
                          value={newSize.countInStock}
                          onChange={(e) => handleNewSizeChange(e.target.value, 'countInStock')}
                        />
                        <Button onClick={handleAddSize}>Thêm</Button>
                      </Space>
                    </div>
                  </div>

                </Form.Item>
                <Form.Item
                  label="Giá"
                  name="price"
                  rules={[{ required: true, message: 'Vui lòng nhập giá bán!' }]}
                  labelCol={{ span: 4 }}
                >
                  <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price" />
                </Form.Item>
                <Form.Item
                  label="Discount"
                  name="discount"
                  rules={[{ required: true, message: 'Vui lòng nhập discount, nhập 0 nếu không có discount!' }]}
                  labelCol={{ span: 4 }}
                >
                  <InputComponent value={stateProductDetails.discount} onChange={handleOnchangeDetails} name="discount" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Ảnh"
                  name="images"
                  rules={[{ required: true, message: 'Please input 4 images!' }]}
                  labelCol={{ span: 4 }}
                >
                  <Loading isLoading={loadImageDetail}>
                    <div onClick={handleClickDetail} style={{ cursor: "pointer" }} name="images">
                      {stateProductDetails.images[0] ? (
                        <img src={stateProductDetails.images[0]} alt="upload image" className="img-after" height="40" width='auto' />
                      ) : (
                        <img src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" className="img-before" />
                      )}



                      {stateProductDetails.images[1] ? (
                        <img src={stateProductDetails.images[1]} alt="upload image" className="img-after" height="40" width='auto' />
                      ) : (
                        <img src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" className="img-before" />
                      )}

                      {stateProductDetails.images[2] ? (
                        <img src={stateProductDetails.images[2]} alt="upload image" className="img-after" height="40" width='auto' />
                      ) : (
                        <img src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" className="img-before" />
                      )}

                      {stateProductDetails.images[3] ? (
                        <img src={stateProductDetails.images[3]} alt="upload image" className="img-after" height="40" width='auto' />
                      ) : (
                        <img src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" className="img-before" />
                      )}
                      <input
                        id="image-upload"
                        type="file"
                        multiple
                        ref={hiddenFileInputDetail}
                        onChange={(event) => handleImageChangeDetail(event)}
                        style={{ display: "none" }}
                      />
                    </div>
                  </Loading>


                </Form.Item>
                <Form.Item
                  label="Mô tả"
                  name="description"
                  rules={[{ required: true, message: 'Mô tả không được để trống!' }]}
                  labelCol={{ span: 4 }}

                >
                  <ReactQuill value={stateProductDetails.description} onChange={handleOnchangeDespcription} name="description" />
                </Form.Item>



              </Col>
            </Row>








            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button style={{ backgroundColor: "#000000", color: "#fff" }} htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct} >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminProduct