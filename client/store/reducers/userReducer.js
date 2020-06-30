const initialState = {
    userNick: '',
    roomData: []
}

const userReducer = (state=initialState, action) => {

    switch(action.type) {
        case 'changeUserNick':
            console.log('changing user nickname..')
            return {...state, userNick: action.payload.userNick}
        case 'resetUserNick':
            console.log('resetting user nickname..')
            return {...state, userNick: ''}
        case 'storeRoomData':
            console.log('storing room data..')
            return {...state, roomData: action.payload.roomData}
        case 'resetRoomData':
            console.log('resetting room data..')
            return {...state, roomData: []}
        default:
            return state
    }
}

export default userReducer