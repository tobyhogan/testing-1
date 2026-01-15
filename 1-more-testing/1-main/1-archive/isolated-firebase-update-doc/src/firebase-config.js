// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnLXgV85Xjz7hF6bthCBvcM1uZ9MrFra8",
  authDomain: "blogproject-134f2.firebaseapp.com",
  projectId: "blogproject-134f2",
  storageBucket: "blogproject-134f2.appspot.com",
  messagingSenderId: "725918713292",
  appId: "1:725918713292:web:b5e5d36f23bb3b0ba98969"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);