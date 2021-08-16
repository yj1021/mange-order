import React, { ReactElement } from 'react'
import { Button, Popconfirm } from 'antd';
import { DeleteFilled } from '@ant-design/icons'

interface Props {
    text: string;
    confirm: (any) => void;
}

export default function DelBtn({
    text,
    confirm
}: Props): ReactElement {
    return (
        <div>
            <Popconfirm placement="bottom" title={text} onConfirm={confirm} okText="确定" cancelText="取消">
                <Button type="link" shape="circle" block icon={<DeleteFilled />} />
            </Popconfirm>
        </div>
    )
}
