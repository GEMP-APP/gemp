import { createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import DefaultReducer from './reducers/DefaultReducer'

const reducers = combineReducers({
    DefaultReducer,
    //add another reducer if necessary
})



const store = createStore(reducers, applyMiddleware(thunk))

export default store