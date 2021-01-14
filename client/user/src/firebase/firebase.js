import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCAU7rTEOjknBxypeQECutbtuC9fsO-_0Y",
    authDomain: "caroonline17ctt5.firebaseapp.com",
    projectId: "caroonline17ctt5",
    storageBucket: "caroonline17ctt5.appspot.com",
    messagingSenderId: "1055381954730",
    appId: "1:1055381954730:web:ce0195fa414a898e0930d3"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const loginWithGoogle = auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());