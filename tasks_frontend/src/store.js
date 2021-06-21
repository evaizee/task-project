import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import allReducers from './Reducers/taskReducers'

const initalState = {

}

const middleware = [thunk]

const store = createStore(allReducers, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;