import React from 'react'

import { get } from '../colleges'

export default ({ params }) => {
  return (
    <div>
      <h2>your {get(params.id).name.toLowerCase()} app</h2>
    </div>
  )
}
