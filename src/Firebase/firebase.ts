// Import the functions you need from the SDKs you need


import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyAV_fduX9IEFgOPN5iq10J06YYkCpVXSmc",
    authDomain: "test-project-for-orders.firebaseapp.com",
    projectId: "test-project-for-orders",
    storageBucket: "test-project-for-orders.appspot.com",
    messagingSenderId: "732890230800",
    appId: "1:732890230800:web:3ce0d7c3473b2222dc9a95",
    measurementId: "G-HCP0ZZZZ9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)



export default db
