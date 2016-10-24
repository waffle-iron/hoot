import React from 'react'

import { StressText } from './Landing'
import * as styles from '../styles/Dashboard.scss'
import Button from './Button'

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

export default () => {
  return (
    <div>
      <h2 className={styles.lead}>
        <StressText content={`welcome back, ${randomAdjective()} ${randomNoun()}. `} />
      </h2>
      <h3 className={styles.label}>
        it looks like you haven't built your profile.
      </h3>
      <Button to='/profile'>head over here to do that.</Button>
      <h3 className={styles.label}>
        here's the list of colleges you were looking at last we talked.
      </h3>
      {/* college list here */}
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
