const initialState = {
    userNick: ''
}

const userReducer = (state=initialState, action) => {

    switch(action.type) {
        case 'changeUserNick':
            console.log('changing user nickname..')
            return {...state, userNick: action.payload.userNick}
        case 'resetUserNick':
            console.log('resetting user nickname..')
            return {...state, userNick: ''}
        default:
            return state
    }
}

export default userReducer