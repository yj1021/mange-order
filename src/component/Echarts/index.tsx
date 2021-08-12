import React, { ReactElement, useRef, useEffect } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect';
import * as echarts from 'echarts'
import './index.less'

interface Props {
    echartsData: {
        options: any,
        configs: {
            noData: boolean,
            loading: false
        }
    }
}

export default function EchartsComp({
    echartsData
}: Props): ReactElement {

    const echartsRef = useRef()

    const riseChange = (myEcharts: any) => {
        myEcharts.resize()
    }

    useEffect(() => {
        console.log(12122112)
    })

    useDeepCompareEffect(() => {
        let { options, configs } = echartsData
        let { loading } = configs
        if(!echartsRef.current) return
        console.log(echartsData, '-dasdasdasdas')
        let myEcharts = echarts.init(echartsRef.current)
        console.log(loading, 'loading')
        if(loading) {
            myEcharts.showLoading()
        }else{
            myEcharts.hideLoading()
        }

        !loading && myEcharts.setOption(options)

        window.addEventListener('resize', () => riseChange(myEcharts), false)

        return () => {
            window.removeEventListener('resize', () => riseChange(myEcharts), false)
        }

    }, [echartsData])

    return (
        <div className="my_echarts">
            {
                echartsData.configs.noData ? <div>没有数据</div> :
                <div className='echarts' ref={echartsRef}></div>
            }
        </div>
    )
}
