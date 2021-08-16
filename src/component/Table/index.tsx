import React, { ReactElement } from 'react'
import { Table, Pagination } from 'antd'
import './index.less'

interface ColumnsType {
    title: string;
    dataIndex: string;
    key: string;
    [propName: string]: any;
}

interface DataType {
    key: string;
    [propName: string]:any;
}

interface Props {
    columns: ColumnsType[];
    data: DataType[];
    loading: boolean;
    pageConfig?: any;
    isPage?:boolean;
    pageSizeOptions?: string[];
    changePage?: Function;
    selectedRowKeys?:string[];
    changeSelectKeys?: (keys: string[]) => void
}

export default function TableComp({
    columns,
    data,
    loading, //pagination={}
    pageConfig = {
        total: 100,
        current: 1,
        pageSize: 10,
    },
    pageSizeOptions = ['10', '20', '50', '100'],
    isPage = true,
    changePage,
    selectedRowKeys,
    changeSelectKeys
}: Props): ReactElement {


    const onChangePage = (current, pageSize) => {
        console.log(current, pageSize)
        changePage && changePage(current, pageSize)
    }

    const selectChange = (selectedRowKeys) => {
        console.log(selectedRowKeys, '--')
        changeSelectKeys && changeSelectKeys(selectedRowKeys)
    }

    return (
        <>
            <Table 
                rowSelection={{
                    selectedRowKeys,
                    onChange: selectChange
                }}
                columns={columns} 
                dataSource={data} 
                loading={loading} 
                pagination={false}
            />
            {isPage && <Pagination
                total={pageConfig.total}
                pageSize={pageConfig.pageSize}
                current={pageConfig.current}
                pageSizeOptions={pageSizeOptions}
                showSizeChanger
                showQuickJumper
                onChange={onChangePage}
                showTotal={total => `共计 ${pageConfig.total} 页`}
            />}
        </>
    )
}
