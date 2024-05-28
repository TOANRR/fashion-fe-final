import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import * as message from '../../components/MessageComponent/MessageComponent'
import { updateUser } from '../../redux/slides/userSlide'
import { Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { Row, Col } from 'antd';
import { storage } from '../../components/FirebaseImage/config';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Select } from 'antd';
import { Breadcrumb } from 'antd';
import axios from 'axios';
import './imageStyle.css'
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, UserOutlined, HeatMapOutlined } from '@ant-design/icons';
import RightMenu from '../../components/RightMenuComponent/RightMenuComponent'

const { Option } = Select;

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const [avatar, setAvatar] = useState('')
    const [progresspercent, setProgresspercent] = useState(0);
    const [loading, setLoading] = useState(false)
    const [fileImage, setfileImage] = useState(null);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (user?.city && (districts.length === 0)) {
            const selectedC = cities.find((city) => city.Name === user?.city)
            setDistricts(selectedC?.Districts || []);
        }
    }, [user?.city, cities]); // Gọi lại khi user.city hoặc cities thay đổi

    useEffect(() => {
        if (user?.district && (wards.length === 0)) {
            const selectedD = districts.find((district) => district.Name === user?.district)
            setWards(selectedD?.Wards || []);
        }
    }, [user?.district, districts]); // Gọi lại k
    const handleCityChange = (value) => {
        if (value) {
            const selectedCity = cities.find((city) => city.Id === value);
            setDistricts(selectedCity.Districts);
            setCity(selectedCity.Name)
            setWards([]);
            setDistrict('')
            setWard('')
        } else {
            setDistricts([]);
            setWards([]);
        }
    };

    const handleDistrictChange = (value) => {
        if (value) {
            const selectedDistrict = districts.find((district) => district.Id === value);
            setWards(selectedDistrict.Wards);
            setDistrict(selectedDistrict.Name)
            setWard('')
        } else {
            setWards([]);
        }
    };
    const handleWardChange = (value) => {
        if (value) {
            const selectedWard = wards.find((ward) => ward.Id === value);
            setWard(selectedWard.Name)
            console.log(city, district, ward)
        }
    };

    const navigate = useNavigate();
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )

    const dispatch = useDispatch()
    const { data: dataUpdate, isPending, isSuccess, isError } = mutation
    // console.log('dataa', data)

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
        setCity(user?.city)
        setDistrict(user?.district)
        setWard(user?.ward)


    }, [user])

    // useEffect(() => {

    //     // if (isSuccess) {
    //     //     console.log(isSuccess)
    //     message.success()
    //     console.log(dataUpdate)
    //     dispatch(updateUser({ ...dataUpdate?.data, access_token: user?.token }))
    //     // handleGetDetailsUser(user?.id, user?.access_token)
    //     // } else if (isError) {
    //     //     message.error()

    // }, [dataUpdate, isError])
    // useEffect(() => {
    //     if (!localStorage.getItem('access_token')) {
    //         navigate("/NotFoundPage");
    //     }
    // }, [user.id]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token)
        console.log(res)
        dispatch(updateUser({ ...res?.data, access_token: token }))
        // window.location.reload()
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }

    // const handleOnchangeAvatar = async ({ fileList }) => {
    //     const file = fileList[0];
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj)
    //     }
    //     setAvatar(file.preview)
    // }

    const handleUpdate = async () => {
        // if (fileImage !== null) {

        // }
        // mutation.mutate({ id: user?.id, email, name, phone, address, city, district, ward, avatar, access_token: user?.access_token })
        setLoading(true)
        const res = await UserService.updateUser(user?.id, {
            email: email, name: name, phone: phone, address: address,
            city: city, district: district, ward: ward, avatar: avatar
        }, user?.access_token)
        setLoading(false)
        if (res?.message === "SUCCESS") {
            message.success("update thành công")
            dispatch(updateUser({ ...res?.data, access_token: user?.token }))


        }
        else
            message.error("có lỗi xảy ra")


    }



    const hiddenFileInput = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setfileImage(file);
        const imgname = event.target.files[0].name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxSize = Math.max(img.width, img.height);
                canvas.width = maxSize;
                canvas.height = maxSize;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(
                    img,
                    (maxSize - img.width) / 2,
                    (maxSize - img.height) / 2
                );
                canvas.toBlob(
                    (blob) => {
                        const file = new File([blob], imgname, {
                            type: "image/png",
                            lastModified: Date.now(),
                        });

                        console.log(file);



                        const storageRef = ref(storage, `files/avatar/${user.id.concat(Date.now())}`);
                        const uploadTask = uploadBytesResumable(storageRef, file);

                        uploadTask.on("state_changed",
                            (snapshot) => {
                                const progress =
                                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                                setProgresspercent(progress);
                            },
                            (error) => {
                                alert(error);
                            },
                            () => {
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                    setAvatar(downloadURL)
                                });
                            }
                        );
                        setAvatar(file);
                    },
                    "image/jpeg",
                    0.8
                );
            };
        };
    };


    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    return (
        <div style={{ width: '100%', minHeight: '500px', borderBottom: '1px solid #ccc' }}>
            <div style={{ paddingLeft: "30px" }}>
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: <a href="/">Trang chủ</a>,
                        },
                        {
                            title: <a href="#">Thông tin người dùng</a>,
                        }
                    ]}
                    style={{ fontSize: "18px", fontWeight: "500", marginTop: "15px", marginBottom: "30px", paddingLeft: "1%" }}

                />
                <div style={{ display: 'flex', paddingTop: "0px", width: "256px" }}>
                    <div style={{ marginRight: '10px', width: '25%', textAlign: 'center' }}>
                        {
                            user?.avatar ? (
                                <img src={user?.avatar} alt="Avatar" style={{ width: '50%', borderRadius: '50%' }} />
                            ) : <img src="https://salt.tikicdn.com/desktop/img/avatar.png" alt="Avatar" style={{ width: '50%', borderRadius: '50%' }} />
                        }


                    </div>

                    <div style={{ marginBottom: '5px', textAlign: 'center', fontWeight: "700", maxWidth: '150px', wordWrap: 'break-word' }}>
                        {user?.name ? user?.name : user?.email}
                    </div>
                </div>

                <Row >
                    <Col span={5}>
                        <RightMenu />
                    </Col>

                    <Col span={18} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Loading isLoading={isPending}>


                            <WrapperContentProfile>
                                <WrapperInput>
                                    <WrapperLabel htmlFor="avatar"><UserOutlined style={{ marginRight: "5px" }} /> Avatar</WrapperLabel>
                                    <div className="image-upload-container">
                                        <div className="box-decoration">
                                            <div onClick={handleClick} style={{ cursor: "pointer" }}>
                                                {avatar ? (
                                                    <img src={avatar} alt="upload image" className="img-display-after" />
                                                ) : (
                                                    <img src="https://img7.thuthuatphanmem.vn/uploads/2023/10/15/avatar-trong-sieu-dep_094012197.jpeg" alt="upload image" className="img-display-before" />
                                                )}

                                                <input
                                                    id="image-upload-input"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                    ref={hiddenFileInput}
                                                    style={{ display: "none" }}
                                                />
                                            </div>


                                        </div>
                                    </div>
                                </WrapperInput>
                                <WrapperInput>
                                    <WrapperLabel htmlFor="name">Họ & Tên</WrapperLabel>
                                    <InputForm id="name" value={name} onChange={handleOnchangeName} />

                                </WrapperInput>
                                <WrapperInput>
                                    <WrapperLabel htmlFor="email"><MailOutlined style={{ marginRight: "5px" }} /> Email</WrapperLabel>
                                    <InputForm id="email" value={email} onChange={handleOnchangeEmail} disabled />

                                </WrapperInput>
                                <WrapperInput>
                                    <WrapperLabel htmlFor="phone"><PhoneOutlined style={{ marginRight: "5px" }} />Điện thoại</WrapperLabel>
                                    <InputForm id="email" value={phone} onChange={handleOnchangePhone} />

                                </WrapperInput>
                                <WrapperInput>
                                    <label style={{ color: "#000", fontSize: "16px", lineHeight: "30px", fontWeight: "600", textAlign: "left", width: "18%" }} htmlFor="city"><EnvironmentOutlined style={{ marginRight: "5px" }} />Địa chỉ</label>
                                    <div style={{ justifyContent: 'center' }}>
                                        <Select
                                            className="form-select form-select-sm mb-3"
                                            placeholder="Chọn tỉnh thành"
                                            onChange={handleCityChange}
                                            value={city ? city : undefined}
                                            style={{ width: 160, marginRight: "10px" }}

                                        >
                                            {cities.map((city) => (
                                                <Option key={city.Id} value={city.Id}>{city.Name}</Option>
                                            ))}
                                        </Select>

                                        <Select
                                            className="form-select form-select-sm mb-3"
                                            placeholder=" quận/huyện"
                                            onChange={handleDistrictChange}
                                            value={district ? district : undefined}
                                            style={{ width: 160, marginRight: "10px" }}

                                        >
                                            {districts.map((district) => (
                                                <Option key={district.Id} value={district.Id}>{district.Name}</Option>
                                            ))}
                                        </Select>

                                        <Select
                                            className="form-select form-select-sm"
                                            placeholder="phường/xã"
                                            onChange={handleWardChange}
                                            value={ward ? ward : undefined}
                                            style={{ width: 160 }}


                                        >
                                            {wards.map((ward) => (
                                                <Option key={ward.Id} value={ward.Id}>{ward.Name}</Option>
                                            ))}
                                        </Select>
                                    </div>
                                </WrapperInput>
                                <WrapperInput>
                                    <WrapperLabel htmlFor="address"><HeatMapOutlined style={{ marginRight: "5px" }} />Địa chỉ cụ thể</WrapperLabel>
                                    <InputForm id="address" value={address} onChange={handleOnchangeAddress} />
                                </WrapperInput>
                                <Button style={{ backgroundColor: "#000000", color: "#fff", width: "20%", marginLeft: "auto" }}

                                    onClick={handleUpdate}
                                >
                                    CẬP NHẬT
                                </Button>
                            </WrapperContentProfile>





                        </Loading>
                    </Col>


                </Row>
            </div>



        </div>
    )
}

export default ProfilePage