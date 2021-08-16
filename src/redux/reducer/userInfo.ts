import { USERINFO } from '../type'

interface UserInfoType {
    username: string;
    role: string;
    [propName: string]: any;
}

const userInfo: UserInfoType = {
    username: sessionStorage.userInfo && (JSON.parse(sessionStorage.userInfo) as any).username,
    role: 'super'
}

export default (state = userInfo, action) => {
    let { type, format } = action
    switch(type) {
        case USERINFO:
            return Object.assign({}, state, format)
        default:
            return state
    }
}