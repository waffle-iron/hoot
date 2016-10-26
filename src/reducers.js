import loginActions from './actions/login'
import colorsActions from './actions/colors'

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

export function colleges (state = [], action) {
  switch (action.type) {
    default: return state
  }
}
