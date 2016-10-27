import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import StressText from './StressText'
import * as styles from '../styles/Essays.scss'
import { get } from '../colleges'

const filterWords = ['of']

const LeftCollegeEntry = ({ children, college, style, ...props }) => {
  return (
    <div className={styles.leftBarItem} style={{ ...style, backgroundColor: get(college).colorPrimary }} {...props}><h2>{children}</h2></div>
  )
}

const LeftCollegeBar = ({ colleges, goToCollege, expanded, active }) => {
  return (
    <div className={styles.leftBar}>
      {colleges.map(college => (
        <LeftCollegeEntry college={college} style={{ width: (expanded || college === active) ? '120px' : '60px' }} onClick={e => goToCollege(college)}>{get(college).name.split(' ').filter(word => !filterWords.includes(word)).map(word => word.slice(0, 1)).join('').toLowerCase()}</LeftCollegeEntry>
      ))}
    </div>
  )
}

export const Essays = ({ colleges, goToCollege, children, params }) => {
  return (
    <div>
      <h2 className={styles.lead}>
        <StressText content='putting hand to keyboard' />
      </h2>
      { !children ? <h3 className={styles.smallLead}>
        now that you've picked out some colleges to apply to, let's get started
        on your applications.
      </h3> : null }
      <LeftCollegeBar colleges={colleges} goToCollege={goToCollege} expanded={!children} active={params.id} />
      { children ? <div className={styles.right}>{children}</div> : null }
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
    goToCollege: _ => dispatch(push(`/apps/${_}`))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Essays)
