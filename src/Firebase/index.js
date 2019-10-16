import firebase from "firebase/app";
import "firebase/storage";

// My Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0nKvUvqdG5YZ6nyiJxjA9m1VmiUKSfDc",
    authDomain: "pedasi-app.firebaseapp.com",
    databaseURL: "https://pedasi-app.firebaseio.com",
    projectId: "pedasi-app",
    storageBucket: "pedasi-app.appspot.com",
    messagingSenderId: "796037703674",
    appId: "1:796037703674:web:c230a2bbe65f93b5836643",
    measurementId: "G-61KKQQJQ9M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
