import React from 'react'

import { get } from '../colleges'
import StressText from './StressText'
import * as styles from '../styles/CollegeInfo.scss'
import Button from './Button'

const getDifficulty = (num) => {
  if (num <= 5) {
    return 'absurdly difficult'
  } else if (num <= 10) {
    return 'very, very hard'
  } else if (num <= 20) {
    return 'pretty hard'
  } else if (num <= 30) {
    return 'hard'
  } else if (num <= 50) {
    return 'sort of hard'
  } else if (num <= 70) {
    return 'not that hard'
  } else {
    return 'not hard, but not easy'
  }
}

const constructAppString = (college) => {
  let r = 'this college uses the '
  let s = ''
  let length = 0
  if (college.commonApplication) { s += 'common '; length += 1 }
  if (college.coalitionApplication) { s += 'coalition '; length += 1 }
  if (college.questbridgeApplication) { s += 'questbridge '; length += 1 }
  if (college.universalApplication) { s += 'universal '; length += 1 }
  s = s.slice(0, -1)
  if (length === 0) {
    return 'this college uses their own application.'
  } else if (length === 1) {
    return r + s + ' application.'
  } else if (length === 2) {
    s = s.split(' ')
    s[0] += ' and'
    s.join(' ')
    return r + s + ' applications.'
  } else {
    s = s.split(' ').map(c => ' ' + c)
    s[s.length - 1] = ' and ' + s[s.length - 1]
    s.join(' ')
    return r + s + ' applications.'
  }
}

const OutOfTenGraph = ({ num, icon, iconEmpty, style }) => {
  return (
    <div style={{ fontSize: '3em', display: 'inline-block', ...style }}>
      {(new Array(num)).fill(null).map((i) => <i className={`fa fa-${icon}`} style={{ color: 'black', paddingRight: '5px' }} />)}
      {iconEmpty ? (new Array(10 - num)).fill(null).map((i) => <i className={`fa fa-${iconEmpty}`} style={{ color: 'black', paddingRight: '5px' }} />) : null}
    </div>
  )
}

export default ({ params }) => {
  const college = get(params.id)
  return (
    <div>
      <div>
        <h2 className={styles.lead}>
          <StressText content={college.name.toLowerCase()} />
        </h2>
        <Button>add college</Button>
      </div>
      <h2 className={styles.lead}>about this college</h2>
      <h3 className={styles.content} style={{ margin: '1em 0' }}>
        {college.name.toLowerCase()} is a college based in {college.location.city.toLowerCase()}, {college.location.state.toLowerCase()}.
      </h3>
      <div className={styles.column}>
        <div className={styles.section}>
          <h3 className={styles.content}>total population</h3>
          <OutOfTenGraph num={Math.round(college.totalPopulation / 2500)} icon='user' />
          <h3>{college.totalPopulation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} students</h3>
        </div>
        <div className={styles.section}>
          <h3 className={styles.content}>cost</h3>
          <OutOfTenGraph num={Math.round(college.totalAnnualCost / 7000)} icon='usd' />
          <h3>${college.totalAnnualCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} per year</h3>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.section}>
          <h3 className={styles.content}>financial aid</h3>
          <OutOfTenGraph num={Math.round(college.percentFinancialAid * 10)} icon='money' style={{ fontSize: '2em' }} />
          <h3>{college.percentFinancialAid * 100}% of students get financial aid</h3>
        </div>
        <div className={styles.section}>
          <h2 className={styles.ranking}>#{college.forbesRanking}{college.forbesRanking === 1 ? 'st' : college.forbesRanking === 2 ? 'nd' : college.forbesRanking === 3 ? 'rd' : 'th' }</h2>
          <h3>ranked college or university in the united states, according to forbes</h3>
        </div>
      </div>
      <h2 className={styles.lead}>getting in</h2>
      <h3 className={styles.content} style={{ margin: '1em 0' }}>
        this school is {getDifficulty(Math.round(college.percentAdmitted * 100))} to get into.
      </h3>
      <div className={styles.column}>
        <div className={styles.section}>
          <h2 className={styles.ranking}>{Math.round(college.percentAdmitted * 100)}%</h2>
          <h3>percent of applicants are admitted.</h3>
        </div>
        <div className={styles.section}>
          <h3 className={styles.content}>{constructAppString(college)}</h3>
        </div>
      </div>
    </div>
  )
}
