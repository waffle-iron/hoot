import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { push } from 'react-router-redux'

import Landing from './components/Landing'
import Wrapper from './components/Wrapper'
import LoginDialog from './components/LoginDialog'
import Tour from './components/Tour'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Colleges from './components/Colleges'
import CollegeInfo from './components/CollegeInfo'
import Essays from './components/Essays'

import { auth } from './firebase'
import { get } from './colleges'
import colorsActions, { fetchColors } from './actions/colors'
import { resume } from './actions/login'

require('./globals.scss')
require('font-awesome-webpack')

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
  const resumeAuth = (nextState) => {
    if (auth.currentUser) {
      store.dispatch(resume())
    } else {
      auth.onAuthStateChanged((user) => {
        store.dispatch(resume())
        store.dispatch(push('/dashboard'))
      })
    }
  }

  const setColors = (nextState) => {
    store.dispatch({
      type: colorsActions.SET_COLORS,
      payload: [get(nextState.params.id).colorPrimary]
    })

    store.dispatch({ type: colorsActions.SET_COLORFUL })
  }

  const resetColors = (nextState) => {
    store.dispatch(fetchColors())
    store.dispatch({ type: colorsActions.UNSET_COLORFUL })
  }

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={Wrapper} onEnter={resumeAuth}>
          <IndexRoute component={Landing} onEnter={ensureAuth(false)} />
          <Route path='/' onEnter={ensureAuth(false)}>
            <Route path='/login' component={Login(false)} />
            <Route path='/signup' component={Login(true)} />
          </Route>
          <Route path='/' onEnter={ensureAuth(true)}>
            <Route path='/' onEnter={resetColors}>
              <Route path='/tour' component={Tour} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/profile' component={Profile} />
              <Route path='/colleges' component={Colleges} />
              <Route path='/essays' component={Essays} />
            </Route>
            <Route path='/college/:id' component={CollegeInfo} onEnter={setColors} />
          </Route>
        </Route>
      </Router>
    </Provider>
  )
}
