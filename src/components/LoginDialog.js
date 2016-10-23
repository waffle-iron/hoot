import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions/login'

export const LoginDialog = ({ login, loginError }) => {
  return (
    <div>
      <form onSubmit={(e) => {
        console.log(1)
        e.preventDefault()
        console.log('we submittin boyz')
        // TODO this, but better
        login(e.target.children[0].value, e.target.children[1].value)
      }}>
        <input type='text' />
        <input type='password' />
        <button type='submit'>Submit</button>
      </form>
      { loginError ? <h1>{loginError.toString()}</h1> : null }
    </div>
  )
}

function mapStateToProps (state) {
  return {
    loginError: state.login.error
  }
}

function mapDispatchToProps (dispatch) {
  return {
    login: (email, password) => dispatch(actions.login(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog)
