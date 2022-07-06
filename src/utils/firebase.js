import firebase from "firebase/app";

var firebaseConfig = {
    apiKey: "AIzaSyDt2hhfgEa4CXrbY1dciASbh0gNRmRng0o",
    authDomain: "repoflex-aa7d5.firebaseapp.com",
    projectId: "repoflex-aa7d5",
    storageBucket: "repoflex-aa7d5.appspot.com",
    messagingSenderId: "1088228350634",
    appId: "1:1088228350634:web:099aabf33acb49c2e94ed3",
    measurementId: "G-LJEBQY6RQB"
  };
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);