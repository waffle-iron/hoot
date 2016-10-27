import React from 'react'
import { connect } from 'react-redux'

import StressText from './StressText'
import * as styles from '../styles/Essays.scss'

export const Essays = ({ colleges }) => {
  return (
    <div>
      <h2 className={styles.lead}>
        <StressText content='putting hand to keyboard' />
      </h2>
      <h3 className={styles.smallLead}>
        now that you've picked out some colleges to apply to, let's get started
        on your applications.
      </h3>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    colleges: state.colleges.list
  }
}

function mapDispatchToProps (dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Essays)
