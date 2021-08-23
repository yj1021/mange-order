import React, { ReactElement, FC, ReactHTMLElement } from 'react'
import { ColumnsType, DataType } from '@/type'
import { Table } from 'antd'

interface Props {
    columns: ColumnsType[];
    data: DataType[];
    loading: boolean;
    expandedRowRender: any;
    [propName:string]:any;
    onChange?: (page: any, filters: any, sorter: any) => void
}

export default function ExpandTable({
    columns,
    data,
    loading,
    expandedRowRender,
    onChange
}: Props): ReactElement {
    return (
        <>
            <Table
                expandable={{expandedRowRender}}
                columns={columns} 
                dataSource={data} 
                loading={loading} 
                pagination={false}
                onChange={onChange}
            />
        </>
    )
}
