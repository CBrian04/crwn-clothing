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
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;

      const userRef= firestore.doc(`users/${userAuth.uid}`);

      const snapshot = await userRef.get();

      if(!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
      }

      return userRef;
  };

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
      const collectionRef = firestore.collection(collectionKey);
      console.log(collectionRef);

      const batch = firestore.batch();
      objectsToAdd.forEach(obj => {
            const newDocRef = collectionRef.doc();
            batch.set(newDocRef, obj)
      });

      return await batch.commit();
  };

  firebase.initializeApp(config);

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id : doc.id,
            title,
            items
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
  };

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;