import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDHyXFaYrx4ZFuCVEmaNJ5TvE5fm7vkrOU",
    authDomain: "react-journal-app-1eb4e.firebaseapp.com",
    projectId: "react-journal-app-1eb4e",
    storageBucket: "react-journal-app-1eb4e.appspot.com",
    messagingSenderId: "327769166739",
    appId: "1:327769166739:web:ac219f0c1b8a5d517bce66",
    measurementId: "G-WYWBY24JGE"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}