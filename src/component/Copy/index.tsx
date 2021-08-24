import React, { ReactElement, useEffect } from 'react'
import { notification, Tooltip } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import _ from 'lodash'
import './index.less'

interface Props {
    text: string;
}

export default function ClipboardComp({
    text
}: Props): ReactElement {

    const copy = _.throttle(() => {
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value', text);
        input.setAttribute('readonly', 'readonly');
        input.select();
        input.setSelectionRange(0, text.length);
        if (document.execCommand('copy')) {
            notification.success({
                message: '复制结果',
                description: '复制成功',
                duration: 1
            })
        } else {
            notification.success({
                message: '复制结果',
                description: '复制成功',
                duration: 1
            })
        }

        document.body.removeChild(input);
    }, 1000)
    return (
        <Tooltip placement="rightTop" title='复制'>
            <div className='copy' onClick={copy}>
                <EditOutlined />
            </div>
        </Tooltip>
        
    )
}
