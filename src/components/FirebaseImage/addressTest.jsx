import React, { useState, useEffect } from 'react';
import { DatePicker, Button } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const RevenueChart = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const today = moment().endOf('day'); // Lấy ngày hiện tại, cuối ngày (23:59:59)
    const lastWeek = moment().subtract(1, 'week').startOf('day'); // Lấy ngày 1 tuần trước, đầu ngày (00:00:00)
    setStartDate(lastWeek);
    setEndDate(today);
    fetchRevenueData(lastWeek, today);
  }, []);

  const fetchRevenueData = async (startDate, endDate) => {
    // Gửi yêu cầu API để lấy dữ liệu doanh thu từ startDate đến endDate
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/order/get-revenue-day?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}`);
      const data = await response.json();
      setRevenueData(data);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  const handleRangeSelect = (dates) => {
    // Cập nhật startDate và endDate chỉ khi cả hai giá trị đã được chọn
    if (dates && dates.length === 2) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
      fetchRevenueData(dates[0], dates[1]);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <DatePicker.RangePicker
          onChange={handleRangeSelect}
        />
        <Button type="primary" onClick={() => fetchRevenueData(startDate, endDate)}>Select</Button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={revenueData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id"
          // tickFormatter={(tick) => moment(tick).format('DD/MM/YYYY')} 
          />
          <YAxis tickFormatter={(tick) => `${tick.toLocaleString()} VNĐ`} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" />
          <text x="50%" y="3%" textAnchor="middle" dominantBaseline="middle" fontSize="20px" fontWeight="bold">Doanh thu theo ngày</text>

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
