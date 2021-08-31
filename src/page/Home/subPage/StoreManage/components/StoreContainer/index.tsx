import React, { ReactElement, ReactChild, useEffect, useState } from 'react'
import { Button, Space } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { MAX_STEP, CHANGE_STEP } from '@/redux/type'
import './index.less'

interface Props {
    headerList: any[];
    children: ReactChild;
}


//{iconfont: true, [item.className]: true}
export default function StoreContainer({
    headerList,
    children
}: Props): ReactElement {

    const dispatch = useDispatch()
    const step = useSelector((state: any) => state.storeInfo.step)
    const maxStep = useSelector((state: any) => state.storeInfo.maxStep)

    useEffect(() => {
        if(step > maxStep) {
            dispatch({
                type: MAX_STEP,
                params: step
            })
        }
    }, [step])

    const headerClick = (status: boolean, index: number) => {
        if(!status) return
        dispatch({
            type: CHANGE_STEP,
            params: index
        })
    }

    return (
        <div className='store'>
            <div className='current_modules'>当前模块: <span>{ headerList[step].title }</span></div>
            <div className='store_header'>
                {
                    headerList.map((item, index) => (
                        <div className={['header_item', index <= maxStep ? 'active' : ''].join(' ')} key={item.title} onClick={() => headerClick(index <= maxStep, index)}>
                            <i className={['iconfont', item.className].join(' ')}></i>
                            {index < headerList.length -1 && <i className='iconfont icon-jiantou1'></i> }
                            <div>{ item.title }</div>
                        </div>
                    ))
                }
            </div>
            <div className='store_main'>
                { children }
            </div>
        </div>
    )
}


// <div className='store_footer'>
//     <Space>
//         {step > 0 && <Button onClick={() => setStep(n => n-1)}>上一步</Button>}
//         {step < headerList.length - 1 && <Button htmlType="submit" onClick={() => setStep(n => n+1)}>下一步</Button>}
//         {step === headerList.length - 1 && <Button>提交</Button>}
//     </Space>
// </div>
