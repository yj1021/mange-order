import React, { ReactElement, useState } from 'react'
import { Card, Button } from 'antd'
import StoreContainer from './components/StoreContainer/index';
import { useSelector } from 'react-redux'
import Init from './components/Init'

interface Props {
    
}

export default function StoreManage({}: Props): ReactElement {

    const [start, setStart] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const step = useSelector((state: any) => state.storeInfo.step) 

    const createStore = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setStart(true)
        }, 1000)
    }

    const headerList = [
        {
            title: '初始化',
            className: 'icon-xinjian',
            components: <Init />
        },
        {
            title: '基本信息',
            className: 'icon-jibenxinxi'
        },
        {
            title: '商店信息',
            className: 'icon-shangdian'
        },
        {
            title: '风控信息',
            className: 'icon-RectangleCopy'
        },
        {
            title: '账号信息',
            className: 'icon-zhanghaoxinxi'
        },
        {
            title: '快递信息',
            className: 'icon-kuaidi'
        },
        {
            title: '支付方式',
            className: 'icon-zhifu'
        },
        {
            title: '审核',
            className: 'icon-shenhe'
        }
    ]

    return (
        <Card>
            {!start && <Button type='primary' onClick={createStore} loading={loading}>新建商户</Button>}
            {start && 
                <StoreContainer 
                    headerList={headerList} 
                >
                    {headerList[step].components}
                </StoreContainer>}
        </Card>
    )
}
