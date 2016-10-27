import React from 'react'

import styles from '../styles/Landing.scss'
import Button from './Button'
import StressText from './StressText'

export default () => {
  return (
    <div>
      <h1 className={styles.lead}>
        <StressText content='the anti-bullshit college application resource.' />
      </h1>
      <h3 className={styles.content}>
        get rid of the noise and just use hoot.
        choose your colleges and write your essays, without the headache and
        stress and yelling and all that not fun stuff.
        built by stressed college applicants, for stressed college applicants.
        no fancy gloss, no daily emails. and entirely free, without advertisements.
      </h3>
      <Button to='/tour'>take a tour.</Button>
      <h3 className={styles.content}>or,</h3>
      <Button to='/signup'>sign up now.</Button>
    </div>
  )
}
