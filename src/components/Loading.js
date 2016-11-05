import React, { Children, cloneElement } from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import * as styles from '../styles/Loading.scss'

export default ({ finished, children }) => {
  return (
    <CSSTransitionGroup
      transitionName={{
        ...styles
      }}
      transitionEnterTimeout={200}
      transitionLeaveTimeout={200}>
      { finished
        ? Children.map(children, (c, i) => cloneElement(c, { key: `finished${i}` }))
        : (
          <div style={{ position: 'absolute', width: '100vw', height: '100vh', top: 0, left: 0, overflowX: 'hidden' }}>
            <div style={{ width: '100%', textAlign: 'center', position: 'relative', top: '50%', transform: 'translateY(-50%)' }} key={`loading${Math.random()}`}>
              <h1 style={{ fontSize: '4em' }}>
                <i className='fa fa-circle-o-notch fa-pulse' />
              </h1>
            </div>
          </div>
          )
      }
    </CSSTransitionGroup>
  )
}
