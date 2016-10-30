import prefix from '../prefix'

import { auth, database } from '../firebase'

const actions = prefix('color')([
  'SET_COLORFUL',
  'UNSET_COLORFUL',
  'ADD_COLOR',
  'REMOVE_COLOR',
  'SET_COLORS',
  'DEFAULT_COLORS'
])

export const fetchColors = () => (dispatch, getState) => {
  if (!auth.currentUser) {
    dispatch({ type: actions.SET_COLORS, payload: ['#000000'] })
  } else {
    database.ref(`users/${auth.currentUser.uid}/colleges`).once('value').then((s) => {
      const v = s.val()
      if (!v) {
        dispatch({ type: actions.SET_COLORS, payload: ['#000000'] })
      } else {
        dispatch({ type: actions.SET_COLORS, payload: Object.keys(v).map(k => getState().colleges[v[k].id] ? getState().colleges[v[k].id].colorPrimary : '#000') })
      }
    })
  }
}

export default actions
