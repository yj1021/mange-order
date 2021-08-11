import { createStore, combineReducers } from 'redux'
import userInfo from './reducer/userInfo'

const reducers = combineReducers({
    userInfo
})

const store = createStore(reducers)

export default store