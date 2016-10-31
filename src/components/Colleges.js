import React from 'react'
import { connect } from 'react-redux'

// import colleges from '../colleges'
import * as styles from '../styles/Colleges.scss'
import * as actions from '../actions/mycolleges'
import StressText from './StressText'
import Button from './Button'

const headings = [
  'choose your own adventure.',
  'begin your descent into insanity.',
  'consider the following options.',
  'gaze at the colleges before you, and rejoice.',
  'meow meow meow meow meow.',
  "help i'm trapped in a stupid heading generator.",
  'i tried to think of positive headings but failed.',
  'financial aid makes these all viable, probably.'
]

export const CollegeEntry = ({ data, onClick }) => {
  return (
    <div
      className={styles.entry}
      style={{ backgroundColor: data.colorPrimary }}
      onClick={(e) => { onClick(data.id) }}>
      <h2>{data.name.toLowerCase()}</h2>
    </div>
  )
}

/*
const SearchBar = () => {
  return (
    <form className={styles.search}>
      <input type='text' />
      <button type='submit' />
    </form>
  )
}
*/

export const Colleges = ({ goToCollege, addedColleges, collegeList }) => {
  return (
    <div>
      <h2 className={styles.lead}>
        <StressText content={headings[Math.floor(Math.random() * headings.length)]} />
      </h2>
      <h3 className={styles.content}>
        start your college search here. type below to search for colleges
        that fit your situation. bring some color to your future.
      </h3>
      {/* <SearchBar /> */}
      {/* collegeList ? collegeList.filter(id => !addedColleges.includes(id)).map(c => (
        <CollegeEntry key={c.name} data={c} onClick={(c) => { goToCollege(c) }} />
      )) : null */}
      {/* <Button to='/college/0'>hi</Button> */}
      <Button to='/college/5'>columbia</Button>
      <Button to='/college/4'>gtech</Button>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    addedColleges: state.mycolleges.list,
    collegeList: state.colleges.list,
    allColleges: state.colleges
  }
}

function mapDispatchToProps (dispatch) {
  return {
    goToCollege: (c) => dispatch(actions.goToCollege(c))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Colleges)
