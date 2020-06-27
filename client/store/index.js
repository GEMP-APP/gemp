import { createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import defaultReducer from './reducers/defaultReducer'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
    defaultReducer,
    userReducer
    //add another reducer if necessary
})



const store = createStore(reducers, applyMiddleware(thunk))

export default store