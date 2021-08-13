import React, { ReactElement, useState, useEffect } from 'react'
import { Card } from 'antd'
import Echarts from '@/component/Echarts'
import { commonOption, pieOption, initEchartsData } from '@/contants/echarts'
import _ from 'lodash'


interface Props {
    style?: any
}

export default function Profit({
    style
}: Props): ReactElement {
    const [echartsData, setEchartsData] = useState<any>(initEchartsData)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        let newEchartsData = _.cloneDeep({...echartsData, options: {...commonOption,...pieOption}})
        setLoading(true)
        window.setTimeout(() => {
            newEchartsData.options.title.text = '利润统计'
            newEchartsData.options.xAxis.data = []
            newEchartsData.options.xAxis.axisPointer.type = 'none'
            newEchartsData.options.series = [{
                type: 'pie',
                data: [
                    {value: 40, name: '店 1'},
                    {value: 38, name: '店 2'},
                    {value: 32, name: '店 3'},
                    {value: 30, name: '店 4'},
                ],
                name: '店1'
            }]
            setEchartsData(() => {
                setLoading(false)
                return {...newEchartsData}
            })
        }, 1000);
    }, [])

    return (
        <Card style={style}>
            <Echarts echartsData={echartsData} loading={loading} />
        </Card>
    )
}
