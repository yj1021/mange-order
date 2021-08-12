import React, { ReactElement } from 'react'
import Bread from './compoents/Bread/index';
import User from './compoents/User'
import './index.less'

interface Iprops {

}

export default ({}: Iprops): ReactElement => {
    return (
        <div className='my_header'>
            <Bread />
            <User />
        </div>
    )
}