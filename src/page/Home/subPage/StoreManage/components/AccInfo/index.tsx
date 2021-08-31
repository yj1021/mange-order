import React, { ReactElement } from 'react'
import StoreForm from '../StoreForm';

interface Props {
    
}

export default function AccInfo({}: Props): ReactElement {

    const formList = [
        {
            type: 'input',
            name: 'accName',
            label: '账号名称',
            rules: [
                {required: true, message: '账号名称必填'}
            ]
        }
    ]

    return (
        <div className='store_info'>
            <StoreForm formList={formList} submitText='下一步' infoType='AccInfo'/>
        </div>
    )
}