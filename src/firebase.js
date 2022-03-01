import firebase from "firebase/app";
import "firebase/auth"

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyDn5CeD77k4MruIfWtRa4ens9aqULGY20U",
  authDomain: "devchat-83188.firebaseapp.com",
  projectId: "devchat-83188",
  storageBucket: "devchat-83188.appspot.com",
  messagingSenderId: "695698561307",
  appId: "1:695698561307:web:433a3e0a2b7c8d90171bbe"
}).auth();