import {createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return null
        }
    },
})

export const {setNotification, removeNotification} = notificationSlice.actions

export const flashNotification = (content, seconds) => {
    return dispatch => {
        dispatch(setNotification(content))
        setTimeout(() => dispatch(removeNotification()), seconds * 1000)
    }
}
export default notificationSlice.reducer


