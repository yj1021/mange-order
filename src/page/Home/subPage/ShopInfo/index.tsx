import React, { ReactElement, ReactNode } from 'react'
import { Card } from 'antd'

interface Props {
    children: ReactNode
}

export default function ShopInfo({children}: Props): ReactElement {
    return (
        <Card>
            {children}
        </Card>
    )
}
