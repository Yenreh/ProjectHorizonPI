// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3DjQJ3Pv2triDGda8_zr55nodW-NljWc",
  authDomain: "horizon-pi.firebaseapp.com",
  projectId: "horizon-pi",
  storageBucket: "horizon-pi.firebasestorage.app",
  messagingSenderId: "575273968051",
  appId: "1:575273968051:web:26e081cc8cfbf7ebf6abc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);