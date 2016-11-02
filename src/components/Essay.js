import React from 'react'
import { connect } from 'react-redux'

import Button from './Button'
import * as actions from '../actions/apps'
import * as collegeActions from '../actions/colleges'
import * as styles from '../styles/Essay.scss'

const mappedTypes = {
  'R': 'regular',
  'REA': 'restrictive early action',
  'EA': 'early action',
  'ED': 'early decision',
  'ED2': 'early decision 2',
  'T': 'transfer'
}

const commonEssay = {
  'prompt': [[
    'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.'
  ], [
    'The lessons we take from failure can be fundamental to later success. Recount an incident or time when you experienced failure. How did it affect you, and what did you learn from the experience?'
  ], [
    'Reflect on a time when you challenged a belief or idea. What prompted you to act? Would you make the same decision again? '
  ], [
    "Describe a problem you've solved or a problem you'd like to solve. It can be an intellectual challenge, a research query, an ethical dilemma-anything that is of personal importance, no matter the scale. Explain its significance to you and what steps you took or could be taken to identify a solution."
  ], [
    'Discuss an accomplishment or event, formal or informal, that marked your transition from childhood to adulthood within your culture, community, or family.'
  ]]
}

export const Application = ({ app, addApp, removeApp, removeAppPlan, params, setAppPlan, college, fetchCollege }) => {
  const { id } = params
  if (!college) {
    console.log(college)
    fetchCollege(id)
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }
  if (!app) {
    return (
      <div>
        <h3>click the button below to get started with your app to {college.name.toLowerCase()}.</h3>
        <Button onClick={() => { addApp(id) }}>get started</Button>
      </div>
    )
  } else if (!app.plan) {
    return (
      <div>
        <h3>which way are you planning on applying?</h3>
        {Object.keys(college.decisionPlans).map(k => college.decisionPlans[k]).map(plan => (
          <span><Button onClick={() => { setAppPlan(id, plan) }}>{mappedTypes[plan.type]} - due on {plan.dueDateMonth}/{plan.dueDateDay}</Button><br /></span>
        ))}
        <Button onClick={() => { removeApp(id) }}>go back this was a mistake</Button>
      </div>
    )
  }
  return (
    <div className={styles.questions}>
      <Button onClick={() => { removeAppPlan(id) }} style={{ marginRight: '1em', marginTop: '0' }}>change decision plan</Button>
      <Button to={`/college/${id}`} style={{ marginTop: '0' }}>view college page</Button><br />
      <div style={{ width: '100%', height: '5px', backgroundColor: 'black', marginTop: '1.75em' }} />
      {
        college.requiresCommonEssay ? (
          <div>
            <h2>common essay</h2>
            <ul>
              {commonEssay.prompt.map(p => <li>{p}</li>)}
            </ul>
            <textarea />
            <div style={{ width: '100%', height: '5px', backgroundColor: 'black', marginTop: '0.5em' }} />
          </div>
        ) : null
      }
      {
        Object.keys(college.questions).length > 0 ? (
          <div>
            <h2>additional supplement</h2>
            {Object.keys(college.questions).map(k => college.questions[k]).map(q => (
              <div>
                {q.prompt.split('\n').map(qq => <p>{qq}</p>)}
                <textarea />
              </div>
            ))}
            <div style={{ width: '100%', height: '5px', backgroundColor: 'black', marginTop: '0.5em' }} />
          </div>
        ) : null
      }
    </div>
  )
}

function mapStateToProps (state, { params }) {
  return {
    app: state.apps.items[params.id],
    college: state.colleges[params.id]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addApp: _ => dispatch(actions.addApp(_)),
    removeApp: _ => dispatch(actions.removeApp(_)),
    setAppPlan: (..._) => dispatch(actions.setAppPlan(..._)),
    removeAppPlan: _ => dispatch(actions.removeAppPlan(_)),
    fetchCollege: _ => dispatch(collegeActions.fetchCollege(_))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)
