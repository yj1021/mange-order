import { CHANGE_STEP, ADD_STORE_INFO, MAX_STEP, CLEAR_STORE_INFO } from '../type'

const storeInfo = {
    step: 0,
    maxStep: localStorage.maxStep || 0
}

export default (state = storeInfo, action) => {
    let { type, params } = action
    switch(type) {
        case CHANGE_STEP:
            return {...state, step: params}
        case MAX_STEP:
            localStorage.maxStep = params
            return {...state, maxStep: params}
        case ADD_STORE_INFO:
            return {...state, ...params}
        case CLEAR_STORE_INFO:
            let obj = {
                step: 0,
                maxStep: 0
            }
            localStorage.maxStep = ''
            return obj
        default:
            return state
    }
}