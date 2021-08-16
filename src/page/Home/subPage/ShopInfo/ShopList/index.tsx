import React, { ReactElement, useState, useEffect } from 'react'
import Table from '@/component/Table'
import { Space, Button, Card } from 'antd';
import { EditFilled, PlusOutlined } from '@ant-design/icons'
import DelBtn from '@/component/DelBtn'
import FilterSearch from './components/FilterSearch'
import './index.less'
interface Props {
    
}

export default function ShopList({}: Props): ReactElement {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageConfig, setPageConfig] = useState<any>({
        total: 100,
        current: 1,
        pageSize: 10,
    })

    useEffect(() => {
        getData(1, 10)
    }, [])

    const confirm = () => {
        console.log('确定')
    }

    

    const getData = (current, pageSize) => {
        setLoading(true)
        setTimeout(() => {
            let arr = []
            for(let i=0; i<pageSize; i++) {
                arr.push({
                    key: i + '' + current,
                    a: i + '10' + current,
                    b: i + '--' + current
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
        getData(current, pageSize)
    }

    const columns = [
        {
            title: 'a',
            dataIndex: 'a',
            key: 'a',
            
        },
        {
            title: 'b',
            dataIndex: 'b',
            key: 'b'
        },
        {
            title: 'c',
            dataIndex: 'c',
            key: 'c'
        },
        {
            title: 'd',
            dataIndex: 'd',
            key: 'd'
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

    return (
        <Card className="shopList">
            <div className="search_header">
                <FilterSearch />
                <Space style={{marginBottom: 20}}>
                    <Button type='primary' icon={<PlusOutlined />}>新增</Button>
                    <Button danger>批量删除</Button>
                </Space>
            </div>
            <Table 
                columns={columns} 
                data={data} 
                loading={loading}
                pageConfig={pageConfig}
                changePage={changePage}
            />
        </Card>
    )
}
