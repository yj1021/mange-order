import React, { ReactElement } from 'react'
import classnames from 'classnames'
import './index.less'

interface Props {
    key: string;
    type: string;
    tip: string;
    icon: string;
    isActive: boolean;
}

export default function PayType({
    key,
    type,
    tip,
    icon,
    isActive
}: Props): ReactElement {
    return (
        <div className='pay_type_item'>
            <i className={classnames('iconfont',{[icon]: true, active: isActive})} />
            <div>
                <div>类型:{type}</div>
                <div className='tip'>提示:{tip}</div>
            </div>
        </div>
    )
}
