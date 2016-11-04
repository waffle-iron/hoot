import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import classNames from 'classnames'

import StressText from './StressText'
import * as styles from '../styles/Essays.scss'
import { sortDates } from './Dashboard'
import * as collegesActions from '../actions/colleges'

const filterWords = ['of', 'in', 'the', 'City']

const constructAppString = (app) => {
  if (!app) return 'Not started'
  if (!app.plan) return 'Deciding on decision plan'
  let today = new Date()
  let dueDate = new Date(app.plan.dueDateMonth > 8 ? (new Date().getFullYear()) : (new Date().getFullYear() + 1), app.plan.dueDateMonth - 1, app.plan.dueDateDay)
  let decisionDate = new Date(app.plan.decisionDateMonth > 8 ? (new Date().getFullYear()) : (new Date().getFullYear() + 1), app.plan.decisionDateMonth - 1, app.plan.decisionDateDay)
  if (!app.submitted) return `Due in ${Math.round(Math.abs(today.getTime() - dueDate.getTime()) / (24 * 60 * 60 * 1000))} days`
  return `App submitted - decision in ${Math.round(Math.abs(today.getTime() - decisionDate.getTime()) / (24 * 60 * 60 * 1000))} days`
}

const LeftCollegeEntry = ({ children, college, allcolleges, style, app, expanded, ...props }) => {
  return (
    <div
      className={classNames(styles.leftBarItem, { [styles.unExpanded]: !expanded, [styles.expanded]: expanded })}
      style={{ ...style, backgroundColor: allcolleges[college].colorPrimary }}
      {...props}>
      <h2>{children}</h2>
      <div style={{ opacity: expanded ? '1' : '0' }}><h3>{constructAppString(app)}</h3></div>
    </div>
  )
}

const LeftCollegeBar = ({ colleges, allcolleges, goToCollege, expanded, active, apps }) => {
  return (
    <div className={styles.leftBar} style={{ width: expanded ? '100%' : null }}>
      {Object.keys(apps).filter(c => allcolleges[c]).map(k => apps[k]).sort(sortDates).map(college => (
        <LeftCollegeEntry
          college={college.id.toString()}
          app={college}
          style={{ width: expanded ? '100%' : college.id.toString() === active ? '120px' : '60px' }}
          expanded={expanded}
          allcolleges={allcolleges}
          key={`appSelect${college.id.toString()}`}
          onClick={e => goToCollege(college.id.toString())}>
          {(allcolleges[college.id.toString()].name.split(' ')[1] === 'University' || allcolleges[college.id.toString()].name.split(' ')[1] === 'College')
            ? allcolleges[college.id.toString()].name.split(' ')[0]
            : allcolleges[college.id.toString()].name.split(' ').filter(word => !filterWords.includes(word)).map(word => word.slice(0, 1)).join('').toUpperCase()}
        </LeftCollegeEntry>
      ))}
      {colleges.filter(c => allcolleges[c]).filter(c => !Object.keys(apps).includes(c)).map(college => (
        <LeftCollegeEntry
          college={college}
          app={null}
          style={{ width: expanded ? '100%' : college === active ? '120px' : '60px' }}
          expanded={expanded}
          allcolleges={allcolleges}
          key={`appSelect${college}`}
          onClick={e => goToCollege(college)}>
          {(allcolleges[college].name.split(' ')[1] === 'University' || allcolleges[college].name.split(' ')[1] === 'College')
            ? allcolleges[college].name.split(' ')[0]
            : allcolleges[college].name.split(' ').filter(word => !filterWords.includes(word)).map(word => word.slice(0, 1)).join('').toUpperCase()}
        </LeftCollegeEntry>
      ))}
    </div>
  )
}

export const Essays = ({ mycolleges, allcolleges, goToCollege, fetchAllMyColleges, children, params, apps }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.lead}>
        <StressText content={children ? allcolleges[params.id] ? allcolleges[params.id].name : 'Loading...' : 'Getting down to business.'} />
      </h2>
      <h3 className={styles.smallLead} style={{ height: children ? '0' : null }}>
        Now that you've picked out some colleges to apply to, let's get started
        on your applications.
      </h3>
      <LeftCollegeBar colleges={mycolleges} allcolleges={allcolleges} goToCollege={goToCollege} expanded={!children} active={params.id} apps={apps} />
      { children ? <div className={styles.rightParent}><div className={styles.right}>{children}</div></div> : null }
    </div>
  )
}

function mapStateToProps (state) {
  return {
    mycolleges: state.mycolleges.list,
    allcolleges: state.colleges,
    apps: state.apps.items
  }
}

function mapDispatchToProps (dispatch) {
  return {
    goToCollege: _ => dispatch(push(`/apps/${_}`)),
    fetchCollege: _ => dispatch(collegesActions.fetchCollege(_)),
    fetchAllMyColleges: _ => dispatch(collegesActions.fetchAllMyColleges())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Essays)
