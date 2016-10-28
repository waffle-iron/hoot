import prefix from '../prefix'
import { auth, database } from '../firebase'

const actions = prefix('apps')([
  'INIT_ITEMS',
  'SET_ITEMS',
  'ADD_APP',
  'REMOVE_APP'
])

export const addApp = (id) => (dispatch) => {
  const ref = database.ref(`users/${auth.currentUser.uid}/apps/${id}`)
  ref.set({ id }, () => {
    dispatch({ type: actions.ADD_APP, payload: { id } })
  })
}

export const removeApp = (id) => (dispatch) => {
  const ref = database.ref(`users/${auth.currentUser.uid}/apps/${id}`)
  ref.remove().then(() => {
    dispatch({ type: actions.REMOVE_APP, payload: { id } })
  })
}

export const fetchApps = () => (dispatch) => {
  database.ref(`users/${auth.currentUser.uid}/apps`).once('value').then(snapshot => {
    dispatch({
      type: actions.INIT_ITEMS,
      payload: snapshot.val()
        ? snapshot.val()
        : {}
    })
  })
}

export default actions
