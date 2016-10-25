import { push } from 'react-router-redux'

export function goToCollege (id) {
  return (dispatch) => {
    dispatch(push(`/college/${id}`))
  }
}
