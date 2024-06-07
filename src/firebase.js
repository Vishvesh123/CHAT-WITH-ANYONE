// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV57KaadF7QKtRWcDjcSb7DkhmeOBzZDo",
  authDomain: "chat-with-anyone-7150e.firebaseapp.com",
  projectId: "chat-with-anyone-7150e",
  storageBucket: "chat-with-anyone-7150e.appspot.com",
  messagingSenderId: "249327486432",
  appId: "1:249327486432:web:f3d11f05ca9f2555879785"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const db = getFirestore(firebase.initializeApp(firebaseConfig));
export default firebase;

