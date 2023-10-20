import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    }
  }
})

export const changeNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setNotification(message))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, time)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
