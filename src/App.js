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
import Essay from './components/Essay'
import InstitutionInput from './components/InstitutionInput'

import { auth, database } from './firebase'
import colorsActions, { fetchColors } from './actions/colors'
import { resume } from './actions/login'
import * as collegesActions from './actions/colleges'

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
  const resumeAuth = () => {
    if (auth.currentUser) {
      store.dispatch(resume())
    } else {
      auth.onAuthStateChanged((user) => {
        store.dispatch(resume())
        store.dispatch(push('/dashboard'))
      })
    }
  }

  const logOut = () => {
    auth.signOut().then(() => {
      store.dispatch(push('/'))
    })
  }

  const setColors = (nextState) => {
    store.dispatch(collegesActions.fetchCollegeThenSetColors(nextState.params.id))
    store.dispatch({ type: colorsActions.SET_COLORFUL })
  }

  const resetColors = () => {
    store.dispatch(fetchColors())
    store.dispatch({ type: colorsActions.UNSET_COLORFUL })
  }

  const ensureStudent = (v) => () => {
    if (auth.currentUser) {
      database.ref(`users/${auth.currentUser.uid}/institution`).once('value').then(s => {
        if (v && (s.val() || s.val() === 0)) store.dispatch(push('/instituteDash'))
        if (!v && (!s.val() && s.val() !== 0)) store.dispatch(push('/'))
      })
    } else {
      auth.onAuthStateChanged((user) => {
        if (!user) return
        database.ref(`users/${auth.currentUser.uid}/institution`).once('value').then(s => {
          if (v && (s.val() || s.val() === 0)) store.dispatch(push('/instituteDash'))
          if (!v && (!s.val() && s.val() !== 0)) store.dispatch(push('/'))
        })
      })
    }
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
            <Route path='/' onEnter={ensureStudent(true)}>
              <Route path='/' onEnter={resetColors}>
                <Route path='/tour' component={Tour} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/profile' component={Profile} />
                <Route path='/colleges' component={Colleges} />
              </Route>
              <Route path='/apps' component={Essays}>
                <IndexRoute onEnter={resetColors} />
                <Route path=':id' component={Essay} onEnter={setColors} />
              </Route>
              <Route path='/college/:id' component={CollegeInfo} onEnter={setColors} />
              <Route path='/signout' onEnter={logOut} />
            </Route>
          </Route>
          <Route path='/instituteDash' onEnter={ensureStudent(false)} component={InstitutionInput} />
        </Route>
      </Router>
    </Provider>
  )
}
