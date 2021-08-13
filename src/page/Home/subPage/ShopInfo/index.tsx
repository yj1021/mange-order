import React, { ReactElement, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function ShopInfo({children}: Props): ReactElement {
    return (
        <div>
            商店信息
            {children}
        </div>
    )
}
