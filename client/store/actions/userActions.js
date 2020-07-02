export function changeUserNick (value) {
    return (dispatch) => {
        dispatch({
            type: "changeUserNick",
            payload: {
                userNick: value
            }
        })
    }
}

export function fetchRoomData () {
    return (dispatch) => {
        fetch('http://54.169.11.236:4000/rooms')
        .then( response => response.json)
        .then( data =>{
            dispatch({
                type: 'storeRoomData',
                payload: {
                    roomData: data
                }
            })
        })
    }
}

export function resetRoomData () {
    return (dispatch) => {
        dispatch({
            type: 'resetRoomData'
        })
        
    }
}