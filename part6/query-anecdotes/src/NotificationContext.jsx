import { createContext, useReducer, useContext } from 'react'

const initialState = null

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'VOTE':
    return `Voted for anecdote: '${action.payload}'`
  case 'CREATE':
    return `Created anecdote: '${action.payload}'`
  case 'RESET':
    return initialState
  case 'ERROR':
    return `There was an error: '${action.payload}'`
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    0
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}
