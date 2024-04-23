// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALBKEXgnLdA9EEL5Z-OEwOuPVHYHEEjqM",
    authDomain: "economerce-89f59.firebaseapp.com",
    projectId: "economerce-89f59",
    storageBucket: "economerce-89f59.appspot.com",
    messagingSenderId: "1042263963854",
    appId: "1:1042263963854:web:a4f076643eb36dbe5af89f",
    measurementId: "G-4RHX4JN8N1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);