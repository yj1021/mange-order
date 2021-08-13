import React, { ReactElement } from 'react'
import TurnOver from './components/TurnOver'
import SalesVolume from './components/SalesVolume/index';
import Profit from './components/Profit/index';
import TotalData from './components/TotalData/index';
import './index.less'

interface Props {
    
}

export default function Home({}: Props): ReactElement {
    return (
        <div className="home_warpper">
            <div className="home_row">
                <TurnOver />
                <SalesVolume />
                <Profit />
            </div>
            <div className="home_row">
                <TotalData />
            </div>
        </div>
    )
}
