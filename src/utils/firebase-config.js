import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {


    apiKey: "AIzaSyA6CQwgvlFO4hJnwt6tyorqr6Xg7w-DYbU",
    authDomain: "trading-app-ee262.firebaseapp.com",
    projectId: "trading-app-ee262",
    storageBucket: "trading-app-ee262.appspot.com",
    messagingSenderId: "202971952998",
    appId: "1:202971952998:web:5800a43ece3dea445abaa7",
    measurementId: "G-S9DGEWLS9H"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app);

export {auth};

export const db = getFirestore(app)
