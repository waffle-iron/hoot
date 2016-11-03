import React from 'react'

import styles from '../styles/Landing.scss'
import Button from './Button'
import StressText from './StressText'

export default () => {
  return (
    <div>
      <h1 className={styles.lead}>
        <StressText content='The college application site, for students, by students.' />
      </h1>
      <h3 className={styles.content}>
        Get rid of the noise and just use hoot.
        Choose your colleges and write your essays, without the headache and
        stress and yelling and all that not fun stuff.
        Built by stressed college applicants, for stressed college applicants.
        No fancy gloss, no daily emails. and entirely free, without advertisements.
      </h3>
      <Button to='/about'>Learn about us.</Button>
      <Button style={{ marginLeft: '10px' }} to='/colleges'>Browse our colleges.</Button>
      <h3 className={styles.content}>or,</h3>
      <Button to='/signup'>Sign up now.</Button>
    </div>
  )
}
