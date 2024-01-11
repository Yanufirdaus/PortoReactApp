// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC89fap0GHkNxU48jhn7wKgXHz8of_4Etw",
  authDomain: "reactnativeapps-bad1f.firebaseapp.com",
  projectId: "reactnativeapps-bad1f",
  storageBucket: "reactnativeapps-bad1f.appspot.com",
  messagingSenderId: "902984883350",
  appId: "1:902984883350:web:3373da1a8e0a21c2f576b7"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP)
export { getApp, getAuth };