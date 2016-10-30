import prefix from '../prefix'
import { database } from '../firebase'
import colorsActions from './colors'

const actions = prefix('colleges')([
  'BEGIN_FETCH_COLLEGE',
  'FINISH_FETCH_COLLEGE'
])

export const fetchCollege = (id) => (dispatch, getState, cb) => {
  if (!id && id !== 0) return // cmon man
  if (getState().colleges[id]) return // we've already got the college
  if (getState().colleges[id] === false) return // we're already getting the college
  dispatch({ type: actions.BEGIN_FETCH_COLLEGE, payload: id })
  database.ref(`colleges/${id}`).once('value').then(s => {
    dispatch({ type: actions.FINISH_FETCH_COLLEGE, payload: { [id]: s.val() } })
    if (cb) cb(s)
  }).catch(e => {
    throw e
  })
}

export const fetchAllMyColleges = () => (dispatch, getState) => {
  getState().mycolleges.list.forEach(c => dispatch(fetchCollege(c)))
}

export const fetchCollegeThenSetColors = (id) => (dispatch, getState) => {
  if (getState().colleges[id]) {
    // we already have it
    const college = getState().colleges[id]
    dispatch({ type: colorsActions.SET_COLORS, payload: [ college.colorPrimary ] })
  } else if (getState().colleges[id] === false) {
    // we're already getting it but we can't attach a listener there so we're just
    // gonna get it again
    database.ref(`colleges/${id}`).once('value').then(s => {
      dispatch({ type: colorsActions.SET_COLORS, payload: [ s.val().colorPrimary ] })
    })
  } else {
    // we haven't got it so we're gonna get it again
    fetchCollege(id)(dispatch, getState, (s) => {
      dispatch({ type: colorsActions.SET_COLORS, payload: [ s.val().colorPrimary ] })
    })
  }
}

export const fetchCollegeList = () => (dispatch) => {
  dispatch(fetchCollege('list'))
}

export const updateCollege = (id, updates) => (dispatch, getState) => {
  database.ref(`colleges/${id}`).update({
    ...updates
  }, () => {
    dispatch({ type: actions.FINISH_FETCH_COLLEGE, payload: { [id]: { ...getState().colleges[id], ...updates } } })
  })
}

export const searchForCollegeByName = (name) => (dispatch, getState) => {
  database.ref('colleges').orderByChild('name')
}

export const addDecisionPlan = (id) => (dispatch, getState) => {
  let newPlan = database.ref(`colleges/${id}/decisionPlans`).push()
  newPlan.set({ type: 'R' }, () => {
    dispatch({
      type: actions.FINISH_FETCH_COLLEGE,
      payload: { [id]: { ...getState().colleges[id], decisionPlans: { ...getState().colleges[id].decisionPlans, [newPlan.key]: { type: 'R' } } } }
    })
  })
}

export const updateDecisionPlan = (id, key, updates) => (dispatch, getState) => {
  database.ref(`colleges/${id}/decisionPlans/${key}`).update({ ...updates }, () => {
    dispatch({
      type: actions.FINISH_FETCH_COLLEGE,
      payload: { [id]: { ...getState().colleges[id], decisionPlans: { ...getState().colleges[id].decisionPlans, [key]: { ...updates } } } }
    })
  })
}

export const addQuestion = (id) => (dispatch, getState) => {
  let newPlan = database.ref(`colleges/${id}/questions`).push()
  newPlan.set({ prompt: '' }, () => {
    dispatch({
      type: actions.FINISH_FETCH_COLLEGE,
      payload: { [id]: { ...getState().colleges[id], questions: { ...getState().colleges[id].questions, [newPlan.key]: { prompt: '' } } } }
    })
  })
}

export const updateQuestion = (id, key, updates) => (dispatch, getState) => {
  database.ref(`colleges/${id}/questions/${key}`).update({ ...updates }, () => {
    dispatch({
      type: actions.FINISH_FETCH_COLLEGE,
      payload: { [id]: { ...getState().colleges[id], questions: { ...getState().colleges[id].questions, [key]: { ...updates } } } }
    })
  })
}

export default actions
