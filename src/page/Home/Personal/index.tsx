import React, { ReactElement } from 'react'
import { Card } from 'antd'
import { useSelector } from 'react-redux'
import { ROLETYPE } from '@/contants/contants'

interface Props {
    
}

export default function Personal({}: Props): ReactElement {
    const userInfo = useSelector((state: any) => state.userInfo)
    console.log(userInfo, '--')

    return (
        <Card style={{padding: 10}}>
            <p>
                <span>用户名:</span>{userInfo.username}
            </p>
            <p>
                <span>角色类型:</span>{ROLETYPE[userInfo.role]}
            </p>
        </Card>
    )
}
