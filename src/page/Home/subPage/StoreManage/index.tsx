import React, { ReactElement, useState, ReactChild, useEffect } from 'react'
import { Card, Button } from 'antd'
import StoreContainer from './components/StoreContainer/index';
import { useSelector, useDispatch } from 'react-redux'
import { CLEAR_STORE_INFO, GET_SUM_COUNT } from '@/redux/type'
import Init from './components/Init'
import BaseInfo from './components/BaseInfo'
import StoreInfo from './components/ShoreInfo'
import AccInfo from './components/AccInfo'
import DeliveryInfo from './components/DeliveryInfo/index';
import PayInfo from './components/PayInfo/index';
import VerifyInfo from './components/VerifyInfo/index';
import Risk from './components/Risk/index';



interface Props {
    
}

interface HeaderType {
    title: string;
    className: string;
    components: ReactChild
}

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
        components: <Risk />
    },
    {
        title: '账号信息',
        className: 'icon-zhanghaoxinxi',
        components: <AccInfo />
    },
    {
        title: '快递信息',
        className: 'icon-kuaidi',
        components: <DeliveryInfo />
    },
    {
        title: '支付方式',
        className: 'icon-zhifu',
        components: <PayInfo />
    },
    {
        title: '审核',
        className: 'icon-shenhe',
        components: <VerifyInfo />
    }
]


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


    useEffect(() => {
        dispatch({
            type: GET_SUM_COUNT,
            params: headerList.length
        })
    }, [])
    

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
