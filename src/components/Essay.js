import React from 'react'
import { connect } from 'react-redux'

import { get } from '../colleges'
import Button from './Button'
import * as actions from '../actions/apps'

const mappedTypes = {
  'R': 'regular',
  'REA': 'restrictive early action',
  'EA': 'early action',
  'ED': 'early decision',
  'ED2': 'early decision 2',
  'T': 'transfer'
}

export const Application = ({ app, addApp, removeApp, params }) => {
  if (!app) {
    return (
      <div>
        <h3>click the button below to get started with your app to {get(params.id).name.toLowerCase()}.</h3>
        <Button onClick={() => { addApp(params.id) }}>get started</Button>
      </div>
    )
  } else if (!app.plan) {
    return (
      <div>
        <h3>which way are you planning on applying?</h3>
        {get(app.id.toString()).application.decisionPlans.map(plan => (
          <span><Button>{mappedTypes[plan.type]} - due on {plan.dueDate.month}/{plan.dueDate.day}</Button><br /></span>
        ))}
        <Button onClick={() => { removeApp(params.id) }}>go back this was a mistake</Button>
      </div>
    )
  }
  return (
    <div>
      {get(app.id).name}
    </div>
  )
}

function mapStateToProps (state, { params }) {
  return {
    app: state.apps.items[parseInt(params.id)]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addApp: _ => dispatch(actions.addApp(_)),
    removeApp: _ => dispatch(actions.removeApp(_))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)
