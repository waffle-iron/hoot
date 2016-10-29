import React from 'react'
import { connect } from 'react-redux'

import { get } from '../colleges'
import StressText from './StressText'
import * as styles from '../styles/CollegeInfo.scss'
import Button from './Button'
import * as actions from '../actions/colleges'
import downArrow from '../assets/downArrow.png'

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

const constructDecisionPlanString = ({ application }) => {
  let r = `this college takes ${application.decisionPlans.length} decision plans: `
  const mappedTypes = {
    'R': 'regular',
    'REA': 'restrictive early action',
    'EA': 'early action',
    'ED': 'early decision',
    'ED2': 'early decision 2',
    'T': 'transfer'
  }
  r += application.decisionPlans
    .map((plan, index) => (index === application.decisionPlans.length - 1) ? 'and ' + mappedTypes[plan.type] : mappedTypes[plan.type])
    .join(application.decisionPlans.length > 2 ? ', ' : ' ') + '.'
  return r
}

const OutOfTenGraph = ({ num, icon, iconEmpty, style }) => {
  return (
    <div style={{ fontSize: '3em', display: 'inline-block', ...style }}>
      {(new Array(num)).fill(null).map((i, x) => <i key={`${icon}${x}`} className={`fa fa-${icon}`} style={{ color: 'black', paddingRight: '5px' }} />)}
      {iconEmpty ? (new Array(10 - num)).fill(null).map((i, x) => <i key={`${icon}-${x}`} className={`fa fa-${iconEmpty}`} style={{ color: 'black', paddingRight: '5px' }} />) : null}
    </div>
  )
}

const PercentileBar = ({ max, left, right, marker }) => {
  return (
    <div>
      <div style={{ position: 'relative', height: '16px', width: '100%' }}>
        { marker ? <div style={{ position: 'absolute', top: '6px', height: '16px', width: '16px', left: `calc(${Math.round(marker / max * 100)}% - 4px)`, background: `url(${downArrow}) 0% / 100% no-repeat #fff` }} /> : null }
      </div>
      <div style={{ width: '100%', height: '40px', backgroundColor: 'white', position: 'relative', border: '5px solid black', margin: '10px 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '0', height: '100%', left: `${left ? Math.round(left / max * 100) : 0}%`, width: `${Math.round((right - left) / max * 100)}%`, backgroundColor: 'black' }} />
        { marker ? <div style={{ position: 'absolute', top: '0', height: '100%', left: `${Math.round(marker / max * 100)}%`, width: '15px', borderLeft: '5px solid black', borderRight: '5px solid black', backgroundColor: 'white' }} /> : null }
      </div>
    </div>
  )
}

export const CollegeInfo = ({ id, addCollege, removeCollege, isAdded, sat, act }) => {
  const college = get(id)
  return (
    <div>
      <div>
        <h2 className={styles.lead}>
          <StressText content={college.name.toLowerCase()} />
        </h2>
        <Button onClick={(e) => { isAdded ? removeCollege(id) : addCollege(id) }}>{ isAdded ? 'remove college' : 'add college' }</Button>
        { isAdded ? <Button style={{ marginLeft: '10px' }} to={`/apps/${id}`} >get started</Button> : null }
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
        {/* TODO ethnicity section? */}
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
        <div className={styles.section}>
          <h3 className={styles.content}>{constructDecisionPlanString(college)}</h3>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.section}>
          <h3 className={styles.content}>sat percentile</h3>
          <PercentileBar max={1600} left={college.sat25thPercentile} right={college.sat75thPercentile} marker={sat} />
          <h3>50% of accepted students score between {college.sat25thPercentile} and {college.sat75thPercentile} on the sat.</h3>
        </div>
        <div className={styles.section}>
          <h3 className={styles.content}>act percentile</h3>
          <PercentileBar max={36} left={college.act25thPercentile} right={college.act75thPercentile} marker={act} />
          <h3>50% of accepted students score between {college.act25thPercentile} and {college.act75thPercentile} on the sat.</h3>
        </div>
        <div className={styles.section}>
          <h3 className={styles.content}>
            {(college.application.commonEssay ? 1 : 0) + (college.application.additionalEssay ? 1 : 0)} essay{(college.application.commonEssay ? 1 : 0) + (college.application.additionalEssay ? 1 : 0) === 1 ? '' : 's'} {college.application.questions.length > 0 ? `and ${college.application.questions.length} question${college.application.questions.length > 1 ? 's' : ''}` : null } are required for consideration.
          </h3>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps (state, ownProps) {
  return {
    id: ownProps.params.id,
    isAdded: state.colleges.list.includes(ownProps.params.id),
    sat: state.profile.items.satComposite,
    act: state.profile.items.actComposite
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCollege: (_) => dispatch(actions.addCollege(_)),
    removeCollege: (_) => dispatch(actions.removeCollege(_))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollegeInfo)
