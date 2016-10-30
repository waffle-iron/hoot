import React from 'react'
import MenuBar from './MenuBar'

import * as styles from '../styles/Wrapper.scss'

export default ({ children, location }) => {
  return (
    <div className={styles.root}>
      <MenuBar pathname={location.pathname} />
      <div className={styles.child}>{children}</div>
    </div>
  )
}
