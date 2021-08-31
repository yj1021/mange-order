import React, { ReactElement, useState } from 'react'
import StoreForm from '../StoreForm';
import { APY_TYPE } from '@/contants/contants'
import { Form, Input } from 'antd'
import FormList from '@/component/form/FormList'

interface Props {
    
}

export default function PayInfo({}: Props): ReactElement {

    const onChange = (val) => {
        console.log(val)
    }

    const formList = [
        {
            type: 'select',
            name: 'PayInfo',
            label: '支付方式',
            rules: [
                {required: true, message: '支付方式必填'}
            ],
            optionList: APY_TYPE,
            onChange: onChange
        }
    ]

    const childList = [
        {
            type: 'input',
            name: 'child1',
            label: '子项1',
            rules: [
                {required: true, message: '子项1必填'}
            ],
            onChange: onChange
        }
    ]



    return (
        <div className='store_info'>
            <StoreForm formList={formList} submitText='下一步' infoType='payInfo'>
                <div>
                    <FormList formList={childList} />
                </div>
            </StoreForm >
        </div>
    )
}