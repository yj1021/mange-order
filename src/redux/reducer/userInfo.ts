import { USERINFO, ClEAR_INFO } from '../type'

interface UserInfoType {
    username: string;
    role: string;
    [propName: string]: any;
}

const sessionUserIfo = JSON.parse(sessionStorage.userInfo || '{}')

const userInfo: UserInfoType = {
    username: sessionUserIfo.username || '',
    role: sessionUserIfo.role || 'super',
    token: sessionUserIfo.token || ''
}

export default (state = userInfo, action) => {
    let { type, format } = action
    switch(type) {
        case USERINFO:
            let userInfo = Object.assign({}, state, format)
            sessionStorage.userInfo = JSON.stringify({...userInfo})
            return userInfo
        case ClEAR_INFO:
            let resState = {...state}
            for(let key in resState) {
                resState[key] = ''
            }
            sessionStorage.openKeys = ''
            sessionStorage.userInfo = ''
            return resState
        default:
            return state
    }
}