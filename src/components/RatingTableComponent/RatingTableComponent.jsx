import React from 'react';
import { Rate, Table } from 'antd';

const RatingStatsTableComponent = ({ ratingStats }) => {
    const dataSource = Object.keys(ratingStats).map(key => ({
        rating: <Rate disabled defaultValue={parseInt(key)} />,
        count: ratingStats[key]
    }));

    const columns = [
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            width: '50%'
        },
        {
            title: 'Số lượng',
            dataIndex: 'count',
            key: 'count',
            width: '50%'
        }
    ];

    return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default RatingStatsTableComponent;
