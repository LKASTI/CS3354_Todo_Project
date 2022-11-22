// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB86-g1lAHw2o_ph-v47Qh_InSzG6EWMIo",
  authDomain: "todo-se-app.firebaseapp.com",
  projectId: "todo-se-app",
  storageBucket: "todo-se-app.appspot.com",
  messagingSenderId: "133601742727",
  appId: "1:133601742727:web:4395bb1761fd0ec1364d22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
