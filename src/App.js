import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import Landing from './components/Landing'
import Wrapper from './components/Wrapper'
import LoginDialog from './components/LoginDialog'
import Tour from './components/Tour'

require('./globals.scss')

const Login = (signup) => ({ ...props }) => {
  return (
    <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
      <LoginDialog isSignup={signup} {...props} />
    </div>
  )
}

export default ({ store, history }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={Wrapper}>
          <IndexRoute component={Landing} />
          <Route path='/login' component={Login(false)} />
          <Route path='/signup' component={Login(true)} />
          <Route path='/tour' component={Tour} />
        </Route>
      </Router>
    </Provider>
  )
}
