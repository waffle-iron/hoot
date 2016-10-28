import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import classNames from 'classnames'

import StressText from './StressText'
import * as styles from '../styles/Essays.scss'
import { get } from '../colleges'

const filterWords = ['of']

const constructAppString = (app) => {
  let today = new Date()
  if (!app) return 'not started'
  if (!app.plan) return 'deciding on decision plan'
  if (!app.submitted) return 'working on essays'
  return `app submitted - decision in ${app.plan.decisionDate.month - today.getMonth() - 1} months, ${app.plan.decisionDate.day - today.getDate()} days`
}

const LeftCollegeEntry = ({ children, college, style, app, expanded, ...props }) => {
  return (
    <div
      className={classNames(styles.leftBarItem, { [styles.unExpanded]: !expanded, [styles.expanded]: expanded })}
      style={{ ...style, backgroundColor: get(college).colorPrimary }}
      {...props}>
      <h2>{children}</h2>
      <div style={{ opacity: expanded ? '1' : '0' }}><h3>{constructAppString(app)}</h3></div>
    </div>
  )
}

const LeftCollegeBar = ({ colleges, goToCollege, expanded, active, apps }) => {
  return (
    <div className={styles.leftBar} style={{ width: expanded ? '100%' : null }}>
      {colleges.map(college => (
        <LeftCollegeEntry
          college={college}
          app={apps[college]}
          style={{ width: expanded ? '100%' : college === active ? '120px' : '60px' }}
          expanded={expanded}
          onClick={e => goToCollege(college)}>
          {get(college).name.split(' ').filter(word => !filterWords.includes(word)).map(word => word.slice(0, 1)).join('').toLowerCase()}
        </LeftCollegeEntry>
      ))}
    </div>
  )
}

export const Essays = ({ colleges, goToCollege, children, params, apps }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.lead}>
        <StressText content='putting hand to keyboard' />
      </h2>
      <h3 className={styles.smallLead} style={{ height: children ? '0' : null }}>
        now that you've picked out some colleges to apply to, let's get started
        on your applications.
      </h3>
      <LeftCollegeBar colleges={colleges} goToCollege={goToCollege} expanded={!children} active={params.id} apps={apps} />
      { children ? <div className={styles.rightParent}><div className={styles.right}>{children}</div></div> : null }
    </div>
  )
}

function mapStateToProps (state) {
  return {
    colleges: state.colleges.list,
    apps: state.apps.items
  }
}

function mapDispatchToProps (dispatch) {
  return {
    goToCollege: _ => dispatch(push(`/apps/${_}`))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Essays)
