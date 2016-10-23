import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'

import Index from './components/Index'

export default ({ store, history }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={Index} />
      </Router>
    </Provider>
  )
}
