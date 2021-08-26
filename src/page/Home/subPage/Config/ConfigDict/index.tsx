import React, { ReactElement, useState, useEffect, useRef } from 'react'
// import Copy from '@/component/Copy'
import Header from './components/Header'
import Table from '@/component/Table'
import { ColumnsType, DataType } from '@/type'
import Copy from '@/component/Copy'
import { Space } from 'antd'
import UrlTable from './components/UrlTable'
import './index.less'

interface PanaType {
    title: string;
    content: any;
    key: string;
    closable?: boolean,
}

interface Props {
    
}

export default function ConfigDict({}: Props): ReactElement {

    const [activeKey, setActiveKey] = useState<string>('1')
    const [paneList, setPaneList] = useState<PanaType[]>([])
    const [tableData, setTableData] = useState<DataType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const listRef: any = useRef()

    useEffect(() => {
        listRef.current = paneList
    }, [paneList])

    const addPanas = (type: string, val: string) => {
        if(type === 'url') {
            let value = val.substr(-1)
            let key = 'url_title' + value
            let listItem = {
                key,
                title: key,
                content: <UrlTable title={val}/>
            }
            let item: any = listRef.current.find(item => item.key === key)
            if(item) {
                setActiveKey(item.key)
                return
            }
            setPaneList(list => {
                setActiveKey(key)
                return [...list, listItem]
            })
        }
    }

    const columns: ColumnsType[] = [
        {
            key: 'index',
            title: '序号',
            dataIndex: 'index',
            align: 'center',
            render: (_, record, index) => {
                return index + 1
            }
        },
        {
            key: 'url',
            title: '网址',
            dataIndex: 'url',
            align: 'center',
            render: (text, record) => {
                return (
                    <Space>
                        <div className='c1890ff' onClick={() => addPanas('url', text)}>{text}</div>
                        <Copy text={text}/>
                    </Space>
                )
            }
        },
        {
            key: 'joinNum',
            title: '访问人数',
            dataIndex: 'joinNum',
            align: 'center',
        },
        {
            key: 'dictType',
            title: '字典种类',
            dataIndex: 'dictType',
            align: 'center',
        },
        {
            key: 'action',
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            render: () => {
                return <div className='c1890ff'>查看</div>
            }
        },
    ]

    useEffect(() => {
        let arr = []
        for(let i=0; i<10; i++) {
            arr.push({
                key: 'index' + i,
                url: 'http://www.baidu.com' + i,
                joinNum: Math.floor(Math.random() * 100000),
                dictType: 'type'
            })
        }
        setPaneList([
            {
                title: '主表格',
                content: <Table 
                    columns={columns}
                    data={arr}
                    loading={loading}
                    isPage={false}
                />,
                key: '1',
                closable: false,
            }
        ])
    }, [])
    

    return (
        <div className='config_dict'>
            <Header 
                activeKey={activeKey} 
                setActiveKey={setActiveKey}
                paneList={paneList}
                setPaneList={setPaneList}
            />
        </div>
    )
}
