import React, { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { Card } from 'antd'

interface Props {
    
}

export default function StoreInfo({}: Props): ReactElement {

    const location: any = useLocation()

    return (
        <Card>
            商店信息: {location.state?.name + '-' + location.state?.seriesName + '-' + location.state?.value}
            {location.state && <div>店名:{location.state.seriesName}</div>}
        </Card>
    )
}
