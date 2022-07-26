import firebase from "firebase/app";
import "firebase/firestore";

//TODO: Get firebaseConfig from website
const firebaseConfig = {
  apiKey: "AIzaSyBazULmDCrkt09RHLi5NpHhPG-H8ppGtRk",
  authDomain: "cooking-site-8b23b.firebaseapp.com",
  projectId: "cooking-site-8b23b",
  storageBucket: "cooking-site-8b23b.appspot.com",
  messagingSenderId: "364781764132",
  appId: "1:364781764132:web:e46667bac9e2699e6ca2b1",
};

//TODO: Initialize Firebase
firebase.initializeApp(firebaseConfig);

//TODO: Initialize Services
const projectFireStore = firebase.firestore();

export { projectFireStore };
