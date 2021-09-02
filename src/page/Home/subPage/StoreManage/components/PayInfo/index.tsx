import React, { ReactElement, useState, useEffect } from 'react'
import StoreForm from '../StoreForm';
import { APY_TYPE } from '@/contants/contants'
import { Form, Input } from 'antd'
import FormList from '@/component/form/FormList'
import PayType from './components/PayType'
import { useSelector } from 'react-redux'
import './index.less'
interface Props {
    
}

const list = [
    {
        key: 'wx',
        type: '微信',
        tip: '微信扫码支付,信扫码支付,信扫码支付,信扫码支付',
        icon: 'icon-weixin',
        isActive: false,
    },
    {
        key: 'zfb',
        type: '支付宝',
        tip: '支付宝扫码支付,支付宝扫码支付,支付宝扫码支付,支付宝扫码支付',
        icon: 'icon-zhifubao',
        isActive: false,
    },
    {
        key: 'yl',
        type: '银联',
        tip: '银联扫码支付,银联扫码支付,银联扫码支付,银联扫码支付',
        icon: 'icon-zhifupingtai-yinlian',
        isActive: false,
    },
]

const mockObj = {
    wx: 3.9,
    zfb: 8.8,
    yl: 5.9
} 

export default function PayInfo({}: Props): ReactElement {

    const [type, setType] = useState<string>('')
    const [childList, setChildList] = useState<any[]>([])
    const [headerList, setHeaderList] = useState<any[]>(list)

    const storeInfo = useSelector((state: any) => state.storeInfo)
    
    useEffect(() => {
        let payType = storeInfo.payInfo?.payType
        if(payType) {
            setChildren(payType)
        }
        
    }, [])

    const onChange = (val) => {
        setChildren(val)
    }

    const setChildren = (val: string) => {
        let label = APY_TYPE.find(item => item.value === val)?.label
        setType(label || '')
        storeInfo.form.setFieldsValue({
            limit: mockObj[val]
        })
        setChildList([
            {
                type: 'number',
                name: 'limit',
                label: label + '费率上限',
                disabled: true,
                rules: [
                    {required: true, message: label + '费率必填'}
                ]
            },
            {
                type: 'number',
                name: 'child1',
                label: label + '费率',
                rules: [
                    {required: true, message: ''},
                    (({ getFieldValue }) => {
                        let limit = getFieldValue('limit')
                        return {
                            validator(_, value) {
                                if(!value) {
                                    return Promise.reject(label + '费率必填')
                                }

                                if(value > limit) {
                                    return Promise.reject(label + '费率不能大于上限')
                                }

                                return Promise.resolve()
                            }
                        }
                    })
                ],
                onChange: onChange
            }
        ])

        setHeaderList(list => {
            let newList = [...list]
            newList.map(item => {
                item.isActive = val === item.key
                return item
            })
            return newList
        })
    }

    const formList = [
        {
            type: 'select',
            name: 'payType',
            label: '支付方式',
            rules: [
                {required: true, message: '支付方式必填'}
            ],
            optionList: APY_TYPE,
            onChange: onChange
        }
    ]



    return (
        <div className='store_info'>
            <div className='header'>
                {headerList.map(item => <PayType {...item} key={item.key}/>)}
            </div>
            <StoreForm formList={formList} submitText='下一步' infoType='payInfo'>
                {type && <div className='child_form_item'>
                    <div className='title'>支付类型:{type}</div>
                    <div className='main'>
                        <FormList formList={childList} />
                    </div>
                </div>}
            </StoreForm >
        </div>
    )
}