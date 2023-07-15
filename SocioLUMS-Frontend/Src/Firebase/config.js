// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBDbmBKCsqfdtLR_oJuwwv8CG9nReQInPk",
  authDomain: "sociolums-72e3f.firebaseapp.com",
  projectId: "sociolums-72e3f",
  storageBucket: "sociolums-72e3f.appspot.com",
  messagingSenderId: "612012002435",
  appId: "1:612012002435:web:da3bd029dcdfd78cd81fb6"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };


