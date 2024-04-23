import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import * as message from '../../components/MessageComponent/MessageComponent'
import { updateUser } from '../../redux/slides/userSlide'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils'
import { useLocation, useNavigate } from 'react-router-dom'
import { Row, Col } from 'antd';
import { storage } from '../../components/FirebaseImage/config';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Select } from 'antd';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './imageStyle.css'
import { set } from 'firebase/database'
const { Option } = Select;

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const [avatar, setAvatar] = useState('')
    const [progresspercent, setProgresspercent] = useState(0);

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
    const { data, isPending, isSuccess, isError } = mutation
    console.log('dataa', data)

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
        setCity(user?.city)
        setDistrict(user?.district)
        setWard(user?.ward)
        // if (user?.city) {
        //     const selectedCity = cities.find((city) => city.Name === user?.city)
        //     setDistricts(selectedCity.Districts)
        //     // if (user?.district) {
        //     //     const selectedDistrict = districts.find((district) => district.Name === user?.district)
        //     //     setWards(selectedDistrict.Wards)
        //     // }
        // }


    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate("/NotFoundPage");
        }
    }, [user.id]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
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

    const handleUpdate = () => {
        // if (fileImage !== null) {

        // }
        mutation.mutate({ id: user?.id, email, name, phone, address, city, district, ward, avatar, access_token: user?.access_token })

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
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <Breadcrumb
                items={[
                    {
                        title: <a href="/">Trang chủ</a>,
                    },
                    {
                        title: <a href="">Thông tin người dùng</a>,
                    }
                ]}
            />
            <Loading isLoading={isPending}>
                <Row>
                    <Col span={10} style={{ paddingLeft: "50px" }}>
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
                    </Col>
                    <Col span={10} style={{ paddingLeft: "50px" }}>
                        <WrapperContentProfile>
                            <WrapperInput>
                                <WrapperLabel htmlFor="name">Tên</WrapperLabel>
                                <InputForm style={{ width: '600px' }} id="name" value={name} onChange={handleOnchangeName} />

                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="email">Email</WrapperLabel>
                                <InputForm style={{ width: '600px' }} id="email" value={email} onChange={handleOnchangeEmail} />

                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="phone">Điện thoại</WrapperLabel>
                                <InputForm style={{ width: '600px' }} id="email" value={phone} onChange={handleOnchangePhone} />

                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="city">Địa chỉ</WrapperLabel>
                                <div>
                                    <Select
                                        className="form-select form-select-sm mb-3"
                                        placeholder="Chọn tỉnh thành"
                                        onChange={handleCityChange}
                                        value={city ? city : undefined}
                                        style={{ width: 150 }}

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
                                        style={{ width: 150 }}

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
                                        style={{ width: 150 }}


                                    >
                                        {wards.map((ward) => (
                                            <Option key={ward.Id} value={ward.Id}>{ward.Name}</Option>
                                        ))}
                                    </Select>
                                </div>
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="address">Số nhà</WrapperLabel>
                                <InputForm style={{ width: '700px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                            </WrapperInput>
                            <button
                                className="image-upload-button"
                                onClick={handleUpdate}
                            >
                                Cập nhật
                            </button>
                        </WrapperContentProfile></Col>
                </Row>

            </Loading>
        </div>
    )
}

export default ProfilePage