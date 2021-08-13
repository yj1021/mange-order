import { CHANGEMENU } from '../type'
const menuInfo = {
    currentPath: '',
    breadInfo: []
}

export default (state = menuInfo, action) => {
    let { type, format } = action
    switch(type) {
        case CHANGEMENU:
            return Object.assign({}, state, format)
        default:
            return state
    }
}