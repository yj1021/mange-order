import React, { ReactElement, ReactNode } from 'react'
import { Card } from 'antd'

interface Props {
    children: ReactNode
}

export default function Config({
    children
}: Props): ReactElement {
    return (
        <Card>
            {children}
        </Card>
    )
}
