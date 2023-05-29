import app from 'firebase/app'
import firebase from 'firebase'



const firebaseConfig = {
  apiKey: "AIzaSyAIK-MBJq1b3LX2QGHpD85CyBFuT0NFuHo",
  authDomain: "mi-primer-firebase-210dc.firebaseapp.com",
  projectId: "mi-primer-firebase-210dc",
  storageBucket: "mi-primer-firebase-210dc.appspot.com",
  messagingSenderId: "110720330280",
  appId: "1:110720330280:web:c9c0b715921aab908de31d"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();