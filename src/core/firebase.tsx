import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDl7t3W4OAf9AS31zyU7b7QBat1zx96l-4",
  authDomain: "netflix-clone-3e48a.firebaseapp.com",
  projectId: "netflix-clone-3e48a",
  storageBucket: "netflix-clone-3e48a.appspot.com",
  messagingSenderId: "220172665532",
  appId: "1:220172665532:web:9596df6a7749443c3306b9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
export default firebase;