import loginActions from './actions/login'

export function login (state = { loggedIn: false, attemptingLogin: false, error: null, user: null }, action) {
  switch (action.type) {
    case loginActions.BEGIN_LOGIN: return { ...state, attemptingLogin: true }
    case loginActions.LOGIN_SUCCESS: return { ...state, attemptingLogin: false, loggedIn: true, error: null, user: { ...action.payload } }
    case loginActions.LOGIN_FAILURE: return { ...state, attemptingLogin: false, loggedIn: false, error: action.payload }
    default: return state
  }
}
