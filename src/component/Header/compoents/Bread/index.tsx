import React, { ReactElement } from 'react'
import { Breadcrumb } from 'antd';
import { useSelector } from 'react-redux'

const { Item } = Breadcrumb

interface Props {
    
}

export default function Bread({}: Props): ReactElement {
    const menuInfo = useSelector((state: any) => state.menuInfo).breadInfo
    console.log(menuInfo, '--')
    return (
        <Breadcrumb>
            {menuInfo.map(bread => {
                let { path, name } = bread
                return <Item key={name}>{name}</Item>
            })}
        </Breadcrumb>
    )
}
