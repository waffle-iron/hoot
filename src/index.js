import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'

import App from './App'
import * as reducers from './reducers'
import { auth } from './firebase'
import { resume } from './actions/login'

const mount = document.getElementById('mount')

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  compose(
    applyMiddleware(
      routerMiddleware(browserHistory),
      thunk
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

window.store = store

const history = syncHistoryWithStore(browserHistory, store)

if (auth.currentUser) {
  store.dispatch(resume())
}

process.env.NODE_ENV === 'production'
  ? render(
    <App store={store} history={history} />,
    mount
    )
  : render(
    <AppContainer>
      <App store={store} history={history} />
    </AppContainer>,
    mount
    )

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(
      <AppContainer>
        <NextApp store={store} history={history} />
      </AppContainer>,
      mount
    )
  })
}
