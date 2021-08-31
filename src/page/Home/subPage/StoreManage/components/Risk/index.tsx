import React, { ReactElement, useCallback } from 'react'
import StoreForm from '../StoreForm';
import { useDispatch } from 'react-redux'
import { CLEAR_STORE_INFO } from '@/redux/type'
import { Button } from 'antd'
import './index.less'

interface Props {
    
}

let num = Math.random()

let status = num > 0.5

export default function Risk({}: Props): ReactElement {

    const formList = []

    const dispath = useCallback(useDispatch(), [])

    const BackInit = () => {
        dispath({
            type: CLEAR_STORE_INFO
        })
    }

    return (
        <div className='risk'>
            <div className='risk_result'>
                <i className={['iconfont', status ? 'icon-tongguo' : 'icon-butongguo'].join(' ')}></i>
                <p>{ status ? '通过' : '不通过' }</p>
            </div>
            {status ?
                <StoreForm formList={formList} submitText='下一步' infoType='risk'/>
                :
                <Button onClick={BackInit}>返回初始化</Button>
            }
        </div>
    )
}

