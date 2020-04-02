import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCK0wf66kZoUsHO7yrdHDRhVdwBT6TmiWc",
    authDomain: "crwn-db-263c4.firebaseapp.com",
    databaseURL: "https://crwn-db-263c4.firebaseio.com",
    projectId: "crwn-db-263c4",
    storageBucket: "crwn-db-263c4.appspot.com",
    messagingSenderId: "671209137645",
    appId: "1:671209137645:web:412cf5ef618cbf90f873e4",
    measurementId: "G-SBHY90KS4X"
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;