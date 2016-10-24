import React from 'react'
import { Link } from 'react-router'

import styles from '../styles/Landing.scss'
import Button from './Button'

export default () => {
  return (
    <div>
      <h1 className={styles.lead}>
        <StressText content='the anti-bullshit college application resource.' />
      </h1>
      <h3 className={styles.content}>
        get rid of the noise and just use hoot.
        choose your colleges, write your essays, search for scholarships, and
        talk to actual college counselors without the headache.
        built by stressed college applicants, for stressed college applicants.
        no fancy gloss, no daily emails. and entirely free, without advertisements.
      </h3>
      <Button to='/tour'>take a tour.</Button>
      <h3 className={styles.content}>or,</h3>
      <Button to='/signup'>sign up now.</Button>
    </div>
  )
}

// exported so that the tour page can also use it
export const StressText = ({ content }) => {
  return (
    <span>
      {content.split(' ').map((child, i) => (
        <span key={`stress${content}${i}`} className={styles.stressText}>{child}</span>
      ))}
    </span>
  )
}
