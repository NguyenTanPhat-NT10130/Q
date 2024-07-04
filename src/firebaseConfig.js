// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Nếu bạn cần Authentication
import { getFirestore } from 'firebase/firestore'; // Nếu bạn cần Firestore

const firebaseConfig = {
    apiKey: "AIzaSyCXBLXzrMkuNUPc9aEH-ujZBB5-5y4aiUY",
    authDomain: "mobile-e77c4.firebaseapp.com",
    projectId: "mobile-e77c4",
    storageBucket: "mobile-e77c4.appspot.com",
    messagingSenderId: "850913165339",
    appId: "1:850913165339:web:49a5f8312dca8e081678be"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo các dịch vụ
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
