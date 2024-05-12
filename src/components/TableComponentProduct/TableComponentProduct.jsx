import { Table } from 'antd';
import React, { useState } from 'react'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from 'react';

const TableComponentProduct = (props) => {
    const { selectionType = 'checkbox', data: dataSource = [], isLoading = false, columns = [], handleDelteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const newColumnExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    }, [columns])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
    };
    const handleDeleteAll = () => {
        handleDelteMany(rowSelectedKeys)
    }
    const exportExcel = () => {
        const exportData = dataSource.map(item => {
            const exportedItem = {};
            // Kiểm tra và thêm các trường dữ liệu nếu tồn tại
            if (item.hasOwnProperty('name')) exportedItem.name = item.name;
            if (item.hasOwnProperty('price')) exportedItem.price = item.price;
            if (item.hasOwnProperty('type')) exportedItem.type = item.type;
            if (item.hasOwnProperty('category')) exportedItem.category = item.category;
            if (item.hasOwnProperty('images')) exportedItem.images = item.images.join(', ');
            if (item.hasOwnProperty('sizes')) {
                exportedItem.sizes = item.sizes.map(size => `${size.size}: ${size.countInStock}`).join(', ');
            }
            return exportedItem;
        });

        const excelInstance = new Excel();
        excelInstance.addSheet("test")
            .addColumns(newColumnExport)
            .addDataSource(exportData)
            .saveAs("Excel.xlsx");
    };

    return (
        <Loading isLoading={isLoading}>
            {rowSelectedKeys.length > 0 && (
                <div style={{
                    background: '#1d1ddd',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '10px',
                    cursor: 'pointer',
                    marginBottom: "30px",
                    width: '90%'
                }}
                    onClick={handleDeleteAll}
                >
                    Xóa tất cả
                </div>
            )}
            {/* <button onClick={exportExcel}>Export Excel</button> */}
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}
                {...props}
            />
        </Loading>
    )
}

export default TableComponentProduct