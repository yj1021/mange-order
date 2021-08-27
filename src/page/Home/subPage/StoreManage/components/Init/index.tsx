import React, { ReactElement } from 'react'
import StoreForm from '../StoreForm';
import { STORE_TYPE } from '@/contants/contants'

interface Props {
    
}

export default function Init({}: Props): ReactElement {
    const formList = [
        {
            type: 'checkbox',
            name: 'storeType',
            label: '商户类型',
            optionList: STORE_TYPE,
            rules: [
                {required: true, message: '商户类型必选'}
            ]
        }
    ]



    const getFormData = () => {}
    return (
        <div>
            <StoreForm formList={formList} getFormData={getFormData} submitText='下一步' />
        </div>
    )
}
