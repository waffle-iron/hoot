import { push } from 'react-router-redux'
import { auth, database } from '../firebase'

export function goToCollege (id) {
  return (dispatch) => {
    dispatch(push(`/college/${id}`))
  }
}

export function addCollege (id) {
  return (dispatch) => {
    const colleges = database.ref(`users/${auth.currentUser.uid}/colleges`)
    const newCollege = colleges.push()
    newCollege.set({ id })
  }
}
