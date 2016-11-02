import React from 'react'

// just reuse the landing styles
// since it's the same type of page
import styles from '../styles/Landing.scss'
import StressText from './StressText'

export default () => {
  return (
    <div>
      <h1 className={styles.lead}>
        <StressText content='About us' />
      </h1>
      <h3 className={styles.content}>
        The college admissions process today is a collection of poorly designed
        websites and a lot of decentralized information. My college admissions
        process involved ten different application sites and a lot of research
        into how to optimize where I applied and how I applied. It was a lot of
        work for me - and I could only succeed because I was given the time and
        attention of those around me.
      </h3>
      <h3 className={styles.content}>
        I created this site out of a personal desire to help everyone succeed at
        admissions, and to help everyone show their best side to admissions
        officers, so that you can apply to the higher education institutions
        you're most suited for without having to execute a thousand google
        searches. I want everyone to be prepared for college - that's all there
        is to it.
      </h3>
      <h3 className={styles.content}>
        The site will always be entirely free to use. If you make an account,
        you can fill out a short profile which will let us help you find the
        colleges that are right for you, helping you form an application profile
        so you have the maximum chance of succeeding. And you can chat with
        student representatives from a variety of colleges, to learn more from
        the college than a paragraph or two could ever say.
      </h3>
      <h3 className={styles.content}>
        But don't take my word for it. Get started today. I guarantee you won't
        regret it.
      </h3>
      <h3 className={styles.content}>
        <i>- Kyle Fahringer</i>
      </h3>
    </div>
  )
}
