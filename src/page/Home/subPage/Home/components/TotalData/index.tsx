import React, { ReactElement, useState, useEffect } from 'react'
import { Card } from 'antd'
import Echarts from '@/component/Echarts'
import { commonOption, lineOption, initEchartsData } from '@/contants/echarts'
import Select from '@/component/Selector'
import { TOTAL_YEAR } from '@/contants/contants'
import { getRandomNum } from '@/utils/tool'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import './index.less'

interface Props {
    style?: any;
}

export default function TotalData({
    style
}: Props): ReactElement {

    const history = useHistory()

    const [echartsData, setEchartsData] = useState<any>(initEchartsData)
    const [year, handlerYear] = useState(TOTAL_YEAR[0].label)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        let newEchartsData = _.cloneDeep({...echartsData, options: {...commonOption,...lineOption}})
        setLoading(true)
        window.setTimeout(() => {
            let timeArr = []
            let xData1 = []
            let xData2 = []
            let xData3 = []
            for(let i=1; i<=12; i++) {
                timeArr.push(year + '-' + (i < 10 ? '0' + i : i + ''))
            }
            newEchartsData.options.title.text = year + '年度利润'
            newEchartsData.options.xAxis.data = timeArr
            newEchartsData.options.xAxis.axisPointer.type = 'line'
            for(let i=0; i<12; i++) {
                xData1.push(getRandomNum(1, 100))
                xData2.push(getRandomNum(1, 100))
                xData3.push(getRandomNum(1, 100))
            }
            newEchartsData.options.series = [{
                type: 'line',
                data: xData1,
                name: '店1'
            },
            {
                type: 'line',
                data: xData2,
                name: '店2'
            },
            {
                type: 'line',
                data: xData3,
                name: '店3'
            }]
            setEchartsData(() => {
                setLoading(false)
                return {...newEchartsData}
            })
        }, 1000);
    }, [year])

    const setYear = (val: string): void => {
        handlerYear(val)
    }

    const clickFn = (params: any): void => {
        /* 
        ** seriesName: 店名
        ** value: 值
        ** name: 年月份
        */
        let { seriesName, value, name } = params
        history.push({
            pathname: '/main/storeInfo',
            state: {
                seriesName, 
                value, 
                name
            }
        })
    }

    return (
        <>
            <Card style={{...style, position: 'relative'}}>
                {!loading && <Select className="my_select" initVal={year} setYear={setYear} />}
                <Echarts echartsData={echartsData} loading={loading} onClick={clickFn}/>
            </Card>
        </>
    )
}
