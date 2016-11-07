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
          <div className={styles.outerWrapper} >
            <div className={styles.innerWrapper} key={`loading${Math.random()}`}>
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
