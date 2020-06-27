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