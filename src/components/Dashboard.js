import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import StressText from './StressText'
import * as styles from '../styles/Dashboard.scss'
import Button from './Button'
import { get } from '../colleges'
// import { auth } from '../firebase'
import { CollegeEntry } from './Colleges'

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

export const Dashboard = ({ colleges, navigate, fetched, profileBuilt }) => {
  if (!fetched) {
    return (
      <div>
        <h2 className={styles.lead}>im loading...</h2>
      </div>
    )
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
        colleges.length > 0 ? (
          <div>
            <h3 className={styles.label}>
              here's the list of colleges you were looking at last we talked.
            </h3>
            {colleges.map(college => get(college)).map(data => <CollegeEntry data={data} key={data.name} onClick={(id) => { navigate(`/college/${id}`) }} />)}
          </div>
        ) : (
          <div>
            <h3 className={styles.label}>
              you should start looking at some colleges. it looks like you haven't added any to your list.
            </h3>
            <Button to='/colleges'>click me and catch them all.</Button>
          </div>
        )
      }
      <h3 className={styles.label}>
        you've got some essays you need to work on. here's what's coming up.
      </h3>
      {/* essay list here */}
      <h3 className={styles.label}>
        i've got some scholarships you could also look at, if you're into that.
      </h3>
      {/* scholarship list here */}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    colleges: state.colleges.list,
    fetched: state.colleges.fetched,
    profileBuilt: Object.keys(state.profile.items).length > 0
  }
}

function mapDispatchToProps (dispatch) {
  return {
    navigate: _ => dispatch(push(_))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
