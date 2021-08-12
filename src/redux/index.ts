import { createStore, combineReducers } from 'redux'
import userInfo from './reducer/userInfo'
import menuInfo from './reducer/menu'

const reducers = combineReducers({
    userInfo,
    menuInfo
})

const store = createStore(reducers)

export default store