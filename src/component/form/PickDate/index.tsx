import React, { ReactElement, useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment';

interface Props {
    getTimeRange: (any) => void
    showTimeRange: any[]
}

export default function PickDateRange({
    getTimeRange,
    showTimeRange
}: Props): ReactElement {


    const [startTime, setStartTime] = useState(showTimeRange[0] && moment(showTimeRange[0]) || null)
    const [endTime, setEndTime] = useState(showTimeRange[1] && moment(showTimeRange[1]) || null)
    const [timeRange, setTimeRange] = useState<any[]>([])

    const startDisabledDate = (current) => {
        return current && current >= moment().endOf('day');
    }

    const endDisabledDate = (current) => {
        if(!startTime) {
            return true
        } 
        return current && current < startTime || current >= moment().endOf('day');
    }

    const getTime = (time) => {
            return moment(time).format('YYYY-MM-DD')
        }

    const startChange = (time) => {
        setStartTime(time)
        setEndTime(null)
        setTimeRange(() => {
            let arrT = []
            arrT[0] = getTime(time)
            return arrT
        })
    }

    const endChange = (time) => {
        setEndTime(time)
        setTimeRange(t => {
            let arrT = [...t]
            arrT[1] = getTime(time)
            return arrT
        })
    }

    useEffect(() => {
        getTimeRange(timeRange)
    }, [timeRange])

    return (
        <div className='time_range' style={{ width: 300 }}>
            <DatePicker 
                disabledDate={startDisabledDate}
                value={startTime}
                onChange={startChange}
            />
            <span style={{ margin: '0 10px' }}>~</span>
            <DatePicker 
                disabledDate={endDisabledDate}
                value={endTime}
                onChange={endChange}
            />
        </div>
    )
}
