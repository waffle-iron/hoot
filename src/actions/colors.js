import prefix from '../prefix'

const actions = prefix('color')([
  'SET_COLORFUL',
  'UNSET_COLORFUL',
  'ADD_COLOR',
  'REMOVE_COLOR',
  'SET_COLORS',
  'DEFAULT_COLORS'
])

export default actions
