import { push } from 'react-router-redux'

import { auth, database } from '../firebase'
import prefix from '../prefix'
import { fetchCollege } from './colleges'

const actions = prefix('mycolleges')([
  'SET_COLLEGES',
  'ADD_COLLEGE',
  'REMOVE_COLLEGE'
])

export function goToCollege (id) {
  return (dispatch) => {
    dispatch(push(`/college/${id}`))
  }
}

export const addCollege = (id) => (dispatch) => {
  const colleges = database.ref(`users/${auth.currentUser.uid}/colleges`)
  const newCollege = colleges.push()
  newCollege.set({ id })
  dispatch(fetchCollege(id))
  dispatch({ type: actions.ADD_COLLEGE, payload: id })
}

export const removeCollege = (id) => (dispatch) => {
  database.ref(`users/${auth.currentUser.uid}/colleges`).orderByChild('id').equalTo(id).once('value').then(snapshot => {
    snapshot.ref.child(Object.keys(snapshot.val())[0]).remove().then(() => {
      dispatch({ type: actions.REMOVE_COLLEGE, payload: id })
    })
  })
}

export const fetchColleges = (cb) => (dispatch) => {
  database.ref(`users/${auth.currentUser.uid}/colleges`).once('value').then(snapshot => {
    dispatch({
      type: actions.SET_COLLEGES,
      payload: snapshot.val()
        ? Object.keys(snapshot.val()).map(k => snapshot.val()[k].id)
        : []
    })
    if (cb) cb()
  })
}

export default actions
