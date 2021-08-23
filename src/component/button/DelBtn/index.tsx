import React, { ReactElement } from 'react'
import { Button, Popconfirm } from 'antd';
import { DeleteFilled } from '@ant-design/icons'

interface Props {
    text: string;
    type?: string;
    confirm: (any) => void;
}

export default function DelBtn({
    text,
    type,
    confirm
}: Props): ReactElement {

    const getRenderButton = (type: string): ReactElement => {
        switch(type){
            case 'all':
                return <Button danger>批量删除</Button>;
            case 'cacel':
                return <Button type='ghost'>取消</Button>;
            default:
                return <Button type="link" shape="circle" danger block icon={<DeleteFilled />} />
        };
    }

    return (
        <div>
            <Popconfirm placement="bottom" title={text} onConfirm={confirm} okText="确定" cancelText="取消">
                { getRenderButton(type) }
            </Popconfirm>
        </div>
    )
}
