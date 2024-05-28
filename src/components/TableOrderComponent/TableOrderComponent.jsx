import { Table } from 'antd';
import React, { useState } from 'react'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from 'react';
import "./styleOrder.css"
const TableOrderComponent = (props) => {
    const { selectionType = 'radio', data: dataSource = [], isLoading = false, columns = [], handleDelteMany } = props
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
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(newColumnExport)
            .addDataSource(dataSource, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };

    return (
        <Loading isLoading={isLoading}>

            <button onClick={exportExcel}>Export Excel</button>
            <Table
                // rowSelection={{
                //     // type: selectionType,
                //     ...rowSelection,
                // }}
                columns={columns}
                dataSource={dataSource}

                {...props}
            />
        </Loading>
    )
}

export default TableOrderComponent