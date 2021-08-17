import React, { ReactElement } from 'react'
import FilterSearch from '@/component/FilterSearch';
import { FormItem } from '@/type';

interface Props {
    startSearch: (any) => void;
    [propName: string]: any;
}

export default function FilterSearchCate(props: Props): ReactElement {
    console.log(props)
    const formList: FormItem[] = [
        {
            type: 'text',
            name: 'shopCategory',
            label: '商品分类'
        }

    ]

    return (
        <>
            <FilterSearch {...props} formList={formList} />
        </>
    )
}
