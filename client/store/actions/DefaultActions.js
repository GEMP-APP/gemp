export function changeTempVar (value) {
    return (dispatch) => {
        dispatch({
            type: 'changeTempVar',
            payload: {
                tempVar: value
            }
        })
    }
}

export function emptyTempVar (value) {
    return (dispatch) => {
        dispatch({
            type: 'emptyTempVar'
        })
    }
}

export function addTempVar (value) {
    return (dispatch) => {
        dispatch({
            type: 'addTempVar',
            payload: {
                tempVar: value
            }
        })
    }
}