import firebase from 'firebase'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDJP_H30Ph1Kc70hvWidxe8BUJKQGHqifY',
  authDomain: 'hoot-41a1e.firebaseapp.com',
  databaseURL: 'https://hoot-41a1e.firebaseio.com',
  storageBucket: 'gs://hoot-41a1e.appspot.com',
  messagingSenderId: '123819123728'
})

export default app
export const auth = app.auth()
export const database = app.database()
export const storage = app.storage()
