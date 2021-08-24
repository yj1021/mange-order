import React, { ReactElement, useRef, useEffect } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect';
import * as echarts from 'echarts'
import { usePrevious } from '@/hooks'
import './index.less'

interface Props {
    echartsData: {
        options: any,
        configs: {
            noData: boolean
        }
    },
    loading?: boolean;
    onClick?: Function;
}

export default function EchartsComp({
    echartsData,
    loading,
    onClick
}: Props): ReactElement {

    const echartsRef = useRef()
    const obj = usePrevious(echartsData)

    const riseChange = (myEcharts: any) => {
        myEcharts.resize()
    }

    useEffect(() => {
        let { options, configs } = echartsData
        // let { loading } = configs
        if(!echartsRef.current) return
        let myEcharts = echarts.init(echartsRef.current)
        myEcharts.off('click')
        if(loading) {
            myEcharts.showLoading()
            return
        }else{
            myEcharts.hideLoading()
        }

        !loading && myEcharts.setOption(options)

        myEcharts.on('click', (params): void => {
            onClick && onClick(params)
        })

        window.addEventListener('resize', () => riseChange(myEcharts), false)

        return () => {
            window.removeEventListener('resize', () => riseChange(myEcharts), false)
        }
    }, [obj, loading])

    return (
        <div className="my_echarts">
            {
                echartsData.configs.noData ? <div>没有数据</div> :
                <div className='echarts' ref={echartsRef}></div>
            }
        </div>
    )
}
