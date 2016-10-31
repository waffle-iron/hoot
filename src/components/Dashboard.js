import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import StressText from './StressText'
import * as styles from '../styles/Dashboard.scss'
import Button from './Button'
// import { auth } from '../firebase'
import * as collegesActions from '../actions/colleges'

const adjectives = [
  'terrified',
  'well prepared',
  'highly optimistic',
  'highly pessimistic',
  'fluffy',
  'friend shaped',
  'cat-like',
  'xanax filled',
  'inebriated',
  'celebratory',
  'awesome',
  'lovesick',
  'trustworthy',
  'radical',
  'scared yet hopeful'
]

const nouns = [
  'prospective college student',
  'good person',
  'ball of panic',
  'future seeker',
  'comrade',
  'high five machine',
  'typing fiend',
  'sailboat',
  'nice person',
  'random name generator',
  'human being who is totally not a wolf',
  'wannabe adult'
]

const randomAdjective = () => adjectives[Math.floor(Math.random() * adjectives.length)]
const randomNoun = () => nouns[Math.floor(Math.random() * nouns.length)]

export const sortDates = (a, b) => {
  if (!b.plan) return -1
  if (!a.plan) return 1
  return 0 - ((new Date(b.plan.dueDate.month > 8 ? (new Date().getFullYear()) : (new Date().getFullYear() + 1), b.plan.dueDate.month - 1, b.plan.dueDate.day)) - (new Date(a.plan.dueDate.month > 8 ? (new Date().getFullYear()) : (new Date().getFullYear() + 1), a.plan.dueDate.month - 1, a.plan.dueDate.day)))
}

export const Dashboard = ({ mycolleges, allcolleges, navigate, fetched, profileBuilt, apps, fetchAllMyColleges }) => {
  if (!fetched) {
    return (
      <div>
        <h2 className={styles.lead}>Loading...</h2>
      </div>
    )
  } else {
    fetchAllMyColleges()
  }
  return (
    <div>
      <h2 className={styles.lead}>
        <StressText content={`welcome back, ${randomAdjective()} ${randomNoun()}. `} />
      </h2>
      {
        !profileBuilt ? (
          <div>
            <h3 className={styles.label}>
              it looks like you haven't built your profile.
            </h3>
            <Button to='/profile'>head over here to do that.</Button>
          </div>
        ) : null
      }
      {
        mycolleges.length > 0
          ? mycolleges.length < 10 ? (
            <div>
              <h3 className={styles.label}>
                you have {mycolleges.length} colleges added. try these on for size.
              </h3>
              <Button to='/colleges'>click to make your wish list longer.</Button>
            </div>
          ) : null
        : (
          <div>
            <h3 className={styles.label}>
              you should start looking at some colleges. it looks like you haven't added any to your list.
            </h3>
            <Button to='/colleges'>click me and catch them all.</Button>
          </div>
        )
      }
      {
        apps ? (
          <div>
            <h3 className={styles.label}>
              you've got some essays you need to work on. here's what's coming up.
            </h3>
            {
              Object.keys(apps).map(k => apps[k]).sort(sortDates).map(app => (
                <h3>your {allcolleges[app.id].name} application {app.plan ? ` due ${app.plan.dueDateMonth}/${app.plan.dueDateDay}` : null}</h3>
              ))
            }
          </div>
        ) : null
      }
    </div>
  )
}

function mapStateToProps (state) {
  return {
    mycolleges: state.mycolleges.list,
    allcolleges: state.colleges,
    fetched: state.mycolleges.fetched,
    profileBuilt: Object.keys(state.profile.items).length > 0,
    apps: state.apps.items
  }
}

function mapDispatchToProps (dispatch) {
  return {
    navigate: _ => dispatch(push(_)),
    fetchAllMyColleges: _ => dispatch(collegesActions.fetchAllMyColleges())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
