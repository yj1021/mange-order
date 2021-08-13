import React, { ReactElement, useEffect } from 'react'
import { TOTAL_YEAR } from '@/contants/contants'
import { Card, Select } from 'antd'

const { Option } = Select;
interface Props {
    style?: any;
    className?: string;
    setYear: Function;
    initVal?: string;
}

export default function Selector({
    style = { width: 120 },
    className,
    setYear,
    initVal
}: Props): ReactElement {


    const handleChange = (val) => {
        setYear(val)
    }

    // useEffect(() => {
    //     setYear(TOTAL_YEAR[0].label)
    // }, [])
    return (
        <Select defaultValue={initVal} style={style} onChange={handleChange} className={className}>
            { TOTAL_YEAR.map(item => <Option value={item.label} key={item.label}>{item.name}</Option>) }
        </Select>
    )
}
