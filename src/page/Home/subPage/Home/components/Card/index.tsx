import React, { ReactElement, useState, useEffect } from 'react'
import { Card, Button } from 'antd';
import Echarts from '@/component/Echarts'
import { commonOption, barOption } from '@/contants/echarts'
import './index.less'

interface Props {
    
}

export default function CardComp({}: Props): ReactElement {

    const initData = {
        options: {
            ...commonOption, 
            ...barOption,
            series: [{
                type: 'bar',
                data: [1,2,3,4]
            }]
        },
        configs: {
            noData: false,
            loading: false
        }
    }

    const [echartsData, setEchartsData] = useState<any>(initData)
    const [fresh, setFresh] = useState(false)

    useEffect(() => {
        // let newEchartsData = {...echartsData, options: {...commonOption, ...barOption}}
        // newEchartsData.configs.loading = true;
        // setEchartsData(newEchartsData)
        // window.setTimeout(() => {
        //     newEchartsData.configs.loading = false;
        //     newEchartsData.options.series = [{
        //         type: 'bar',
        //         data: [1,2,3,4]
        //     }]
        //     console.log(newEchartsData, Date.now())
        //     setEchartsData(newEchartsData)
        // }, 1000);
        setTimeout(() => {
            setEchartsData(data => {
                data.configs.loading =  false
                return data
            })
        }, 1000)
    }, [])

    return (
        <>
            <Card style={{ width: 300, height: 400 }} className="my_card">
                <Echarts echartsData={echartsData} />
                <button onClick={ () => {
                    // setFresh(!fresh)
                    setEchartsData(data => {
                        data.configs.loading =  false
                        data.fresh = 1
                        return data
                    })
                } }>dasdasdasdasd</button>
            </Card>
        </>
    )
}
