import { USERINFO } from '../type'

interface UserInfoType {
    username: string;
    [propName: string]: any;
}

const userInfo = {
    username: ''
}

export default (state = userInfo, action) => {
    let { type, format } = action
    switch(type) {
        case USERINFO:
            console.log(Object.assign({}, state, format), '00')
            return Object.assign({}, state, format)
        default:
            return state
    }
}