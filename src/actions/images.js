import { storage } from '../firebase'
import prefix from '../prefix'

const actions = prefix('images')([
  'LOAD_IMAGE'
])

export const loadImage = (ref) => (dispatch, getState) => {
  console.log('loading ' + ref)
  storage.ref(ref).getDownloadURL().then((url) => {
    console.log('got url ' + url + ' for ' + ref)
    let i = new Image() //eslint-disable-line
    i.src = url
    i.onload = () => {
      console.log('we are done boys')
      dispatch({ type: actions.LOAD_IMAGE, payload: { [ref]: url } })
    }
  })
}

export default actions
