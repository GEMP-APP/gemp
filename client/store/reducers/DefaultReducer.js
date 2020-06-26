const defaultState  = {
    tempVar: 'OK' //temporary variable, for testing
}

const DefaultReducer = (state=DefaultReducer, action) => {

    switch (action.type) {
        case 'changeTempVar':
            console.log('changing TempVar value..')
            return {...state, tempVar: action.payload.tempVar}
        case 'emptyTempVar':
            console.log('emptying tempVar..')
            return {...state, tempVar: ''}
        case 'addTempVar':
            console.log('adding tempVar..')
            return {...state, tempVar: state.tempVar + action.payload.tempVar}
        default:
            return state
    }   
}

export default DefaultReducer