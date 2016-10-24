import React from 'react'
import * as styles from '../styles/Button.scss'
import { Link } from 'react-router'

export default ({ ...props, children }) => <Link className={styles.button} {...props}>{children}</Link>
