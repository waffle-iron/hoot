import { push } from 'react-router-redux'

import prefix from '../prefix'
import { auth, database } from '../firebase'
import { fetchColors } from './colors'
import { fetchColleges } from './mycolleges'
import { fetchProfile } from './profile'
import { fetchApps } from './apps'
import { fetchAllMyColleges, fetchCollege } from './colleges'

const actions = prefix('login')([
  'BEGIN_LOGIN',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
  'CLEAR_ERROR',
  'SET_INSTITUTE'
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

export function login (email, password, location) {
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

export function signup (email, password, location) {
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

export const resume = (location) => (dispatch) => {
  dispatch({ type: actions.LOGIN_SUCCESS })
  dispatch(fetchColleges(() => {
    dispatch(fetchAllMyColleges(() => {
      dispatch(fetchColors())
    }))
  }))
  dispatch(fetchProfile())
  dispatch(fetchApps())
  dispatch(push(location.state.nextPathname))
  database.ref(`users/${auth.currentUser.uid}/institution`).once('value').then(s => {
    if (s.val() || s.val() === 0) {
      dispatch({ type: actions.SET_INSTITUTE, payload: s.val() })
      dispatch(fetchCollege(s.val()))
      dispatch(push('/instituteDash'))
    }
  })
}
