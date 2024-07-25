// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6JlhsQDmSEobZ_dbeN3sc1EEAgRO73ig",
  authDomain: "bussiness-7435e.firebaseapp.com",
  projectId: "bussiness-7435e",
  storageBucket: "bussiness-7435e.appspot.com",
  messagingSenderId: "57109079906",
  appId: "1:57109079906:web:ae56d8fbce1a0075e42e3b",
  measurementId: "G-SQ60E75EGR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
