import { storage } from '../firebase'
import prefix from '../prefix'

const actions = prefix('images')([
  'LOAD_IMAGE'
])

export const loadImage = (parent, child) => (dispatch, getState) => {
  storage.ref(parent).child(child).getDownloadURL().then((url) => {
    let i = new Image() //eslint-disable-line
    i.src = url
    i.onload = () => {
      dispatch({ type: actions.LOAD_IMAGE, payload: { [child]: url } })
    }
  })
}

export default actions
