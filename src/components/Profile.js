import React, { Component } from 'react'
import { connect } from 'react-redux'

import StressText from './StressText'
// import downArrow from '../assets/downArrow.png'
import * as styles from '../styles/Profile.scss'
import * as actions from '../actions/profile'

const headings = [
  'Portrait of the artist as a high school student.',
  'How much do you regret that C now, huh?',
  'Reflect spitefully upon your past failing.',
  'meow meow meow meow meow meow',
  'If only the sat covered real life skills.',
  'My act score is so low because of society.',
  "Don't worry, colleges look at improvement."
]

export class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {
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
      },
      savedRecently: false,
      lead: headings[Math.floor(Math.random() * headings.length)]
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUpdate (item) {
    let timeout
    return (e) => {
      clearTimeout(timeout)
      this.setState({
        form: { ...this.state.form, [item]: e.target.value },
        savedRecently: false
      })
      timeout = setTimeout(() => {
        this.handleSubmit()
      }, 500)
    }
  }

  handleSubmit (e) {
    this.props.setItems({
      ...this.state.form
    })
  }

  componentWillReceiveProps ({ items }) {
    console.log(items)
    this.setState({
      form: { ...items },
      savedRecently: true
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
          <StressText content={this.state.lead} />
        </h2>
        <h3 className={styles.smallLead}>
          Fill in as much as you'd like below. When you're done, hit
          save, or press enter. We'll handle the rest.
        </h3>
        <div className={styles.saved}><h3>{this.state.savedRecently ? 'Saved.' : 'Saving...'}</h3></div>
        <form className={styles.form} onSubmit={(e) => {
          e.preventDefault()
          this.handleSubmit()
        }}>
          <div className={styles.section}>
            <div className={styles.small}>
              <h3>sat composite score</h3>
              <input type='text' value={this.state.form.satComposite} onChange={this.handleUpdate('satComposite')} />
            </div>
            <div className={styles.small}>
              <h3>sat reading score</h3>
              <input type='text' value={this.state.form.satReading} onChange={this.handleUpdate('satReading')} />
            </div>
            <div className={styles.small}>
              <h3>sat math score</h3>
              <input type='text' value={this.state.form.satMath} onChange={this.handleUpdate('satMath')} />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.small}>
              <h3>act composite score</h3>
              <input type='text' value={this.state.form.actComposite} onChange={this.handleUpdate('actComposite')} />
            </div>
            <div className={styles.small}>
              <h3>act reading score</h3>
              <input type='text' value={this.state.form.actReading} onChange={this.handleUpdate('actReading')} />
            </div>
            <div className={styles.small}>
              <h3>act math score</h3>
              <input type='text' value={this.state.form.actMath} onChange={this.handleUpdate('actMath')} />
            </div>
            <div className={styles.small}>
              <h3>act english score</h3>
              <input type='text' value={this.state.form.actEnglish} onChange={this.handleUpdate('actEnglish')} />
            </div>
            <div className={styles.small}>
              <h3>act science score</h3>
              <input type='text' value={this.state.form.actScience} onChange={this.handleUpdate('actScience')} />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.small}>
              <h3>unweighted gpa</h3>
              <input type='text' value={this.state.form.uwGpa} onChange={this.handleUpdate('uwGpa')} />
            </div>
            <div className={styles.medium}>
              <h3>class rank</h3>
              <input type='text' style={{ width: '75px' }} value={this.state.form.classRank} onChange={this.handleUpdate('classRank')} />
              <h3 style={{ display: 'inline-block', margin: '0 10px' }}>/</h3>
              <input type='text' style={{ width: '75px' }} value={this.state.form.classSize} onChange={this.handleUpdate('classSize')} />
            </div>
          </div>
          <br />
          <button type='submit'>All done for now.</button>
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
