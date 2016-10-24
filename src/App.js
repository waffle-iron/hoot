import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import Landing from './components/Landing'
import Wrapper from './components/Wrapper'
import LoginDialog from './components/LoginDialog'
import Tour from './components/Tour'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'

import { auth } from './firebase'

require('./globals.scss')

// wrapper for login dialog
const Login = (signup) => ({ ...props }) => {
  return (
    <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
      <LoginDialog isSignup={signup} {...props} />
    </div>
  )
}

const ensureAuth = (state, redirect) => (nextState, replace) => {
  if (state ? !auth.currentUser : auth.currentUser) {
    replace({
      pathname: redirect || state ? '/login' : '/dashboard'
    })
  }
}

export default ({ store, history }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={Wrapper}>
          <IndexRoute component={Landing} onEnter={ensureAuth(false)} />
          <Route path='/login' component={Login(false)} />
          <Route path='/signup' component={Login(true)} />
          <Route path='/tour' component={Tour} onEnter={ensureAuth(false)} />
          <Route path='/dashboard' component={Dashboard} onEnter={ensureAuth(true)} />
          <Route path='/profile' component={Profile} onEnter={ensureAuth(true)} />
        </Route>
      </Router>
    </Provider>
  )
}
