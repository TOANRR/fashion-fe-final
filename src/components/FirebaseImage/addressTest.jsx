import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const MyComponent = () => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

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
            setWards([]);
        } else {
            setDistricts([]);
            setWards([]);
        }
    };

    const handleDistrictChange = (value) => {
        if (value) {
            const selectedDistrict = districts.find((district) => district.Id === value);
            setWards(selectedDistrict.Wards);
        } else {
            setWards([]);
        }
    };

    return (
        <div>
            <Select
                className="form-select form-select-sm mb-3"
                placeholder="Chọn tỉnh thành"
                onChange={handleCityChange}
            >
                {cities.map((city) => (
                    <Option key={city.Id} value={city.Id}>{city.Name}</Option>
                ))}
            </Select>

            <Select
                className="form-select form-select-sm mb-3"
                placeholder="Chọn quận huyện"
                onChange={handleDistrictChange}
            >
                {districts.map((district) => (
                    <Option key={district.Id} value={district.Id}>{district.Name}</Option>
                ))}
            </Select>

            <Select
                className="form-select form-select-sm"
                placeholder="Chọn phường xã"
            >
                {wards.map((ward) => (
                    <Option key={ward.Id} value={ward.Id}>{ward.Name}</Option>
                ))}
            </Select>
        </div>
    );
};

export default MyComponent;
