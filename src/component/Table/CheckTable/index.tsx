import React, { ReactElement } from 'react'
import { Table } from 'antd'
import { ColumnsType, DataType } from '@/type'


interface Props {
    columns: ColumnsType[];
    data: DataType[];
    loading: boolean;
    selectedRowKeys?:string[];
    changeSelectKeys?: (keys: string[]) => void;
    [propName:string]:any;
}

export default function CheckTable({
    columns,
    data,
    loading,
    selectedRowKeys,
    changeSelectKeys
}: Props): ReactElement {

    const selectChange = (selectedRowKeys) => {
        changeSelectKeys && changeSelectKeys(selectedRowKeys)
    }

    return (
        <>
            <Table 
                rowSelection={{
                    selectedRowKeys,
                    onChange: selectChange,
                }}
                columns={columns} 
                dataSource={data} 
                loading={loading} 
                pagination={false}
            />
        </>
    )
}
