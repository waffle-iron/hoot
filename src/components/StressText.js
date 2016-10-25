import React from 'react'
import { connect } from 'react-redux'

import * as styles from '../styles/StressText.scss'

export const StressText = ({ content, color }) => {
  return (
    <span>
      {content.split(' ').map((child, i) => (
        <span
          key={`stress${content}${i}`}
          className={styles.stressText}
          style={{ backgroundColor: color }}>{child}</span>
      ))}
    </span>
  )
}

function mapStateToProps (state) {
  return {
    color: state.colors.colors[Math.floor(Math.random() * state.colors.colors.length)]
  }
}

export default connect(mapStateToProps)(StressText)
