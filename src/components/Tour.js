import React from 'react'

// just reuse the landing styles
// since it's the same type of page
import styles from '../styles/Landing.scss'
import StressText from './StressText'
import Button from './Button'

export default () => {
  return (
    <div>
      <h1 className={styles.lead}>
        <StressText content='throw away all the college guides. this one is written for you.' />
      </h1>
      <h3 className={styles.content}>
        hoot is built around you, to ensure your success. give us as much info
        as you want - test scores, gpa, and similar stats - and we'll do our
        best to match you with the best schools for you. choose a set of reach,
        match, and safety schools all suited to your wants.
      </h3>
      <h1 className={styles.leadRight}>
        <StressText content='write essays like you already have that english degree.' />
      </h1>
      <h3 className={styles.content} style={{ textAlign: 'right' }}>
        hoot is designed for your application. view all of your upcoming essays,
        due dates, and prompt ideas from a simple, unified dashboard. plan for
        interviews like a pro. and ace the essay with an essay writing screen
        designed around the colleges you're writing for.
      </h3>
      <h1 className={styles.lead}>
        <StressText content='cover yourself in the cash of the wealthy.' />
      </h1>
      <h3 className={styles.content}>
        hoot has a built in scholarship search, so you can seek out what scholarships
        best suit your needs and the exact requirements for each. you can also
        view the merit scholarships at each college you consider, and easily
        factor in cost to your final college list.
      </h3>
      <br /><br /><br /><br /> {/* i'm lazy */}
      <h1 className={styles.lead}>
        <StressText content="don't subject yourself to a thousand google searches." />
      </h1>
      <Button to='/signup'>sign up now.</Button>
    </div>
  )
}
