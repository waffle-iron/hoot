import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import Landing from './components/Landing'
import Wrapper from './components/Wrapper'
import LoginDialog from './components/LoginDialog'
import Tour from './components/Tour'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Colleges from './components/Colleges'
import CollegeInfo from './components/CollegeInfo'

import { auth, database } from './firebase'
import { get } from './colleges'
import colorsActions from './actions/colors'

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
  const setColors = (nextState) => {
    store.dispatch({
      type: colorsActions.SET_COLORS,
      payload: [get(nextState.params.id).colorPrimary]
    })

    store.dispatch({ type: colorsActions.SET_COLORFUL })
  }

  const resetColors = (nextState) => {
    const setBlack = () => {
      store.dispatch({
        type: colorsActions.SET_COLORS,
        payload: ['#000000']
      })
    }

    if (auth.currentUser) {
      database.ref('/users/' + auth.currentUser.uid).once('value').then((s) => {
        if (s.val()) {
          let colleges = s.val().colleges
          if (colleges && colleges.length > 0) {
            store.dispatch({
              type: colorsActions.SET_COLORS,
              payload: colleges.map((college) => get(college).colorPrimary)
            })
          } else {
            setBlack()
          }
        } else {
          setBlack()
        }
      })
    } else {
      store.dispatch({
        type: colorsActions.SET_COLORS,
        payload: ['#000000']
      })
    }

    store.dispatch({ type: colorsActions.UNSET_COLORFUL })
  }

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={Wrapper}>
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
            </Route>
            <Route path='/college/:id' component={CollegeInfo} onEnter={setColors} />
          </Route>
        </Route>
      </Router>
    </Provider>
  )
}
