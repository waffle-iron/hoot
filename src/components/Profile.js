import React, { Component } from 'react'
import { connect } from 'react-redux'

import StressText from './StressText'
import downArrow from '../assets/downArrow.png'
import * as styles from '../styles/Profile.scss'
import * as actions from '../actions/profile'

const headings = [
  'portrait of the artist as a high school student.',
  'how much do you regret that C now, huh',
  'reflect spitefully upon your past failing.',
  'meow meow meow meow meow meow.',
  'if only the sat covered real life skills.',
  'my act score is so low because of society.',
  "don't worry, colleges look at improvement."
]

export class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      satComposite: '',
      satReading: '',
      satMath: '',
      actComposite: '',
      actReading: '',
      actMath: '',
      actEnglish: '',
      actScience: '',
      uwGpa: '',
      classRank: '',
      classSize: '',
      ethnicity: 'white',
      ...props.items
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUpdate (item) {
    return (e) => {
      this.setState({
        [item]: e.target.value
      })
    }
  }

  handleSubmit (e) {
    this.props.setItems({
      ...this.state
    })
  }

  componentWillReceiveProps ({ items }) {
    this.setState({
      ...items
    })
  }

  render () {
    if (!this.props.fetched) {
      return (
        <div>
          <h2 className={styles.lead}>hold on...</h2>
        </div>
      )
    }
    return (
      <div>
        <h2 className={styles.lead}>
          <StressText content={headings[Math.floor(Math.random() * headings.length)]} />
        </h2>
        <h3 className={styles.smallLead}>
          fill in as much as you'd like below. when you're done, hit
          save, or press enter. we'll handle the rest.
        </h3>
        <form className={styles.form} onSubmit={(e) => {
          e.preventDefault()
          this.handleSubmit()
        }}>
          <div className={styles.section}>
            <div className={styles.small}>
              <h3>sat composite score</h3>
              <input type='text' value={this.state.satComposite} onChange={this.handleUpdate('satComposite')} />
            </div>
            <div className={styles.small}>
              <h3>sat reading score</h3>
              <input type='text' value={this.state.satReading} onChange={this.handleUpdate('satReading')} />
            </div>
            <div className={styles.small}>
              <h3>sat math score</h3>
              <input type='text' value={this.state.satMath} onChange={this.handleUpdate('satMath')} />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.small}>
              <h3>act composite score</h3>
              <input type='text' value={this.state.actComposite} onChange={this.handleUpdate('actComposite')} />
            </div>
            <div className={styles.small}>
              <h3>act reading score</h3>
              <input type='text' value={this.state.actReading} onChange={this.handleUpdate('actReading')} />
            </div>
            <div className={styles.small}>
              <h3>act math score</h3>
              <input type='text' value={this.state.actMath} onChange={this.handleUpdate('actMath')} />
            </div>
            <div className={styles.small}>
              <h3>act english score</h3>
              <input type='text' value={this.state.actEnglish} onChange={this.handleUpdate('actEnglish')} />
            </div>
            <div className={styles.small}>
              <h3>act science score</h3>
              <input type='text' value={this.state.actScience} onChange={this.handleUpdate('actScience')} />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.small}>
              <h3>unweighted gpa</h3>
              <input type='text' value={this.state.uwGpa} onChange={this.handleUpdate('uwGpa')} />
            </div>
            <div className={styles.medium}>
              <h3>class rank</h3>
              <input type='text' style={{ width: '75px' }} value={this.state.classRank} onChange={this.handleUpdate('classRank')} />
              <h3 style={{ display: 'inline-block' }}>/</h3>
              <input type='text' style={{ width: '75px' }} value={this.state.classSize} onChange={this.handleUpdate('classSize')} />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.medium}>
              <h3>affirmative action status</h3>
              <select style={{ background: `url(${downArrow}) 95% / 10% no-repeat #fff` }} value={this.state.ethnicity} onChange={this.handleUpdate('ethnicity')}>
                <option value='white'>white</option>
                <option value='latino'>latino</option>
                <option value='black'>black</option>
                <option value='asian'>asian</option>
                <option value='other'>other</option>
              </select>
            </div>
          </div>
          <br />
          <button type='submit'>all done for now.</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    items: state.profile.items,
    fetched: state.profile.fetched
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setItems: _ => dispatch(actions.setItems(_))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
