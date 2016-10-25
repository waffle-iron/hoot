import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import colleges from '../colleges'
import * as styles from '../styles/Colleges.scss'
import * as actions from '../actions/colleges'
import StressText from './StressText'

const CollegeEntry = ({ data, onClick }) => {
  return (
    <div
      className={styles.entry}
      style={{ backgroundColor: data.colorPrimary }}
      onClick={(e) => { onClick(data.id) }}>
      <h2>{data.name.toLowerCase()}</h2>
    </div>
  )
}

const SearchBar = () => {
  return (
    <form className={styles.search}>
      <input type='text' />
      <button type='submit' />
    </form>
  )
}

export const Colleges = ({ goToCollege }) => {
  return (
    <div>
      <h2 className={styles.lead}>
        <StressText content='choose your own adventure.' />
      </h2>
      <h3 className={styles.content}>
        start your college search here. type below to search for colleges
        that fit your situation. bring some color to your future.
      </h3>
      <SearchBar />
      {colleges.slice(0, 10).map(c => (
        <CollegeEntry key={c.name} data={c} onClick={(c) => { goToCollege(c) }} />
      ))}
    </div>
  )
}

function mapStateToProps (state) {
  return {

  }
}

function mapDispatchToProps (dispatch) {
  return {
    goToCollege: (c) => dispatch(actions.goToCollege(c))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Colleges)