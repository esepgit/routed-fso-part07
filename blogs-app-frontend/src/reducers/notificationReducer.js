import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '' },
  reducers: {
    createNotification(state, action) {
      state.message = action.payload
    },
    removeNotification(state) {
      state.message = ''
    },
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message) => {
  return async dispatch => {
    dispatch(createNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
  }
}
export default notificationSlice.reducer