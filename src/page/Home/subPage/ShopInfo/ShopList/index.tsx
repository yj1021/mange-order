import React, { ReactElement, useState, useEffect } from 'react'
import Table from '@/component/Table'
import { Space, Button, notification } from 'antd';
import { EditFilled, PlusOutlined } from '@ant-design/icons'
import DelBtn from '@/component/DelBtn'
import FilterSearch from './components/FilterSearch'
import './index.less'
interface Props {
    
}

let selectKeys: string[] = []

export default function ShopList({}: Props): ReactElement {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
    const [pageConfig, setPageConfig] = useState<any>({
        total: 100,
        current: 1,
        pageSize: 10,
    })
    const [params, setParams] = useState<any>({})

    useEffect(() => {
        getData(1, 10)
    }, [])

    const confirm = () => {
        console.log('确定')
    }

    const getData = (current, pageSize, params: any = {}) => {
        let { shopName } = params
        setLoading(true)
        setTimeout(() => {
            let arr = []
            for(let i=0; i<pageSize; i++) {
                arr.push({
                    key: i + '' + current,
                    a: i + '10' + current + (shopName || '无'),
                    b: i + '--' + current,
                    e: i + 199 * 19809
                })
            }
            setPageConfig({
                total: 100,
                current,
                pageSize
            })
            setData(() => {
                setLoading(false)
                return arr
            })
        }, 1000)
    }

    const changePage = (current, pageSize) => {
        getData(current, pageSize, params)
    }

    const columns = [
        {
            title: 'a',
            dataIndex: 'a',
            key: 'a',
            align: 'center'
        },
        {
            title: 'b',
            dataIndex: 'b',
            key: 'b',
            align: 'center'
        },
        {
            title: 'c',
            dataIndex: 'c',
            key: 'c',
            align: 'center'
        },
        {
            title: 'd',
            dataIndex: 'd',
            key: 'd',
            align: 'center'
        },
        {
            title: '货剩余量',
            dataIndex: 'e',
            key: 'e',
            align: 'center'
        },
        {
            title: '操作',
            dataIndex: 'e',
            key: 'e',
            render: (text, record) => {
                return (
                    <Space>
                        <Button type="link" shape="circle" block icon={<EditFilled />} />
                        <DelBtn text="确定删除商品列表信息" confirm= {confirm} />
                    </Space>
                )
            },
            align: 'center'
        }
    ]

    const changeSelectKeys = (keys) => {
        console.log(keys, pageConfig)
        setSelectedRowKeys(keys)
    }

    const startSearch = (val) => {
        let { current, pageSize } = pageConfig
        setParams(val)
        getData(current, pageSize, val)
        
    }

    const resetFn = () => {
        setParams({})
        let { current, pageSize } = pageConfig
        getData(current, pageSize, {})
    }
    
    const confirmAll = () => {
        notification.error({
            message: '批量删除结果',
            description: '批量删除失败'
        })
    }

    return (
        <div className="shopList">
            <div className="search_header">
                <FilterSearch startSearch={startSearch} resetFn={resetFn} />
                <Space style={{marginBottom: 20}}>
                    <Button type='primary' icon={<PlusOutlined />}>新增</Button>
                    {selectedRowKeys.length > 1 && <DelBtn text="确定批量删除商品列表信息" confirm= {confirmAll} type='all' />}
                </Space>
            </div>
            <Space>
                {selectedRowKeys.length !== 0 && <Button type="primary" onClick={() => setSelectedRowKeys([])}>
                    全部取消
                </Button>}
                <div>{'已选中' + selectedRowKeys.length + '个'}</div>
            </Space>
            <Table 
                type="CheckTable"
                columns={columns} 
                data={data} 
                loading={loading}
                selectedRowKeys={selectedRowKeys}
                pageConfig={pageConfig}
                changePage={changePage}
                changeSelectKeys={changeSelectKeys}
            />
        </div>
    )
}
