import React, { ReactElement, useState, useEffect } from 'react'
import { Card } from 'antd';
import Echarts from '@/component/Echarts'
import { commonOption, barOption, initEchartsData } from '@/contants/echarts'
import moment from 'moment'
import _ from 'lodash'
import './index.less'

interface Props {
    style?: any
}

export default function TurnOver({
    style
}: Props): ReactElement {

    const [echartsData, setEchartsData] = useState<any>(initEchartsData)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        let newEchartsData = _.cloneDeep({...echartsData, options: {...commonOption,...barOption}})
        setLoading(true)
        window.setTimeout(() => {
            let timeArr = []
            for(let i=0; i<7; i++) {
                timeArr.push(moment(new Date().getTime() - 1000 * 60 * 60 * 24 * (6 -i)).format('YYYY-MM-DD'))
            }
            newEchartsData.options.title.text = '营业额'
            newEchartsData.options.xAxis.axisLabel = { 
                // inside:true,
                rotate: 45
            }
            newEchartsData.options.xAxis.data = timeArr
            newEchartsData.options.series = [{
                type: 'bar',
                data: [10, 20, 3, 14, 5, 6, 17],
                name: '营业额'
            }]
            setEchartsData(() => {
                setLoading(false)
                return {...newEchartsData}
            })
        }, 1000);
    }, [])

    return (
        <>
            <Card style={style} className="my_card">
                <Echarts echartsData={echartsData} loading={loading}/>
            </Card>
        </>
    )
}
