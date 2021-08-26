import React, { ReactElement } from 'react'
import { Card, Button } from 'antd'

interface Props {
    
}

export default function StoreManage({}: Props): ReactElement {
    return (
        <Card>
            <Button type='primary'>新建商户</Button>
        </Card>
    )
}
