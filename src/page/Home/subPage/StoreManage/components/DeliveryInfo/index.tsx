import React, { ReactElement } from 'react'
import StoreForm from '../StoreForm';

interface Props {
    
}

export default function DeliveryInfo({}: Props): ReactElement {

    const formList = [
        {
            type: 'input',
            name: 'deliveryName',
            label: '快递名称',
            rules: [
                {required: true, message: '快递名称必填'}
            ]
        }
    ]

    return (
        <div className='store_info'>
            <StoreForm formList={formList} submitText='下一步' infoType='deliveryInfo'/>
        </div>
    )
}