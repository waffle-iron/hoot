import prefix from '../prefix'
import { auth } from '../firebase'
import { fetchColors } from './colors'
import { fetchColleges } from './colleges'
import { fetchProfile } from './profile'

const actions = prefix('login')([
  'BEGIN_LOGIN',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
  'CLEAR_ERROR'
])

// let dispatcher = _ => null
let timeout
// so we don't call LOGIN_SUCCESS a shitton we only set it up here
// auth.onAuthStateChanged((user) => {
//   if (user) {
//     dispatcher({ type: actions.LOGIN_SUCCESS })
//     dispatcher(fetchColors())
//     dispatcher(fetchColleges())
//     dispatcher(push('/dashboard'))
//   }
// })

export default actions

export function login (email, password) {
  clearTimeout(timeout)
  return (dispatch) => {
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
    dispatch({ type: actions.BEGIN_LOGIN })
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      dispatch({ type: actions.LOGIN_FAILURE, payload: error })
      timeout = setTimeout(() => {
        dispatch({ type: actions.CLEAR_ERROR })
      }, 5000)
    })
  }
}

export const resume = () => (dispatch) => {
  console.log('resuming')
  dispatch({ type: actions.LOGIN_SUCCESS })
  dispatch(fetchColors())
  dispatch(fetchColleges())
  dispatch(fetchProfile())
}
