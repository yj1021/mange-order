import { createStore, combineReducers } from 'redux'
import userInfo from './reducer/userInfo'
import menuInfo from './reducer/menu'
import storeInfo from './reducer/storeInfo'

const reducers = combineReducers({
    userInfo,
    menuInfo,
    storeInfo
})

const store = createStore(reducers)

export default store