import React, { ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Card } from 'antd'
import { useSelector } from 'react-redux'
import Header from './components/Header'

interface Props {
    
}

export default function StoreInfo({}: Props): ReactElement {

    const location: any = useLocation()

    const storeInfo = useSelector((state: any) => state.storeInfo)
    console.log(location);

    useEffect(() => {
        let num = 10000000
        let str = num.toString().replace(/(?=(?!\b)(\d{3})+$)/g, ',')
        console.log(str);
        
    }, [])
    

    return (
        <Card>
            商店信息: {location.state?.name + '-' + location.state?.seriesName + '-' + location.state?.value}
            {location.state && <div>店名:{location.state.seriesName}</div>}
            <Header />
        </Card>
    )
}
