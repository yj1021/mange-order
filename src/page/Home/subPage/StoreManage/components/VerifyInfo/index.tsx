import React, { ReactElement, useState } from 'react'
import StoreForm from '../StoreForm';
import { APY_TYPE } from '@/contants/contants'
import './index.less'

interface Props {
    
}

export default function VerityInfo({}: Props): ReactElement {

    const formList = [
        {
            type: 'select',
            name: 'personList',
            label: '审核人',
            rules: [
                {required: true, message: '审核人必填'}
            ],
            optionList: APY_TYPE
        },
        {
            type: 'textArea',
            name: 'remark',
            label: '审核意见',
            rules: [
                {required: true, message: '审核意见必填'}
            ],
            maxLength: 80
        }
    ]

    return (
        <div className='verify_info'>
            <StoreForm formList={formList} submitText='提交' infoType='verityInfo'/>
        </div>
    )
}