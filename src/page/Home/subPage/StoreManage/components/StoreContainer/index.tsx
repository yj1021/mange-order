import React, { ReactElement, ReactChild } from 'react'
import { Button, Space } from 'antd'
import { useSelector } from 'react-redux'
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

    const step = useSelector((state: any) => state.storeInfo.step) 


    return (
        <div className='store'>
            <div className='store_header'>
                {
                    headerList.map((item, index) => (
                        <div className={['header_item', index <= step ? 'active' : ''].join(' ')}>
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
