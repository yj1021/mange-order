import React, { ReactElement, useEffect, useState } from 'react'
import moment from 'moment'


interface Props {
    
}

export default function Time({}: Props): ReactElement {
    const [time, setTime] = useState<string>()

    useEffect(() => {
        let timer = setInterval(() => {
            let date = new Date()
            let data_format = moment(date).format('YYYY-MM-DD HH:mm:ss')
            setTime(data_format)
        }, 1000)
    }, [])

    return (
        <div>
            {time}            
        </div>
    )
}
