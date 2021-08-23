import React, { ReactElement } from 'react'
import { Table, Pagination } from 'antd'
import { ColumnsType, DataType } from '@/type'
import BaseTable from './BaseTable'
import CheckTable from './CheckTable'
import './index.less'



interface Props {
    columns: ColumnsType[];
    data: DataType[];
    loading: boolean;
    type?: string;
    pageConfig?: any;
    isPage?:boolean;
    pageSizeOptions?: string[];
    changePage?: Function;
    selectedRowKeys?:string[];
    changeSelectKeys?: (keys: string[]) => void
}

export default function TableComp(props: Props): ReactElement {
    const {
        type = 'baseTable',
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
    } = props

    const onChangePage = (current, pageSize) => {
        changePage && changePage(current, pageSize)
    }

    const selectChange = (selectedRowKeys) => {
        changeSelectKeys && changeSelectKeys(selectedRowKeys)
    }

    const getTable = (type): ReactElement => {
        switch(type) {
            case 'CheckTable':
                return <CheckTable {...props} />;
            default:
                return <BaseTable {...props} />;
        }
    }

    return (
        <>
            { getTable(type) }
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
