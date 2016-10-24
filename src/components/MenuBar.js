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
  return loggedIn ? (
    <div className={styles.right}>
      <Link to='/dashboard' activeClassName={styles.active}>dashboard</Link>
      <Link to='/profile' activeClassName={styles.active}>profile</Link>
      <Link to='/colleges' activeClassName={styles.active}>colleges</Link>
      <Link to='/essays' activeClassName={styles.active}>essays</Link>
      <Link to='/scholarships' activeClassName={styles.active}>scholarships</Link>
      <Link to='/signout' activeClassName={styles.active}>sign out</Link>
    </div>
  ) : (
    <div className={styles.right}>
      <Link to='/login' activeClassName={styles.active}>login</Link>
      <Link to='/signup' activeClassName={styles.active}>sign up</Link>
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
