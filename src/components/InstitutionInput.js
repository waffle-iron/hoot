import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as styles from '../styles/InstitutionInput.scss'
import * as actions from '../actions/colleges.js'
import Button from './Button'

const numFields = [
  'act25thPercentile',
  'act75thPercentile',
  'averageAnnualCost',
  'averageGrantAid',
  'percentFinancialAid',
  'forbesRanking',
  'percentAdmitted',
  'population',
  'sat25thPercentile',
  'sat75thPercentile',
  'sfRatio',
  'undergradPopulation',
  'inStateTuition',
  'outOfStateTuition',
  'percentMale',
  'percentFemale'
]

const floatFields = [
  'percentEthnicityAmericanIndian',
  'percentEthnicityAsian',
  'percentEthnicityBi',
  'percentEthnicityBlack',
  'percentEthnicityHispanic',
  'percentEthnicityPacificIslander',
  'percentEthnicityUnknown',
  'percentEthnicityWhite',
  'percentEthnicityAlien'
]

class InstitutionInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {
        name: '',
        city: '',
        state: '',
        phoneNumber: '',
        website: '',
        population: '',
        undergradPopulation: '',
        sfRatio: '',
        averageAnnualCost: '',
        inStateTuition: '',
        outOfStateTuition: '',
        percentFinancialAid: '',
        averageGrantAid: '',
        percentAdmitted: '',
        sat25thPercentile: '',
        sat75thPercentile: '',
        act25thPercentile: '',
        act75thPercentile: '',
        forbesRanking: '',
        percentEthnicityAmericanIndian: '',
        percentEthnicityAsian: '',
        percentEthnicityPacificIslander: '',
        percentEthnicityBlack: '',
        percentEthnicityHispanic: '',
        percentEthnicityWhite: '',
        percentEthnicityBi: '',
        percentEthnicityUnknown: '',
        percentEthnicityAlien: '',
        percentMale: '',
        percentFemale: '',
        colorPrimary: '',
        colorSecondary: '',
        acceptsCommon: false,
        acceptsCoalition: false,
        acceptsQuestbridge: false,
        acceptsUniversal: false,
        requiresCommonEssay: false
      },
      decisionPlans: {},
      questions: {},
      recentlyUpdated: {},
      timeout: null,
      decisionPlansTimeout: null,
      questionsTimeout: null
    }
    this.updateForm = this.updateForm.bind(this)
    this.updateDecisionPlan = this.updateDecisionPlan.bind(this)
    this.updateQuestion = this.updateQuestion.bind(this)
  }

  updateForm (section, type) {
    return (e) => {
      if (this.state.timeout) clearTimeout(this.state.timeout)
      switch (type) {
        case 'text': this.setState({
          form: {
            ...this.state.form,
            [section]: e.target.value
          },
          recentlyUpdated: {
            ...this.state.recentlyUpdated,
            [section]: e.target.value
          }
        }); break
        case 'checkbox': this.setState({
          form: {
            ...this.state.form,
            [section]: e.target.checked
          },
          recentlyUpdated: {
            ...this.state.recentlyUpdated,
            [section]: e.target.checked
          }
        }); break
      }
      this.setState({ timeout: setTimeout(() => {
        this.props.updateCollege(this.props.institute, { ...(c => {
          let o = {}
          Object.keys(c).forEach(k => {
            o[k] = numFields.includes(k)
              ? parseInt(c[k])
              : floatFields.includes(k)
                ? parseFloat(c[k])
                : c[k]
          })
          return o
        })(this.state.recentlyUpdated) })
        this.setState({ timeout: null, recentlyUpdated: {} })
      }, 1000) })
    }
  }

  updateDecisionPlan (key, attr) {
    return (e) => {
      if (this.state.decisionPlansTimeout) clearTimeout(this.state.decisionPlansTimeout)
      this.setState({
        decisionPlans: {
          ...this.state.decisionPlans,
          [key]: {
            ...(this.state.decisionPlans[key] || {}),
            [attr]: e.target.value
          }
        },
        decisionPlansTimeout: setTimeout(() => {
          this.props.updateDecisionPlan(
            this.props.institute,
            key,
            this.state.decisionPlans[key]
          )
        }, 1000)
      })
    }
  }

  updateQuestion (key, attr) {
    return (e) => {
      if (this.state.questionsTimeout) clearTimeout(this.state.questionsTimeout)
      this.setState({
        questions: {
          ...this.state.questions,
          [key]: {
            ...(this.state.questions[key] || {}),
            [attr]: e.target.value
          }
        },
        questionsTimeout: setTimeout(() => {
          this.props.updateQuestion(
            this.props.institute,
            key,
            this.state.questions[key]
          )
        })
      })
    }
  }

  componentWillReceiveProps ({ college, institute }) {
    if (!college) return
    if (Object.keys(college).length > 0) {
      this.setState({
        form: {
          ...this.state.form,
          ...college
        },
        decisionPlans: {
          ...college.decisionPlans
        },
        questions: {
          ...college.questions
        }
      })
    }
  }

  render () {
    const { form } = this.state
    if (
      !this.props.college ||
      Object.keys(this.props.college).length === 0 ||
      (!this.props.institute && this.props.institute !== 0)
    ) {
      return (<div><h1 className={styles.lead}>Loading...</h1></div>)
    }
    return (
      <div>
        <h1 className={styles.lead}>Welcome back, officer.</h1>
        <h3 className={styles.smallLead} style={{ width: '70%', minWidth: '500px' }}>
          Your changes are saved automatically. Fill out what you can. For numbers,
          please do not use any commas. If you have any questions,
          please don't hesitate to contact me at kyle@hoot.rocks. The students of the
          future thank you.
        </h3>
        <br />
        <h2 style={{ fontSize: '3em', margin: '1em 0 0 0' }}>
          General Information
        </h2>
        <form className={styles.form}>
          {/* college name */}
          <div className={styles.section}>
            <div className={styles.large}>
              <h3>college name</h3>
              <input
                type='text'
                value={form.name}
                onChange={this.updateForm('name', 'text')} />
            </div>
          </div>
          {/* college location */}
          <div className={styles.section}>
            <div className={styles.large} style={{ position: 'relative' }}>
              <h3>college location (city, state)</h3>
              <input
                type='text'
                style={{ width: '400px', marginRight: '5px' }}
                value={form.city}
                onChange={this.updateForm('city', 'text')} />
              <h3 style={{
                width: '25px',
                display: 'inline-block',
                position: 'absolute',
                bottom: '0',
                fontSize: '3em' }}>,</h3>
              <input
                type='text'
                style={{ width: '50px', marginLeft: '20px' }}
                value={form.state}
                onChange={this.updateForm('state', 'text')} />
            </div>
          </div>
          {/* phone number + website */}
          <div className={styles.section}>
            <div className={styles.medium}>
              <h3>college phone number</h3>
              <input
                type='text'
                value={form.phoneNumber}
                onChange={this.updateForm('phoneNumber', 'text')} />
            </div>
            <div className={styles.large}>
              <h3>college website (include http://)</h3>
              <input
                type='text'
                value={form.website}
                onChange={this.updateForm('website', 'text')} />
            </div>
          </div>
          {/* population */}
          <div className={styles.section}>
            <div className={styles.medium}>
              <h3>total population</h3>
              <input
                type='text'
                value={form.population}
                onChange={this.updateForm('population', 'text')} />
            </div>
            <div className={styles.medium}>
              <h3>total undergrad population</h3>
              <input
                type='text'
                value={form.undergradPopulation}
                onChange={this.updateForm('undergradPopulation', 'text')} />
            </div>
          </div>
          {/* student/faculty ratio */}
          <div className={styles.section}>
            <div className={styles.small}>
              <h3>s:f ratio</h3>
              <input
                type='text'
                value={form.sfRatio}
                onChange={this.updateForm('sfRatio', 'text')} />
            </div>
          </div>
          {/* cost */}
          <div className={styles.section}>
            <div className={styles.medium} style={{ position: 'relative' }}>
              <h3>total annual cost</h3>
              <h3 style={{
                width: '25px',
                display: 'inline-block',
                fontSize: '2em',
                position: 'absolute',
                left: '5px',
                bottom: '12px' }}>$</h3>
              <input
                type='text'
                style={{ width: '200px', marginLeft: '20px' }}
                value={form.averageAnnualCost}
                onChange={this.updateForm('averageAnnualCost', 'text')} />
            </div>
            <div className={styles.medium} style={{ position: 'relative' }}>
              <h3>in state tuition</h3>
              <h3 style={{
                width: '25px',
                display: 'inline-block',
                fontSize: '2em',
                position: 'absolute',
                left: '5px',
                bottom: '12px' }}>$</h3>
              <input
                type='text'
                style={{ width: '200px', marginLeft: '20px' }}
                value={form.inStateTuition}
                onChange={this.updateForm('inStateTuition', 'text')} />
            </div>
            <div className={styles.medium} style={{ position: 'relative' }}>
              <h3>out of state tuition</h3>
              <h3 style={{
                width: '25px',
                display: 'inline-block',
                fontSize: '2em',
                position: 'absolute',
                left: '5px',
                bottom: '12px' }}>$</h3>
              <input
                type='text'
                style={{ width: '200px', marginLeft: '20px' }}
                value={form.outOfStateTuition}
                onChange={this.updateForm('outOfStateTuition', 'text')} />
            </div>
          </div>
          {/* financial aid */}
          <div className={styles.section}>
            <div className={styles.small}>
              <h3>fa</h3>
              <input
                type='text'
                style={{ width: '50px' }}
                value={form.percentFinancialAid}
                onChange={this.updateForm('percentFinancialAid', 'text')} />
              <h3 style={{ display: 'inline-block', fontSize: '1.75em', marginLeft: '5px' }}>%</h3>
            </div>
            <div className={styles.medium} style={{ position: 'relative' }}>
              <h3>average grant aid</h3>
              <h3 style={{
                width: '25px',
                display: 'inline-block',
                fontSize: '2em',
                position: 'absolute',
                left: '5px',
                bottom: '12px' }}>$</h3>
              <input
                type='text'
                style={{ width: '200px', marginLeft: '20px' }}
                value={form.averageGrantAid}
                onChange={this.updateForm('averageGrantAid', 'text')} />
            </div>
          </div>
          {/* admit % */}
          <div className={styles.section}>
            <div className={styles.small}>
              <h3>admit</h3>
              <input
                type='text'
                style={{ width: '50px' }}
                value={form.percentAdmitted}
                onChange={this.updateForm('percentAdmitted', 'text')} />
              <h3 style={{
                display: 'inline-block',
                fontSize: '1.75em',
                marginLeft: '5px' }}>%</h3>
            </div>
          </div>
          {/* sat/act */}
          <div className={styles.section}>
            <div className={styles.medium}>
              <h3>sat range (25th-75th)</h3>
              <input
                type='text'
                style={{ width: '100px' }}
                value={form.sat25thPercentile}
                onChange={this.updateForm('sat25thPercentile', 'text')} />
              <h3 style={{
                display: 'inline-block',
                margin: '0 10px',
                fontSize: '1.5em' }}>-</h3>
              <input
                type='text'
                style={{ width: '100px' }}
                value={form.sat75thPercentile}
                onChange={this.updateForm('sat75thPercentile', 'text')} />
            </div>
            <div className={styles.medium}>
              <h3>act range (25th-75th)</h3>
              <input
                type='text'
                style={{ width: '100px' }}
                value={form.act25thPercentile}
                onChange={this.updateForm('act25thPercentile', 'text')} />
              <h3 style={{
                display: 'inline-block',
                margin: '0 10px',
                fontSize: '1.5em' }}>-</h3>
              <input
                type='text'
                style={{ width: '100px' }}
                value={form.act75thPercentile}
                onChange={this.updateForm('act75thPercentile', 'text')} />
            </div>
          </div>
          {/* rankings */}
          <div className={styles.section}>
            <div className={styles.small} style={{ position: 'relative' }}>
              <h3>ranking</h3>
              <h3 style={{
                width: '25px',
                display: 'inline-block',
                fontSize: '2em',
                position: 'absolute',
                left: '5px',
                bottom: '12px' }}>#</h3>
              <input
                type='text'
                style={{ width: '50px', marginLeft: '20px' }}
                value={form.forbesRanking}
                onChange={this.updateForm('forbesRanking', 'text')} />
            </div>
          </div>
          {/* ethnicity */}
          <div className={styles.section}>
            <div className={styles.small}>
              <h3>american indian</h3>
              <input
                type='text'
                style={{ width: '50px' }}
                value={form.percentEthnicityAmericanIndian}
                onChange={this.updateForm('percentEthnicityAmericanIndian', 'text')} />
              <h3 style={{
                display: 'inline-block',
                fontSize: '1.75em',
                marginLeft: '5px' }}>%</h3>
            </div>
            <div className={styles.small}>
              <h3>asian</h3>
              <input
                type='text'
                style={{ width: '50px' }}
                value={form.percentEthnicityAsian}
                onChange={this.updateForm('percentEthnicityAsian', 'text')} />
              <h3 style={{
                display: 'inline-block',
                fontSize: '1.75em',
                marginLeft: '5px' }}>%</h3>
            </div>
            <div className={styles.small}>
              <h3>pacific islander</h3>
              <input
                type='text'
                style={{ width: '50px' }}
                value={form.percentEthnicityPacificIslander}
                onChange={this.updateForm('percentEthnicityPacificIslander', 'text')} />
              <h3 style={{
                display: 'inline-block',
                fontSize: '1.75em',
                marginLeft: '5px' }}>%</h3>
            </div>
            <div className={styles.small}>
              <h3>black</h3>
              <input
                type='text'
                style={{ width: '50px' }}
                value={form.percentEthnicityBlack}
                onChange={this.updateForm('percentEthnicityBlack', 'text')} />
              <h3 style={{
                display: 'inline-block',
                fontSize: '1.75em',
                marginLeft: '5px' }}>%</h3>
            </div>
            <div className={styles.small}>
              <h3>hispanic</h3>
              <input
                type='text'
                style={{ width: '50px' }}
                value={form.percentEthnicityHispanic}
                onChange={this.updateForm('percentEthnicityHispanic', 'text')} />
              <h3 style={{
                display: 'inline-block',
                fontSize: '1.75em',
                marginLeft: '5px' }}>%</h3>
            </div>
            <div className={styles.small}>
              <h3>white</h3>
              <input
                type='text'
                style={{ width: '50px' }}
                value={form.percentEthnicityWhite}
                onChange={this.updateForm('percentEthnicityWhite', 'text')} />
              <h3 style={{
                display: 'inline-block',
                fontSize: '1.75em',
                marginLeft: '5px' }}>%</h3>
            </div>
            <div className={styles.small}>
              <h3>biracial</h3>
              <input
                type='text'
                style={{ width: '50px' }}
                value={form.percentEthnicityBi}
                onChange={this.updateForm('percentEthnicityBi', 'text')} />
              <h3 style={{
                display: 'inline-block',
                fontSize: '1.75em',
                marginLeft: '5px' }}>%</h3>
            </div>
            <div className={styles.small}>
              <h3>unknown</h3>
              <input
                type='text'
                style={{ width: '50px' }}
                value={form.percentEthnicityUnknown}
                onChange={this.updateForm('percentEthnicityUnknown', 'text')} />
              <h3 style={{
                display: 'inline-block',
                fontSize: '1.75em',
                marginLeft: '5px' }}>%</h3>
            </div>
            <div className={styles.small}>
              <h3>alien</h3>
              <input
                type='text'
                style={{ width: '50px' }}
                value={form.percentEthnicityAlien}
                onChange={this.updateForm('percentEthnicityAlien', 'text')} />
              <h3 style={{
                display: 'inline-block',
                fontSize: '1.75em',
                marginLeft: '5px' }}>%</h3>
            </div>
          </div>
          {/* gender */}
          <div className={styles.section}>
            <div className={styles.small}>
              <h3>male</h3>
              <input
                type='text'
                style={{ width: '50px' }}
                value={form.percentMale}
                onChange={this.updateForm('percentMale', 'text')} />
              <h3 style={{
                display: 'inline-block',
                fontSize: '1.75em',
                marginLeft: '5px' }}>%</h3>
            </div>
            <div className={styles.small}>
              <h3>female</h3>
              <input
                type='text'
                style={{ width: '50px' }}
                value={form.percentFemale}
                onChange={this.updateForm('percentFemale', 'text')} />
              <h3 style={{
                display: 'inline-block',
                fontSize: '1.75em',
                marginLeft: '5px' }}>%</h3>
            </div>
          </div>
          {/* color */}
          <div className={styles.section}>
            <div className={styles.medium} style={{ position: 'relative' }}>
              <h3>primary color</h3>
              <input
                type='text'
                value={form.colorPrimary}
                onChange={this.updateForm('colorPrimary', 'text')} />
            </div>
            <div className={styles.medium} style={{ position: 'relative' }}>
              <h3>secondary color</h3>
              <input
                type='text'
                value={form.colorSecondary}
                onChange={this.updateForm('colorSecondary', 'text')} />
            </div>
          </div>
          {/* applications */}
          <div className={styles.section}>
            <div className={styles.small}>
              <h3>common app</h3>
              <input
                type='checkbox'
                id='capp'
                checked={form.acceptsCommon}
                onChange={this.updateForm('acceptsCommon', 'checkbox')} />
              <label htmlFor='capp' />
            </div>
            <div className={styles.small}>
              <h3>coalition app</h3>
              <input
                type='checkbox'
                id='coapp'
                checked={form.acceptsCoalition}
                onChange={this.updateForm('acceptsCoalition', 'checkbox')} />
              <label htmlFor='coapp' />
            </div>
            <div className={styles.small}>
              <h3>questbridge app</h3>
              <input
                type='checkbox'
                id='qapp'
                checked={form.acceptsQuestbridge}
                onChange={this.updateForm('acceptsQuestbridge', 'checkbox')} />
              <label htmlFor='qapp' />
            </div>
            <div className={styles.small}>
              <h3>universal app</h3>
              <input
                type='checkbox'
                id='uapp'
                checked={form.acceptsUniversal}
                onChange={this.updateForm('acceptsUniversal', 'checkbox')} />
              <label htmlFor='uapp' />
            </div>
          </div>
          {/* common essay */}
          <div className={styles.section}>
            <div className={styles.small}>
              <h3>common essay</h3>
              <input
                type='checkbox'
                id='rce'
                checked={form.requiresCommonEssay}
                onChange={this.updateForm('requiresCommonEssay', 'checkbox')} />
              <label htmlFor='rce' />
            </div>
          </div>
        </form>
        <br />
        <h2 style={{ fontSize: '3em', margin: '1em 0 0 0' }}>Application</h2>
        <form className={styles.form}>
          {this.state.decisionPlans
            ? Object.keys(this.state.decisionPlans)
              .map(k => { return { ...this.state.decisionPlans[k], k } })
              .map(c => (
                <div className={styles.section} key={`dp${c.k}`} >
                  <div className={styles.large}>
                    <h3>decision plan type</h3>
                    <select
                      value={c.type}
                      onChange={this.updateDecisionPlan(c.k, 'type')}>
                      <option value='R'>Regular Decision</option>
                      <option value='EA'>Early Action</option>
                      <option value='REA'>Restrictive Early Action</option>
                      <option value='ED'>Early Decision</option>
                      <option value='ED2'>Early Decision 2</option>
                    </select>
                  </div>
                  <div className={styles.medium}>
                    <h3>due date</h3>
                    <input
                      type='text'
                      style={{ width: '75px' }}
                      value={c.dueDateMonth}
                      onChange={this.updateDecisionPlan(c.k, 'dueDateMonth')} />
                    <h3 style={{
                      display: 'inline-block',
                      margin: '0 10px' }}>/</h3>
                    <input
                      type='text'
                      style={{ width: '75px' }}
                      value={c.dueDateDay}
                      onChange={this.updateDecisionPlan(c.k, 'dueDateDay')} />
                  </div>
                  <div className={styles.medium}>
                    <h3>decision date</h3>
                    <input
                      type='text'
                      style={{ width: '75px' }}
                      value={c.decisionDateMonth}
                      onChange={this.updateDecisionPlan(c.k, 'decisionDateMonth')} />
                    <h3 style={{
                      display: 'inline-block',
                      margin: '0 10px' }}>/</h3>
                    <input
                      type='text'
                      style={{ width: '75px' }}
                      value={c.decisionDateDay}
                      onChange={this.updateDecisionPlan(c.k, 'decisionDateDay')} />
                  </div>
                </div>
              )) : null}
          <Button
            onClick={() => {
              this.props.addDecisionPlan(this.props.institute)
            }}>
            Add Decision Plan
          </Button><br />
          {this.state.questions
            ? Object.keys(this.state.questions)
              .map(k => { return { ...this.state.questions[k], k } })
              .map(q => (
                <div className={styles.section} key={`q${q.k}`}>
                  <div className={styles.himBig}>
                    <h3>prompt</h3>
                    <textarea
                      value={q.prompt}
                      onChange={this.updateQuestion(q.k, 'prompt')} />
                  </div>
                  <br />
                  <div className={styles.small}>
                    <h3>word limit</h3>
                    <input
                      type='text'
                      value={q.wordLimit}
                      onChange={this.updateQuestion(q.k, 'wordlimit')} />
                  </div>
                  <div className={styles.small}>
                    <h3>required</h3>
                    <input
                      type='checkbox'
                      id={`req${q.k}`}
                      checked={q.required}
                      onChange={this.updateQuestion(q.k, 'required')} />
                    <label htmlFor={`req${q.k}`} />
                  </div>
                </div>
            )) : null}
          <Button
            onClick={() => {
              this.props.addQuestion(this.props.institute)
            }}>
            Add Supplement Question
          </Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    institute: state.login.institute,
    college: state.login.institute || state.login.institute > -1 ? state.colleges[state.login.institute] : {}
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateCollege: (..._) => dispatch(actions.updateCollege(..._)),
    addDecisionPlan: _ => dispatch(actions.addDecisionPlan(_)),
    updateDecisionPlan: (..._) => dispatch(actions.updateDecisionPlan(..._)),
    addQuestion: _ => dispatch(actions.addQuestion(_)),
    updateQuestion: (..._) => dispatch(actions.updateQuestion(..._))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionInput)
