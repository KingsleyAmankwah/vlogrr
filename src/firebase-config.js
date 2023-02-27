// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX8C8U6Q7TkI1JAj2fju9pcKoTyXsrEOk",
  authDomain: "vlogrr.firebaseapp.com",
  projectId: "vlogrr",
  storageBucket: "vlogrr.appspot.com",
  messagingSenderId: "184360099855",
  appId: "1:184360099855:web:48e1b87486c03afc15c37a",
  measurementId: "G-3Y4J4XKRZ8",
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { firebaseApp, auth, firestore };
