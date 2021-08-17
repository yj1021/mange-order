import React, { ReactElement } from 'react'
import { ColumnsType, DataType } from '@/type'
import { Table } from 'antd'

interface Props {
    columns: ColumnsType[];
    data: DataType[];
    loading: boolean;
    [propName:string]:any;
}

export default function BaseTable({
    columns,
    data,
    loading,
}: Props): ReactElement {
    return (
        <>
            <Table 
                columns={columns} 
                dataSource={data} 
                loading={loading} 
                pagination={false}
            />
        </>
    )
}
