import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import StressText from './StressText'
import * as styles from '../styles/Dashboard.scss'
import Button from './Button'
// import { auth } from '../firebase'
import * as collegesActions from '../actions/colleges'
import Loading from './Loading'

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
  return 0 - ((new Date(b.plan.dueDateMonth > 8 ? (new Date().getFullYear()) : (new Date().getFullYear() + 1), b.plan.dueDateMonth - 1, b.plan.dueDateDay)) - (new Date(a.plan.dueDateMonth > 8 ? (new Date().getFullYear()) : (new Date().getFullYear() + 1), a.plan.dueDateMonth - 1, a.plan.dueDateDay)))
}

export const Dashboard = ({ mycolleges, allcolleges, navigate, fetched, profileBuilt, apps, fetchAllMyColleges }) => {
  return (
    <Loading finished={fetched}>
      <div>
        <h2 className={styles.lead}>
          <StressText content={`Welcome back, ${randomAdjective()} ${randomNoun()}. `} />
        </h2>
        {
          !profileBuilt ? (
            <div>
              <h3 className={styles.label}>
                It looks like you haven't built your profile.
              </h3>
              <Button to='/profile'>Build it for personalized suggestions.</Button>
            </div>
          ) : null
        }
        {
          mycolleges.length > 0
            ? mycolleges.length < 10 ? (
              <div>
                <h3 className={styles.label}>
                  You have {mycolleges.length} colleges added.
                </h3>
                <Button to='/colleges'>Choose a few more.</Button>
              </div>
            ) : null
          : (
            <div>
              <h3 className={styles.label}>
                You should start looking at some colleges. It looks like you haven't added any to your list.
              </h3>
              <Button to='/colleges'>Start selecting now.</Button>
            </div>
          )
        }
        {
          apps ? (
            <div>
              <h3 className={styles.label}>
                You've got some essays you need to work on. Here's what's coming up.
              </h3>
              {
                Object.keys(apps).map(k => apps[k]).sort(sortDates).map(app => (
                  <h3 key={`appRemind${app.id}`}>Your {allcolleges[app.id].name} application {app.plan ? ` due ${app.plan.dueDateMonth}/${app.plan.dueDateDay}` : null}</h3>
                ))
              }
            </div>
          ) : null
        }
      </div>
    </Loading>
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
