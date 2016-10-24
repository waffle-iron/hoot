import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import styles from '../styles/MenuBar.scss'

export const MenuBar = ({ loggedIn }) => {
  return (
    <div className={styles.root}>
      <LeftLogo />
      <LoginItems loggedIn={loggedIn} />
    </div>
  )
}

const LeftLogo = () => {
  return (
    <div className={styles.left}><Link to='/'><h1>hoot</h1></Link></div>
  )
}

const LoginItems = ({ loggedIn }) => {
  return loggedIn ? null : (
    <div className={styles.right}>
      <Link to='/login'>login</Link>
      <Link to='/signup'>sign up</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
