import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import classNames from 'classnames'

import StressText from './StressText'
import * as styles from '../styles/Essays.scss'
import { get } from '../colleges'
import { sortDates } from './Dashboard'

const filterWords = ['of', 'in', 'the', 'City']

const constructAppString = (app) => {
  if (!app) return 'not started'
  if (!app.plan) return 'deciding on decision plan'
  let today = new Date()
  let dueDate = new Date(app.plan.dueDate.month > 8 ? (new Date().getFullYear()) : (new Date().getFullYear() + 1), app.plan.dueDate.month - 1, app.plan.dueDate.day)
  let decisionDate = new Date(app.plan.decisionDate.month > 8 ? (new Date().getFullYear()) : (new Date().getFullYear() + 1), app.plan.decisionDate.month - 1, app.plan.decisionDate.day)
  if (!app.submitted) return `due in ${Math.round(Math.abs(today.getTime() - dueDate.getTime()) / (24 * 60 * 60 * 1000))} days`
  return `app submitted - decision in ${Math.round(Math.abs(today.getTime() - decisionDate.getTime()) / (24 * 60 * 60 * 1000))} days`
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
      {Object.keys(apps).map(k => apps[k]).sort(sortDates).map(college => (
        <LeftCollegeEntry
          college={college.id.toString()}
          app={college}
          style={{ width: expanded ? '100%' : college.id.toString() === active ? '120px' : '60px' }}
          expanded={expanded}
          onClick={e => goToCollege(college.id.toString())}>
          {(get(college.id.toString()).name.split(' ')[1] === 'University' || get(college.id.toString()).name.split(' ')[1] === 'College')
            ? get(college.id.toString()).name.split(' ')[0].toLowerCase()
            : get(college.id.toString()).name.split(' ').filter(word => !filterWords.includes(word)).map(word => word.slice(0, 1)).join('').toLowerCase()}
        </LeftCollegeEntry>
      ))}
      {colleges.filter(c => !Object.keys(apps).includes(c)).map(college => (
        <LeftCollegeEntry
          college={college}
          app={null}
          style={{ width: expanded ? '100%' : college === active ? '120px' : '60px' }}
          expanded={expanded}
          onClick={e => goToCollege(college)}>
          {(get(college).name.split(' ')[1] === 'University' || get(college).name.split(' ')[1] === 'College')
            ? get(college).name.split(' ')[0].toLowerCase()
            : get(college).name.split(' ').filter(word => !filterWords.includes(word)).map(word => word.slice(0, 1)).join('').toLowerCase()}
        </LeftCollegeEntry>
      ))}
    </div>
  )
}

export const Essays = ({ colleges, goToCollege, children, params, apps }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.lead}>
        <StressText content={children ? get(params.id).name.toLowerCase() : 'putting hand to keyboard'} />
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
