import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyAPymijV_D76uZHtVWwTUYeseoTJj_KkcE',
  authDomain: 'notes-app-5cbb1.firebaseapp.com',
  projectId: 'notes-app-5cbb1',
  storageBucket: 'notes-app-5cbb1.appspot.com',
  messagingSenderId: '177203283462',
  appId: '1:177203283462:web:680a77784ee452f8f86587',
}

const app = initializeApp(firebaseConfig)
const database = getFirestore(app)

export { database }
