import React, { ReactElement, useState, ReactChild, useEffect } from 'react'
import { Card, Button } from 'antd'
import StoreContainer from './components/StoreContainer/index';
import { useSelector, useDispatch } from 'react-redux'
import { CLEAR_STORE_INFO } from '@/redux/type'
import Init from './components/Init'
import BaseInfo from './components/BaseInfo'
import StoreInfo from './components/ShoreInfo'

interface Props {
    
}

interface HeaderType {
    title: string;
    className: string;
    components: ReactChild
}

export default function StoreManage({}: Props): ReactElement {

    const dispatch = useDispatch()
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

    useEffect(() => {
        if(!start) {
            dispatch({
                type: CLEAR_STORE_INFO
            })
        }
    }, [start])

    const headerList: HeaderType[] = [
        {
            title: '初始化',
            className: 'icon-xinjian',
            components: <Init />
        },
        {
            title: '基本信息',
            className: 'icon-jibenxinxi',
            components: <BaseInfo />
        },
        {
            title: '商店信息',
            className: 'icon-shangdian',
            components: <StoreInfo />
        },
        {
            title: '风控信息',
            className: 'icon-RectangleCopy',
            components: <div>123</div>
        },
        {
            title: '账号信息',
            className: 'icon-zhanghaoxinxi',
            components: <div>123</div>
        },
        {
            title: '快递信息',
            className: 'icon-kuaidi',
            components: <div>123</div>
        },
        {
            title: '支付方式',
            className: 'icon-zhifu',
            components: <div>123</div>
        },
        {
            title: '审核',
            className: 'icon-shenhe',
            components: <div>123</div>
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
