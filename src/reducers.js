import loginActions from './actions/login'
import colorsActions from './actions/colors'
import mycollegesActions from './actions/mycolleges'
import profileActions from './actions/profile'
import appsActions from './actions/apps'
import collegesActions from './actions/colleges'

export function login (state = { loggedIn: false, attemptingLogin: false, error: null, institute: null }, action) {
  switch (action.type) {
    case loginActions.BEGIN_LOGIN: return { ...state, attemptingLogin: true }
    case loginActions.LOGIN_SUCCESS: return { ...state, attemptingLogin: false, error: null }
    case loginActions.LOGIN_FAILURE: return { ...state, attemptingLogin: false, error: action.payload }
    case loginActions.CLEAR_ERROR: return { ...state, error: null }
    case loginActions.SET_INSTITUTE: return { ...state, institute: action.payload }
    default: return state
  }
}

export function colors (state = { colorful: false, colors: ['#000000'] }, action) {
  switch (action.type) {
    case colorsActions.SET_COLORFUL: return { ...state, colorful: true }
    case colorsActions.UNSET_COLORFUL: return { ...state, colorful: false }
    case colorsActions.ADD_COLOR: return { ...state, colors: [ ...state.colors, action.payload ] }
    case colorsActions.REMOVE_COLOR: return { ...state, colors: state.colors.filter(c => c !== action.payload) }
    case colorsActions.SET_COLORS: return { ...state, colors: [ ...action.payload ] }
    case colorsActions.DEFAULT_COLORS: return { colorful: false, colors: ['#000000'] }
    default: return state
  }
}

export function mycolleges (state = { list: [], fetched: false }, action) {
  switch (action.type) {
    case mycollegesActions.SET_COLLEGES: return { list: [ ...action.payload ], fetched: true }
    case mycollegesActions.ADD_COLLEGE: return { ...state, list: [ ...state.list, action.payload ] }
    case mycollegesActions.REMOVE_COLLEGE: return { ...state, list: state.list.filter(id => id !== action.payload) }
    default: return state
  }
}

export function profile (state = { items: {}, fetched: false }, action) {
  switch (action.type) {
    case profileActions.INIT_ITEMS: return { items: { ...action.payload }, fetched: true }
    case profileActions.SET_ITEMS: return { ...state, items: { ...state.items, ...action.payload } }
    default: return state
  }
}

export function apps (state = { items: {}, fetched: false }, action) {
  switch (action.type) {
    case appsActions.INIT_ITEMS: return { items: { ...action.payload }, fetched: true }
    case appsActions.ADD_APP: return { ...state, items: { ...state.items, [action.payload.id]: { ...action.payload } } }
    case appsActions.REMOVE_APP: return { ...state, items: { ...state.items, [action.payload.id]: null } }
    case appsActions.UPDATE_ITEMS: return { ...state, items: { ...state.items, ...action.payload } }
    default: return state
  }
}

export function colleges (state = {}, action) {
  switch (action.type) {
    case collegesActions.BEGIN_FETCH_COLLEGE: return { ...state, [action.payload]: false }
    case collegesActions.FINISH_FETCH_COLLEGE: return { ...state, ...action.payload }
    default: return state
  }
}
