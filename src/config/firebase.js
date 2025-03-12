import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCBrTr-BRJCCDgHGHOVEcJdfQKxCcgHQ2c",
    authDomain: "surf-project-83fa1.firebaseapp.com",
    projectId: "surf-project-83fa1",
    storageBucket: "surf-project-83fa1.firebasestorage.app",
    messagingSenderId: "371457365116",
    appId: "1:371457365116:web:b1edf3345e4bd75756e5f9",
    measurementId: "G-6DJNJEWEHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };