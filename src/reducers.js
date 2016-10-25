import loginActions from './actions/login'
import colorActions from './actions/color'

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
    case colorActions.SET_COLORFUL: return { ...state, colorful: true }
    case colorActions.UNSET_COLORFUL: return { ...state, colorful: false }
    case colorActions.ADD_COLOR: return { ...state, colors: [ ...state.colors, action.payload ] }
    case colorActions.REMOVE_COLOR: return { ...state, colors: state.colors.filter(c => c !== action.payload) }
    case colorActions.SET_COLORS: return { ...state, colors: [ ...action.payload ] }
    case colorActions.DEFAULT_COLORS: return { colorful: false, colors: ['#000000'] }
    default: return state
  }
}
