import React, { ReactElement } from 'react'
import StoreForm from '../StoreForm';
import { CARD_TYPE } from '@/contants/contants'

interface Props {
    
}

export default function BaseInfo({}: Props): ReactElement {

    const formList = [
        {
            type: 'input',
            name: 'name',
            label: '商户名称',
            rules: [
                {required: true, message: '商户名称必填'}
            ]
        },
        {
            type: 'input',
            name: 'adress',
            label: '商户地址',
            rules: [
                {required: true, message: '商户地址必填'}
            ]
        },
        {
            type: 'input',
            name: 'tel',
            label: '商户联系方式',
            rules: [
                {required: true, message: '商户联系方式必填'}
            ]
        },
        {
            type: 'input',
            name: 'importTel',
            label: '商户紧急联系人',
            rules: [
                {required: true, message: '商户紧急联系人必填'}
            ]
        },
        {
            type: 'select',
            name: 'cardTypr',
            label: '商户证件类型',
            rules: [
                {required: true, message: '商户证件类型必选'}
            ],
            optionList: CARD_TYPE
        },
        {
            type: 'input',
            name: 'cardNum',
            label: '商户证件号码',
            rules: [
                {required: true, message: '商户证件号码必填'}
            ]
        }
    ]

    return (
        <div>
            <StoreForm formList={formList} submitText='下一步'/>
        </div>
    )
}
