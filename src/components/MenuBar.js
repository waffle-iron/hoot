import React, { cloneElement } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'

import styles from '../styles/MenuBar.scss'
import { auth } from '../firebase'

export const MenuBar = ({ loggedIn, colors, colorful }) => {
  return (
    <div
      className={classNames(styles.root, { [styles.inverse]: colorful })}
      style={{ backgroundColor: colorful ? colors[0] : null }}>
      <LeftLogo inverse={colorful} />
      <LoginItems loggedIn={loggedIn} inverse={colorful} colors={colors} />
    </div>
  )
}

const LeftLogo = ({ inverse }) => {
  return (
    <div className={classNames(styles.left, { [styles.inverse]: inverse })}>
      <Link to='/'><h1>hoot</h1></Link>
    </div>
  )
}

const LoginItems = ({ loggedIn, inverse, colors }) => {
  return loggedIn ? (
    <div className={classNames(styles.right, { [styles.inverse]: inverse })}>
      {[
        <Link to='/dashboard'>dashboard</Link>,
        <Link to='/profile'>profile</Link>,
        <Link to='/colleges'>colleges</Link>,
        <Link to='/apps'>applications</Link>,
        <Link to='/signout'>sign out</Link>
      ].map((element) =>
        // what a fucking hack
        cloneElement(element, {
          key: `linkTo${element.props.to}`,
          onMouseOver: (e) => {
            if (inverse) {
              e.target.style.cssText =
                `color: ${colors[Math.floor(Math.random() * colors.length)]}`
            } else {
              e.target.style.cssText =
                `background-color: ${colors[Math.floor(Math.random() * colors.length)]}`
            }
          },
          onMouseOut: (e) => {
            e.target.style.cssText = ''
          },
          onClick: (e) => {
            if (inverse) {
              e.target.style.cssText = ''
            } else {
              e.target.style.cssText =
                `background-color: ${colors[Math.floor(Math.random() * colors.length)]}`
            }
          }
        })
      )}
    </div>
  ) : (
    <div className={styles.right}>
      <Link to='/login'>login</Link>
      <Link to='/signup'>sign up</Link>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    loggedIn: auth.currentUser,
    colors: state.colors.colors,
    colorful: state.colors.colorful
  }
}

function mapDispatchToProps (dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
