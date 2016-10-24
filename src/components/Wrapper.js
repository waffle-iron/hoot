import React from 'react'
import MenuBar from './MenuBar'

import * as styles from '../styles/Wrapper.scss'

export default ({ children }) => {
  return (
    <div>
      <MenuBar />
      <div className={styles.child}>{children}</div>
    </div>
  )
}
