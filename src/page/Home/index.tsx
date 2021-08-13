import React, { ReactElement, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import Layout from '@/component/Layout';

interface Iprops {
    children: ReactNode
}

export default (props: Iprops): ReactElement => {
    let { children } = props
    const userInfo = useSelector((state: any) => state.userInfo)
    return (
        <>
            <Layout children={children}/>
        </>
    )
}
