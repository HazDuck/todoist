import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDggRVSMXwV4Fsr1c5A4FSy_rtusV7WCVc",
    authDomain: "todoist-4d46a.firebaseapp.com",
    databaseURL: "https://todoist-4d46a.firebaseio.com",
    projectId: "todoist-4d46a",
    storageBucket: "todoist-4d46a.appspot.com",
    messagingSenderId: "594032923654",
    appId: "1:594032923654:web:50926d128798a03e225f87"
})

export { firebaseConfig as firebase }