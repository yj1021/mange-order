import { CHANGE_STEP } from '../type'

const storeInfo = {
    step: 0
}

export default (state = storeInfo, action) => {
    let { type, params } = action
    switch(type) {
        case CHANGE_STEP:
            return {...state, step: params}
        default:
            return state
    }
}