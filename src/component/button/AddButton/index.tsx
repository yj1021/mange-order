import React, { ReactElement } from 'react'
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

interface Props {
    text: string;
    onClick?: () => void;
}

export default function AddButton({
    text,
    onClick
}: Props): ReactElement {
    return (
        <>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => {
                onClick && onClick()
            }}>{text}</Button>
        </>
    )
}
