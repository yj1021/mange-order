import React, { ReactElement } from 'react'
import BaseForm from '@/component/BaseForm'
import './index.less'

interface Props {
    formList: any[];
    style?: any;
    startSearch: (any) => void;
    resetFn?: () => void;
}

export default function FilterSearch({
    formList,
    style = {marginBottom: 20},
    startSearch,
    resetFn
}: Props): ReactElement {

    const getFormData = (val) => {
        startSearch(val)
    }

    return (
        <div className="filterSearch" style={style}>
            <BaseForm formList={formList} getFormData={getFormData} layout="inline" resetFn={resetFn}/>
        </div>
    )
}
