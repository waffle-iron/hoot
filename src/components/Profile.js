import React from 'react'

import { StressText } from './Landing'
import downArrow from '../assets/downArrow.png'
import * as styles from '../styles/Profile.scss'

export default () => {
  return (
    <div>
      <h2 className={styles.lead}>
        <StressText content='portait of the artist as a high school student.' />
      </h2>
      <h3 className={styles.smallLead}>
        fill in as much as you'd like below. when you're done, hit
        save, or press enter. we'll handle the rest.
      </h3>
      <form className={styles.form} onSubmit={(e) => {
        e.preventDefault()
      }}>
        <div className={styles.section}>
          <div className={styles.small}>
            <h3>sat composite score</h3>
            <input type='text' />
          </div>
          <div className={styles.small}>
            <h3>sat reading score</h3>
            <input type='text' />
          </div>
          <div className={styles.small}>
            <h3>sat math score</h3>
            <input type='text' />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.small}>
            <h3>act composite score</h3>
            <input type='text' />
          </div>
          <div className={styles.small}>
            <h3>act reading score</h3>
            <input type='text' />
          </div>
          <div className={styles.small}>
            <h3>act math score</h3>
            <input type='text' />
          </div>
          <div className={styles.small}>
            <h3>act english score</h3>
            <input type='text' />
          </div>
          <div className={styles.small}>
            <h3>act science score</h3>
            <input type='text' />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.small}>
            <h3>unweighted gpa</h3>
            <input type='text' />
          </div>
          <div className={styles.medium}>
            <h3>class rank</h3>
            <input type='text' style={{ width: '75px' }} /> <h3 style={{ display: 'inline-block' }}>/</h3> <input type='text' style={{ width: '75px '}} />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.medium}>
            <h3>affirmative action status</h3>
            <select style={{ background: `url(${downArrow}) 95% / 10% no-repeat #fff` }}>
              <option>white</option>
              <option>latino</option>
              <option>black</option>
              <option>asian</option>
              <option>other</option>
            </select>
          </div>
        </div>
        <br />
        <button type='submit'>all done for now.</button>
      </form>
    </div>
  )
}
