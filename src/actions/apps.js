import prefix from '../prefix'
import { auth, database } from '../firebase'

const actions = prefix('apps')([
  'INIT_ITEMS',
  'UPDATE_ITEMS',
  'ADD_APP',
  'REMOVE_APP'
])

export const addApp = (id) => {
  return (dispatch) => {
    const ref = database.ref(`users/${auth.currentUser.uid}/apps/${id}`)
    ref.set({ id }, () => {
      dispatch({ type: actions.ADD_APP, payload: { id } })
    })
  }
}
export const setAppPlan = (id, plan) => (dispatch, getState) => {
  const ref = database.ref(`users/${auth.currentUser.uid}/apps/${id}`)
  ref.set({ ...getState().apps.items[id], plan }, () => {
    dispatch({ type: actions.UPDATE_ITEMS, payload: { [id]: { ...getState().apps.items[id], plan } } })
  })
}

export const removeAppPlan = (id) => (dispatch, getState) => {
  const ref = database.ref(`users/${auth.currentUser.uid}/apps/${id}`)
  ref.set({ ...getState().apps.items[id], plan: null }, () => {
    dispatch({ type: actions.UPDATE_ITEMS, payload: { [id]: { ...getState().apps.items[id], plan: null } } })
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
