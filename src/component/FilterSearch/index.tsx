import React, { ReactElement } from 'react'
import BaseForm from '@/component/BaseForm'
import './index.less'

interface Props {
    formList: any[];
    style?: any;
}

export default function FilterSearch({
    formList,
    style = {marginBottom: 20}
}: Props): ReactElement {

    const getFormData = (val) => {
        console.log(val)
    }

    return (
        <div className="filterSearch" style={style}>
            <BaseForm formList={formList} getFormData={getFormData} layout="inline"/>
        </div>
    )
}
