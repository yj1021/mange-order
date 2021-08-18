import axios from 'axios'
import { notification } from 'antd'
import { useHistory } from 'react-router-dom'

const history = useHistory()

const require = axios.create({
    timeout: 10000
})

require.interceptors.request.use((configs: any) => {
    if(localStorage.token) {
        configs.headers = {
            token: localStorage.token
        }
    }
    return configs
}, (error: any) => {
    notification.error({
        message: '接口错误',
        description: error
    })
    return Promise.reject(error)
})

require.interceptors.response.use((configs: any) => {
    switch(configs.status) {
        case 200:
            return configs
        case 200100: //TOKOEN 失效
            return history.push('/login')
        default:
            return notification.error({
                        message: '接口错误',
                        description: '未知错误'
                    })
    }
}, error => {
    notification.error({
        message: '接口错误',
        description: error
    })
    return Promise.reject(error)
})

export default require