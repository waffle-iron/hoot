import prefix from '../prefix'
import { auth } from '../firebase'

const actions = prefix('login')([
  'BEGIN_LOGIN',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
  'CLEAR_ERROR'
])

let dispatcher = _ => null
let timeout
// so we don't call LOGIN_SUCCESS a shitton we only set it up here
auth.onAuthStateChanged((user) => {
  if (user) {
    dispatcher({ type: actions.LOGIN_SUCCESS, payload: user })
  }
})

export default actions

export function login (email, password) {
  clearTimeout(timeout)
  return (dispatch) => {
    dispatcher = dispatch // this is bad practice don't do this
    dispatch({ type: actions.BEGIN_LOGIN })
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      dispatch({ type: actions.LOGIN_FAILURE, payload: error })
      timeout = setTimeout(() => {
        dispatch({ type: actions.CLEAR_ERROR })
      }, 5000)
    })
  }
}

export function signup (email, password) {
  clearTimeout(timeout)
  return (dispatch) => {
    dispatcher = dispatch
    dispatch({ type: actions.BEGIN_LOGIN })
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      dispatch({ type: actions.LOGIN_FAILURE, payload: error })
      timeout = setTimeout(() => {
        dispatch({ type: actions.CLEAR_ERROR })
      }, 5000)
    })
  }
}
