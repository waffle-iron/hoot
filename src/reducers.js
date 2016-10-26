import loginActions from './actions/login'
import colorsActions from './actions/colors'
import collegesActions from './actions/colleges'
import profileActions from './actions/profile'

export function login (state = { loggedIn: false, attemptingLogin: false, error: null }, action) {
  switch (action.type) {
    case loginActions.BEGIN_LOGIN: return { ...state, attemptingLogin: true }
    case loginActions.LOGIN_SUCCESS: return { ...state, attemptingLogin: false, error: null }
    case loginActions.LOGIN_FAILURE: return { ...state, attemptingLogin: false, error: action.payload }
    case loginActions.CLEAR_ERROR: return { ...state, error: null }
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

export function colleges (state = { list: [], fetched: false }, action) {
  switch (action.type) {
    case collegesActions.SET_COLLEGES: return { list: [ ...action.payload ], fetched: true }
    case collegesActions.ADD_COLLEGE: return { ...state, list: [ ...state.list, action.payload ] }
    case collegesActions.REMOVE_COLLEGE: return { ...state, list: state.list.filter(id => id !== action.payload) }
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
