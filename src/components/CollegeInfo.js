import React from 'react'

import { get } from '../colleges'

export default ({ params }) => {
  const college = get(params.id)
  return (
    <div>collegeinfo {college.name}</div>
  )
}
