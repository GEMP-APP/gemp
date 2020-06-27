import { createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import defaultReducer from './reducers/defaultReducer'
console.log(defaultReducer)
const reducers = combineReducers({
    defaultReducer,
    //add another reducer if necessary
})



const store = createStore(reducers, applyMiddleware(thunk))

export default store