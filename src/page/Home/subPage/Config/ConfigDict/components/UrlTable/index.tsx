import React, { ReactElement, useState, useEffect } from 'react'
import Table from '@/component/Table'
import { ColumnsType, DataType } from '@/type'

interface Props {
    title: string;
}

export default function UrlTable({
    title
}: Props): ReactElement {

    const [data, setData] = useState<DataType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        console.log(1)
        let list = []
        for(let i=0; i<10; i++) {
            list.push({
                uv: Math.floor(Math.random() * 10000),
                pv: Math.floor(Math.random() * 100000),
                timeLong: Math.floor(Math.random() * 100000000),
                onlineNum: Math.floor(Math.random() * 10000)
            })
        }
        setLoading(true)
        setTimeout(() => {
            setData(() => {
                setLoading(false)
               return list
            })
        }, 1000)
        
    }, [])

    const columns: ColumnsType[] = [
        {
            key: 'index1',
            dataIndex: 'index',
            title: '序号',
            render: (_, record, index) => {
                return index + 1
            }
        },
        {
            key: 'uv',
            dataIndex: 'uv',
            title: '进站人数uv'
        },
        {
            key: 'pv',
            dataIndex: 'pv',
            title: '进站次数pv'
        },
        {
            key: 'timeLong',
            dataIndex: 'timeLong',
            title: '停留时长',
            render: (text) => {
                let h: number | string = Math.floor(text / (1000 * 60 * 60))
                let m: number | string = Math.floor(text / 1000 * 60 % 60)
                let s: number | string = Math.floor(text / 1000 % 60)
                h = h >= 10 ? h : ('0' + h)
                m = m >= 10 ? m : ('0' + m)
                s = s >= 10 ? s : ('0' + s)
                return `${h}时${m}分${s}秒`
            }
        },
        {
            key: 'onlineNum',
            dataIndex: 'onlineNum',
            title: '在线人数'
        },
    ]

    return (
        <>
            <div style={{margin: '20px'}}>网址:{title}</div>
            <Table columns={columns} data={data} loading={loading} isPage={false}/>
        </>
    )
}
