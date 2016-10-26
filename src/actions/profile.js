import prefix from '../prefix'
import { auth, database } from '../firebase'

const actions = prefix('profile')([
  'INIT_ITEMS',
  'SET_ITEMS'
])

export const setItems = (items) => (dispatch, getState) => {
  database.ref(`users/${auth.currentUser.uid}/profile`).set({
    ...getState().profile.items,
    ...items
  }, () => {
    dispatch({
      type: actions.SET_ITEMS,
      payload: { ...items }
    })
  })
}

export const fetchProfile = () => (dispatch) => {
  database.ref(`users/${auth.currentUser.uid}/profile`).once('value').then(snapshot => {
    dispatch({
      type: actions.INIT_ITEMS,
      payload: snapshot.val()
    })
  })
}

export default actions
