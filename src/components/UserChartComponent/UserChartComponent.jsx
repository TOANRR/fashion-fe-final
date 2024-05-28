import React, { useState, useEffect } from 'react';
import { DatePicker, Button } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { useSelector } from 'react-redux';

const UserCountChart = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [userData, setUserData] = useState([]);
    const user = useSelector((state) => state?.user)

    useEffect(() => {
        const today = moment().endOf('day'); // Current day, end of day (23:59:59)
        const lastWeek = moment().subtract(4, 'week').startOf('day'); // One week ago, start of day (00:00:00)
        setStartDate(lastWeek);
        setEndDate(today);
        fetchUserData(lastWeek, today);
    }, []);

    const fetchUserData = async (startDate, endDate) => {
        // Fetch user count data from startDate to endDate
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/count-by-day?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}`, {
                method: 'GET',
                headers: {
                    token: `Bearer ${user?.access_token}`,
                    // Thêm các header khác tại đây nếu cần
                }
            });
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleRangeSelect = (dates) => {
        // Update startDate and endDate only when both values are selected
        if (dates && dates.length === 2) {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
            fetchUserData(dates[0], dates[1]);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <DatePicker.RangePicker
                    onChange={handleRangeSelect}
                />
                <Button type="primary" onClick={() => fetchUserData(startDate, endDate)}>Select</Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={userData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" tickFormatter={(tick) => moment(tick).format('DD/MM/YYYY')} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    <text x="50%" y="3%" textAnchor="middle" dominantBaseline="middle" fontSize="20px" fontWeight="bold">Số tài khoản mới theo ngày</text>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserCountChart;
