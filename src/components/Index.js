import React from 'react'
import { connect } from 'react-redux'

import LoginDialog from './LoginDialog'

export const Index = ({ loggedIn }) => {
  return (
    <div>
      <h1>Whats pup</h1>
      <h2>You {loggedIn ? 'are' : "ain't"} logged in!</h2>
      <LoginDialog />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    loggedIn: state.login.loggedIn
  }
}

function mapDispatchToProps (dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
