import React, { ReactElement, useState, useEffect } from 'react'
import FilterSearch from './components/FilterSearch'
import Table from '@/component/Table'
import { Switch, Space, Button, Form } from 'antd'
import { ColumnsType, DataType } from '@/type'
import DelBtn from '@/component/DelBtn'
import { EditFilled, PlusOutlined } from '@ant-design/icons'

interface Props {
    
}

export default function ShopCategory({}: Props): ReactElement {
    const [form] = Form.useForm()

    const [tabelData, setTableData] = useState({
        data: [],
        pageConfig: {
            total: 20,
            current: 1,
            pageSize: 10,
        },
        loading: false,
    })
    const [params, setParams] = useState<any>({})
    const [editingKey, setEditingKey] = useState<string>('');
    const isEditing = (record: any) => record.key === editingKey;

    const startSearch = (params: any) => {
        setParams(params)
        console.log(params)
    }

    const resetFn = () => {

    }

    const getData = (current: number, pageSize: number, params?: any) => {
        let list: any[] = []
        setTableData(pre => ({...pre, loading: true}))
        setTimeout(() => {
            for(let i=0; i<pageSize; i++) {
                list.push({
                    key: i + '' + current,
                    catagoryName: '分类' + current,
                    status: Math.random() > 0.5 ? true : false
                })
            }
            setTableData({
                data: list,
                pageConfig: {
                    total: 100,
                    current,
                    pageSize
                },
                loading: false
            })
        }, 1000);

    }

    useEffect(() => {
        getData(1, 10)
    }, [])
    const changePage = (current, pageSize) => {
        getData(current, pageSize, params)
    }

    const changeStatus = (key, status) => {
        console.log(key)
        setTableData((data: any) => {
            let newData = {...data}
            newData.data.forEach(item => {
                if(item.key === key) {
                    item.status = !status
                }
            })
            return newData
        })
    }

    const confirm = () => {

    }

    const edit = (record: any) => {
        form.setFieldsValue({...record})
        setEditingKey(record.key)
    }

    const columns: ColumnsType[] = [
        {
            key: 'a',
            title: '序号',
            dataIndex: 'index',
            align: 'center',
            render: (text,record, index) => {
                let { current, pageSize } = tabelData.pageConfig
                return <div>{index + 1 + (current - 1) * pageSize}</div>
                console.log(record, index)
            }
        },
        {
            key: 'b',
            title: '分类名称',
            dataIndex: 'catagoryName',
            align: 'center'
        },
        {
            key: 'c',
            title: '状态',
            dataIndex: 'status',
            align: 'center',
            render: (text, record) => {
                let { status, key } = record
                return <Switch checked={status} onChange={() => changeStatus(key, status)} />
            }
        },
        {
            key: 'd',
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            render: (text, record, index): ReactElement => {
                const editable = isEditing(record)
                return (
                    <Space>
                        <Button type="link" shape="circle" block icon={<EditFilled />} onClick={() => edit(record)}/>
                        <DelBtn text="确定删除商品分类吗？" confirm= {confirm} />
                    </Space>
                )
            }
        },
    ]
    return (
        <div>
            <FilterSearch startSearch={startSearch} resetFn={resetFn} />
            <Table 
                columns={columns}
                data={tabelData.data}
                loading={tabelData.loading}
                pageConfig={tabelData.pageConfig}
                changePage={changePage}
            />
        </div>
    )
}
