import React, { ReactElement } from 'react'
import { Select } from 'antd'

const { Option } = Select

interface OptionType {
    label: string;
    name: string;
}


interface Props {
    defaultValue: string;
    optionList: OptionType[];
    className?: string;
    onChange: (any) => void;
}

export default function SelectComp({
    optionList,
    defaultValue,
    className,
    onChange
}: Props): ReactElement {
    return (
        <Select
            onChange={onChange}
            defaultValue={defaultValue}
            style={{ width: 200 }}
            className={className}
        >
            {optionList.map(option => {
                let { name, label } = option
                return <Option value={name}>{label}</Option>
            })}
        </Select>
    )
}
