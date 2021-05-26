import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

const config = {
    apiKey: "AIzaSyCAufGF9hWMoxdMlilHnenIfrSvFwcQoSQ",
    authDomain: "dayplanner-1c4b7.firebaseapp.com",
    databaseURL: "https://dayplanner-1c4b7-default-rtdb.firebaseio.com",
    projectId: "dayplanner-1c4b7",
    storageBucket: "dayplanner-1c4b7.appspot.com",
    messagingSenderId: "915795221340",
    appId: "1:915795221340:web:62ae68f9ee6cdb0c913f99",
    measurementId: "G-4KQHDPTSRE"
}

firebase.initializeApp(config)
firebase.analytics()

export const auth = firebase.auth()
export const firestore = firebase.firestore()
const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({prompt:'select_account'})
export const googleSignIn = ()=> auth.signInWithPopup(googleProvider)
export default firebase