import React, { ReactElement } from 'react'
import StoreForm from '../StoreForm';
import { STORE_TYPE } from '@/contants/contants'
import { useSelector } from 'react-redux'

interface Props {
    
}

export default function Init({}: Props): ReactElement {
    const changeType = (val) => {
        console.log(val)
    }

    const formList = [
        {
            type: 'checkbox',
            name: 'storeType',
            label: '商户类型',
            optionList: STORE_TYPE,
            rules: [
                {required: true, message: '商户类型必选'}
            ],
            onChange: changeType
        }
    ]

    return (
        <div className='init'>
            <StoreForm formList={formList} submitText='下一步' infoType='init'/>
        </div>
    )
}
