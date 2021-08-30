import React, { ReactElement } from 'react'
import StoreForm from '../StoreForm';
import { CARD_TYPE } from '@/contants/contants'

interface Props {
    
}

export default function StoreInfo({}: Props): ReactElement {

    const formList = [
        {
            type: 'input',
            name: 'storeName',
            label: '商店名称',
            rules: [
                {required: true, message: '商店名称必填'}
            ]
        },
        {
            type: 'input',
            name: 'tip',
            label: '送餐费',
            rules: [
                {required: true, message: '送餐费必填'}
            ]
        },
        {
            type: 'input',
            name: 'sendTime',
            label: '配送时长',
            rules: [
                {required: true, message: '配送时长必填'}
            ]
        },
        {
            type: 'input',
            name: 'star',
            label: '满意程度',
            rules: [
                {required: true, message: '满意程度必填'}
            ]
        },
        {
            type: 'input',
            name: 'date',
            label: '营业时间',
            rules: [
                {required: true, message: '营业时间必填'}
            ],
            optionList: CARD_TYPE
        }
    ]

    return (
        <div>
            <StoreForm formList={formList} submitText='下一步'/>
        </div>
    )
}
