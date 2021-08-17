import React, { ReactElement } from 'react'
import FilterSearch from '@/component/FilterSearch';
import { SHOP_STATUS } from '@/contants/contants'

interface Props {
    startSearch: (any) => void;
    [propName:string]: any;
}

export default function FilterSearchShopList(props: Props): ReactElement {

    const formList = [
        {
            type: 'text',
            name: 'shopName',
            label: '商品名'
        },
        {
            type: 'select',
            name: 'shopStatus',
            label: '商品状态',
            optionList: SHOP_STATUS
        }
    ]
    return (
        <FilterSearch formList={formList} {...props}/>
    )
}
