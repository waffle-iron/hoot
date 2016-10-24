import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions/login'
import * as styles from '../styles/LoginDialog.scss'

export const LoginDialog = ({ login, loginError, isSignup, signup }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.header}>{ isSignup ? 'sign up' : 'login' }</h2>
      <form className={styles.form} onSubmit={(e) => {
        e.preventDefault()
        // TODO this, but better
        const f = [e.target.children[2].value, e.target.children[6].value]
        isSignup ? signup(...f) : login(...f)
      }}>
        <br />
        <h3>email</h3>
        <input type='text' /><br /><br />
        <h3>password</h3>
        <input type='password' /><br /><br />
        <button type='submit'>submit</button>
      </form>
      { loginError
        ? <h2 style={{ marginTop: '20px', color: 'red' }}>
            {loginError.toString()}
          </h2>
        : null }
    </div>
  )
}

function mapStateToProps (state, ownProps) {
  return {
    loginError: state.login.error,
    signup: ownProps.signup
  }
}

function mapDispatchToProps (dispatch) {
  return {
    login: (email, password) => dispatch(actions.login(email, password)),
    signup: (email, password) => dispatch(actions.signup(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog)
