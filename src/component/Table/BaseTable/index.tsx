import React, { ReactElement, FC } from 'react'
import { ColumnsType, DataType } from '@/type'
import { Table } from 'antd'

interface Props {
    columns: ColumnsType[];
    data: DataType[];
    loading: boolean;
    EditableCell?: FC;
    [propName:string]:any;
}

export default function BaseTable({
    columns,
    data,
    loading,
    EditableCell
}: Props): ReactElement {
    return (
        <>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                columns={columns} 
                dataSource={data} 
                loading={loading} 
                pagination={false}
            />
        </>
    )
}
