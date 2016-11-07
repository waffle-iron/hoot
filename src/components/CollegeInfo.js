import React from 'react'
import { connect } from 'react-redux'

import StressText from './StressText'
import * as styles from '../styles/CollegeInfo.scss'
import Button from './Button'
import * as actions from '../actions/mycolleges'
import downArrow from '../assets/downArrow.png'
import * as collegesActions from '../actions/colleges'
import { auth } from '../firebase'
import Loading from './Loading'

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
  let r = 'This college uses the '
  let s = ''
  let length = 0
  if (college.acceptsCommon) { s += 'common '; length += 1 }
  if (college.acceptsCoalition) { s += 'coalition '; length += 1 }
  if (college.acceptsQuestbridge) { s += 'questbridge '; length += 1 }
  if (college.acceptsUniversal) { s += 'universal '; length += 1 }
  s = s.slice(0, -1)
  if (length === 0) {
    return 'This college uses their own application.'
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
    <div
      style={{
        fontSize: '3em',
        display: 'inline-block',
        ...style
      }}>
      {
        (new Array(num))
          .fill(null)
          .map((i, x) => (
            <i
              key={`${icon}${x}`}
              className={`fa fa-${icon}`}
              style={{ color: 'black', paddingRight: '5px' }} />
          ))
      }
      {iconEmpty
        ? (
          new Array(10 - num))
            .fill(null)
            .map((i, x) => (
              <i
                key={`${icon}-${x}`}
                className={`fa fa-${iconEmpty}`}
                style={{ color: 'black', paddingRight: '5px' }} />
            ))
        : null}
    </div>
  )
}

const PercentileBar = ({ max, left, right, marker }) => {
  return (
    <div>
      <div
        style={{
          position: 'relative',
          height: '16px',
          width: '100%'
        }}>
        { marker
          ? <div
            style={{
              position: 'absolute',
              top: '6px',
              height: '16px',
              width: '16px',
              left: `calc(${Math.round(marker / max * 100)}% - 4px)`,
              background: `url(${downArrow}) 0% / 100% no-repeat #fff` }} />
            : null }
      </div>
      <div
        style={{
          width: '100%',
          height: '40px',
          backgroundColor: 'white',
          position: 'relative',
          border: '5px solid black',
          margin: '10px 0',
          overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: '0',
            height: '100%',
            left: `${left ? Math.round(left / max * 100) : 0}%`,
            width: `${Math.round((right - left) / max * 100)}%`,
            backgroundColor: 'black' }} />
        { marker
          ? <div
            style={{
              position: 'absolute',
              top: '0',
              height: '100%',
              left: `${Math.round(marker / max * 100)}%`,
              width: '15px',
              borderLeft: '5px solid black',
              borderRight: '5px solid black',
              backgroundColor: 'white' }} />
          : null }
      </div>
    </div>
  )
}

const RankingSection = ({ ranking, source }) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.ranking}>
        #{ranking}{ranking === 1 ? 'st' : ranking === 2 ? 'nd' : ranking === 3 ? 'rd' : 'th' }
      </h2>
      <h3>ranked college or university in the united states, according to {source}.</h3>
    </div>
  )
}

const FinancialAidSection = ({ fa, avg }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.content}>financial aid</h3>
      <OutOfTenGraph num={Math.round(fa / 10)} icon='money' style={{ fontSize: '2em' }} />
      <h3>
        {fa}% of students get financial aid
        { avg ? `, who get an average of $${avg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} per year.` : null}
      </h3>
    </div>
  )
}

const PopulationSection = ({ total, undergrad }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.content}>total population</h3>
      <OutOfTenGraph num={Math.round(total / 2500)} icon='user' />
      <h3>
        {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} students
        {undergrad ? `, ${undergrad.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} of which are are undergraduate.` : null}
      </h3>
    </div>
  )
}

const CostSection = ({ cost }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.content}>cost</h3>
      <OutOfTenGraph num={Math.round(cost / 7000)} icon='usd' />
      <h3>${cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} per year</h3>
    </div>
  )
}

export const CollegeInfo = ({ id, fetchCollege, college, addCollege, removeCollege, isAdded, sat, act, images }) => {
  const pbgi = college ? college.photos ? Object.keys(college.photos).map(k => college.photos[k].storage) : null : null
  const bgImageRef = pbgi ? `campus-photos/${id}/${pbgi[Math.floor(Math.random() * pbgi.length)]}` : null
  const bg = images[bgImageRef]
  return (
    <Loading finished={college}>
      <div>
        <div className={styles.header} style={{ position: 'relative', zIndex: 5 }}>
          <div className={styles.headerBg} style={{ backgroundColor: college.colorPrimary }} />
          <div className={styles.headerBg} style={{ opacity: bg ? 1 : 0, backgroundImage: `url(${bg})` }} />
          <h2 className={styles.lead}>
            <StressText content={college.name} />
          </h2>
          { auth.currentUser
            ? (
              <Button
                onClick={(e) => { isAdded ? removeCollege(id) : addCollege(id) }}>
                { isAdded ? 'Remove college' : 'Add college' }
              </Button>
              )
            : null }
          { auth.currentUser
            ? isAdded
              ? (
                <Button style={{ marginLeft: '10px' }} to={`/apps/${id}`} >Get started</Button>
                )
              : null
            : null }
        </div>
        <h2 className={styles.lead}>About This College</h2>
        <h3 className={styles.content} style={{ margin: '1em 0' }}>
          {college.name} is a college {college.city && college.state ? `based in ${college.city}, ${college.state}.` : null}
        </h3>
        <div className={styles.column}>
          {college.population ? <PopulationSection total={college.population} undergrad={college.undergradPopulation} /> : null}
          {college.averageAnnualCost ? <CostSection cost={college.averageAnnualCost} /> : null}
        </div>
        <div className={styles.column}>
          {college.percentFinancialAid ? <FinancialAidSection fa={college.percentFinancialAid} avg={college.averageGrantAid} /> : null}
          {college.forbesRanking ? <RankingSection ranking={college.forbesRanking} source='forbes' /> : null}
          {college.usnawrRanking ? <RankingSection ranking={college.usnawrRanking} source='us news and world report' /> : null}
          {college.theRanking ? <RankingSection ranking={college.theRanking} source='times higher education' /> : null}
          {/* TODO ethnicity section? */}
        </div>
        <h2 className={styles.lead}>Getting In</h2>
        <h3 className={styles.content} style={{ margin: '1em 0' }}>
          This school is {getDifficulty(Math.round(college.percentAdmitted))} to get into.
        </h3>
        <div className={styles.column}>
          <div className={styles.section}>
            <h2 className={styles.ranking}>{Math.round(college.percentAdmitted)}%</h2>
            <h3>percent of applicants are admitted.</h3>
          </div>
          <div className={styles.section}>
            <h3 className={styles.content}>{constructAppString(college)}</h3>
          </div>
          {/*
          <div className={styles.section}>
            <h3 className={styles.content}>{constructDecisionPlanString(college)}</h3>
          </div>
          */}
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
        </div>
      </div>
    </Loading>
  )
}

function mapStateToProps (state, ownProps) {
  return {
    id: ownProps.params.id,
    college: state.colleges[ownProps.params.id],
    isAdded: state.mycolleges.list.includes(ownProps.params.id),
    sat: state.profile.items.satComposite,
    act: state.profile.items.actComposite,
    images: state.images
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCollege: (_) => dispatch(actions.addCollege(_)),
    removeCollege: (_) => dispatch(actions.removeCollege(_)),
    fetchCollege: (_) => dispatch(collegesActions.fetchCollege(_))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollegeInfo)
