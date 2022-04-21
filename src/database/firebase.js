import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDGn2g0vy6UaOK6TNs0-VFJRdniYy5eW3c",
    authDomain: "guardians-2022.firebaseapp.com",
    projectId: "guardians-2022",
    storageBucket: "guardians-2022.appspot.com",
    messagingSenderId: "348468105096",
    appId: "1:348468105096:web:9ffcd209beb72787f8743d"
  };
  
  // Initialize Firebase
  let app;
  if(firebase.apps.length === 0){
      app = firebase.initializeApp(firebaseConfig);
  } else {
      app = firebase.app()
  }

  const auth = firebase.auth();
  const db = firebase.firestore();
  const fieldValue = firebase.firestore.FieldValue;

  export default {
      firebase, db,auth,fieldValue
  }