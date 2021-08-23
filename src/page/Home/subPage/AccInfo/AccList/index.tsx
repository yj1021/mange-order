import React, { ReactElement, useState } from 'react'
import ExpandTable from '@/component/Table/ExpandTable/index';
import BaseTable from '@/component/Table/BaseTable';
import { ColumnsType } from '@/type'
import { ROLETYPE } from '@/contants/contants'
import { notification } from 'antd'
import DelBtn from '@/component/button/DelBtn';

interface Props {
    
}

interface DataType {
    acc: string;
    role: string;
    key: string;
}

const mockData = []

for(let i=0; i<10; i++) {
    mockData.push({
        key: i + '',
        acc: 'admin' + i,
        role: Math.random() > 0.5 ? 'super' : 'normal'
    })
}

export default function AccList({}: Props): ReactElement {

    const [data, setData] = useState<DataType[]>(mockData)

    const confirm = () => {
        notification.error({
            message: '结果通知',
            description: '删除失败，稍后再试'
        })
    }

    const columns: ColumnsType[] = [
        { 
            title: '序号', 
            dataIndex: 'index', 
            key: 'index',
            render: (text, record, index): any => <div>{index + 1}</div>,
            align: 'center'
        },
        { title: '账号', dataIndex: 'acc', key: 'acc', align: 'center' },
        { 
            title: '权限', 
            dataIndex: 'role', 
            key: 'role', 
            align: 'center',
            render: (text) => <div>{ROLETYPE[text]}</div>,
            filters: [
                { text: '普通管理员', value: 'normal' },
                { text: '超级管理员', value: 'super' },
            ],
        },
        { 
            title: '操作', 
            dataIndex: 'action', 
            key: 'action',
            render: () => <><DelBtn text='确定删除该账号?' confirm={confirm} /></>, 
            align: 'center'
        },
    ]

    const changeTable = (page, filters, sorter) => {
        setData(() => {
            let newData = [...mockData]
            return newData.filter(item => filters.role.includes(item.role))
        })
    }

    const expandedRowRender = (): any => {
        const expandColumns = [
            { title: 'Name', dataIndex: 'name', key: 'name', align: 'center' },
            { title: 'Age', dataIndex: 'age', key: 'age', align: 'center' },
            { title: 'Address', dataIndex: 'address', key: 'address', align: 'center' },
        ]

        const expandData = [
            {
                key: '11',
                name: '1',
                age: 21,
                address: '四川省是单身单身大叔大'
            }
        ]
        
        return <BaseTable columns={expandColumns} data={expandData} loading={false} />
    }

    return (
        <div>
            <ExpandTable columns={columns} data={data} loading={false} expandedRowRender={expandedRowRender} onChange={changeTable} />
        </div>
    )
}
